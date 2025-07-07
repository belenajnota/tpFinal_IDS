const { Pool } = require("pg");

const dbClient = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "k-cards",
});

async function getAllCompradores() {
  try {
    const response = await dbClient.query("SELECT * FROM compradores");
    return response.rows;
  } catch (e) {
    return false;
  }
}

async function getComprador(id) {
  try {
    const response = await dbClient.query(
      "SELECT * FROM compradores WHERE id = $1",
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

async function createComprador(
  nombre,
  numero_telefono,
  usuario_instagram,
  medio_de_pago,
  localidad,
  id_photocard_comprada
) {
  try {
    await dbClient.query(
      "INSERT INTO compradores (nombre,numero_telefono,usuario_instagram,medio_de_pago,localidad,id_photocard_comprada) VALUES ($1,$2,$3,$4,$5,$6)",
      [
        nombre,
        numero_telefono,
        usuario_instagram,
        medio_de_pago,
        localidad,
        id_photocard_comprada,
      ]
    );
    return true;
  } catch (e) {
    return false;
  }
}

async function deleteComprador(id) {
  try {
    await dbClient.query("DELETE FROM compradores WHERE id = $1", [id]);
    return true;
  } catch (e) {
    return false;
  }
}

async function updateComprador(id, columns, newValues) {
  let max = columns.length;

  try {
    for (let i = 0; i < max; i++) {
      //recorre las columnas y valores para updatear los datos uno por uno
      let column = columns[i];
      let newValue = newValues[i];
      await dbClient.query(
        `UPDATE compradores SET "${column}" = $1 WHERE id = $2`,
        [newValue, id]
      );
    }

    return true;
  } catch (e) {
    return false;
  }
}

module.exports = {
  getAllCompradores,
  getComprador,
  createComprador,
  deleteComprador,
  updateComprador,
};
