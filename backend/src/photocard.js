const { Pool } = require("pg");

const dbClient = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "k-cards",
});

async function getAllPhotocards() {
  try {
    const response = await dbClient.query("SELECT * FROM photocards");
    return response.rows;
  } catch (e) {
    return false;
  }
}

async function getPhotocard(id) {
  try {
    const response = await dbClient.query(
      "SELECT * FROM photocards WHERE id = $1",
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

async function createPhotocard(
  nombre_idol,
  nombre_grupo,
  nombre_album,
  imagen,
  precio,
  precio_comprada
) {
  try {
    await dbClient.query(
      "INSERT INTO photocards (nombre_idol,nombre_grupo,nombre_album,imagen,precio,precio_comprada) VALUES ($1,$2,$3,$4,$5,$6)",
      [nombre_idol, nombre_grupo, nombre_album, imagen, precio, precio_comprada]
    );
    return true;
  } catch (e) {
    return false;
  }
}

async function deletePhotocard(id) {
  try {
    await dbClient.query("DELETE FROM photocards WHERE id = $1", [id]);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function updatePhotocards(id, columns, newValues) {
  let max = columns.length;

  try {
    for (let i = 0; i < max; i++) {
      //recorre las columnas y valores para updatear los datos uno por uno
      let column = columns[i];
      let newValue = newValues[i];
      await dbClient.query(
        `UPDATE photocards SET "${column}" = $1 WHERE id = $2`,
        [newValue, id]
      );
    }

    return true;
  } catch (e) {
    return false;
  }
}

module.exports = {
  getAllPhotocards,
  getPhotocard,
  createPhotocard,
  deletePhotocard,
  updatePhotocards,
};
