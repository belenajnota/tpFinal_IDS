const { Pool } = require("pg");

const dbClient = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "k-cards",
});

async function getAllPhotocards() {
  const response = await dbClient.query("SELECT * FROM photocards");
  return response.rows;
}

async function getPhotocard(id) {
  const response = await dbClient.query(
    "SELECT * FROM photocards WHERE id = $1",
    [id]
  );
  if (response.rowCount === 0) {
    return undefined;
  } else {
    return response.rows[0];
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
  const response = await dbClient.query(
    "INSERT INTO photocards (nombre_idol,nombre_grupo,nombre_album,imagen,precio,precio_comprada) VALUES ($1,$2,$3,$4,$5,$6)",
    [nombre_idol, nombre_grupo, nombre_album, imagen, precio, precio_comprada]
  );

  return response.rows[0];
}

module.exports = {
  getAllPhotocards,
  getPhotocard,
  createPhotocard,
};
