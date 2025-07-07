const { Pool } = require("pg");

const dbClient = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "k-cards",
});

async function getAllTransacciones() {
  try {
    const response = await dbClient.query("SELECT * FROM photocards_vendidas");
    return response.rows;
  } catch (e) {
    return false;
  }
}

async function getTransaccion(id) {
  try {
    const response = await dbClient.query(
      "SELECT * FROM photocards_vendidas WHERE id = $1",
      [id]
    );
    if (response.rowCount === 0) {
      return undefined;
    }
    return response.rows[0];
  } catch (e) {
    return false;
  }
}

async function createTransaccion(
  tipo_entrega,
  lugar_entrega,
  costo_entrega,
  fecha_entrega,
  hora_entrega,
  id_photocard
) {
  try {
    await dbClient.query(
      "INSERT INTO photocards_vendidas (tipo_entrega,lugar_entrega,costo_entrega,fecha_entrega,hora_entrega,id_photocard) VALUES ($1,$2,$3,$4,$5,$6)",
      [
        tipo_entrega,
        lugar_entrega,
        costo_entrega,
        fecha_entrega,
        hora_entrega,
        id_photocard,
      ]
    );
    return true;
  } catch (e) {
    return false;
  }
}

async function deleteTransaccion(id) {
  try {
    await dbClient.query("DELETE FROM photocards_vendidas WHERE id = $1", [id]);
    return true;
  } catch (e) {
    return false;
  }
}

async function updateTransaccion(id, columns, newValues) {
  let max = columns.length;

  try {
    for (let i = 0; i < max; i++) {
      //recorre las columnas y valores para updatear los datos uno por uno
      let column = columns[i];
      let newValue = newValues[i];
      await dbClient.query(
        `UPDATE photocards_vendidas SET "${column}" = $1 WHERE id = $2`,
        [newValue, id]
      );
    }

    return true;
  } catch (e) {
    return false;
  }
}

module.exports = {
  getAllTransacciones,
  getTransaccion,
  createTransaccion,
  deleteTransaccion,
  updateTransaccion,
};
