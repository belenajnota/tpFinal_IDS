const { Pool } = require("pg");

//para conectarse a la base de datos
const dbClient = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "k-cards",
});

async function getPhotocards() {
  const response = await dbClient.query(`
        SELECT 
            p.id AS photocard_id,
            p.nombre AS nombre_photocard,
            p.grupo,
            p.imagen,
            p.precio_comprada,
            p.disponible,

            a.id AS album_id,
            a.nombre AS album_nombre,
            a.version_album,
            a.imagen AS album_imagen,
            a.pais,
            a.empresa,

            v.id AS venta_id,
            v.nombre_cliente,
            v.telefono_cliente,
            v.precio_venta,
            v.medio_de_pago,
            v.fecha_venta,
            v.lugar_entrega,
            v.fecha_entrega,
            v.hora_entrega,
            v.costo_entrega
        FROM photocards p
        LEFT JOIN albums a ON p.album_id = a.id
        LEFT JOIN ventas v ON p.id = v.id_photocard
        ORDER BY p.id
    `);

  const photocards = {};

  response.rows.forEach((row) => {
    if (!photocards[row.photocard_id]) {
      photocards[row.photocard_id] = {
        id: row.photocard_id,
        nombre: row.nombre_photocard,
        grupo: row.grupo,
        imagen: row.imagen,
        precio_comprada: row.precio_comprada,
        disponible: row.disponible,
        album: {
          id: row.album_id,
          nombre: row.album_nombre,
          version: row.version_album,
          imagen: row.album_imagen,
          pais: row.pais,
          empresa: row.empresa,
        },
        ventas: [],
      };
    }

    if (row.venta_id !== null) {
      photocards[row.photocard_id].ventas.push({
        id: row.venta_id,
        nombre_cliente: row.nombre_cliente,
        telefono_cliente: row.telefono_cliente,
        precio_venta: row.precio_venta,
        medio_de_pago: row.medio_de_pago,
        fecha_venta: row.fecha_venta,
        lugar_entrega: row.lugar_entrega,
        fecha_entrega: row.fecha_entrega,
        hora_entrega: row.hora_entrega,
        costo_entrega: row.costo_entrega,
      });
    }
  });

  return photocards;
}

async function getPhotocard(id) {
  const response = await dbClient.query(
    `
        SELECT 
            p.id AS photocard_id,
            p.nombre AS nombre_photocard,
            p.grupo,
            p.imagen,
            p.precio_comprada,
            p.disponible,
            a.id AS album_id,
            a.nombre AS album_nombre,
            a.grupo AS album_grupo,
            a.version_album AS album_version,
            a.imagen AS album_imagen,
            a.pais,
            a.empresa,
            v.id AS venta_id,
            v.nombre_cliente,
            v.telefono_cliente,
            v.precio_venta,
            v.medio_de_pago,
            v.fecha_venta,
            v.lugar_entrega,
            v.fecha_entrega,
            v.hora_entrega,
            v.costo_entrega
        FROM photocards p
        LEFT JOIN albums a ON p.album_id = a.id
        LEFT JOIN ventas v ON p.id = v.id_photocard
        WHERE p.id = $1
    `,
    [id]
  );

  const rows = response.rows;

  const photocard = {
    nombre: rows[0].nombre_photocard,
    grupo: rows[0].grupo,
    imagen: rows[0].imagen,
    precio_comprada: rows[0].precio_comprada,
    disponible: rows[0].disponible,
    album: {
      id: rows[0].album_id,
      nombre: rows[0].album_nombre,
      grupo: rows[0].album_grupo,
      version: rows[0].album_version,
      imagen: rows[0].album_imagen,
      pais: rows[0].pais,
      empresa: rows[0].empresa,
    },
    ventas: [],
  };

  rows.forEach((row) => {
    if (row.venta_id !== null) {
      photocard.ventas.push({
        id: row.venta_id,
        nombre_cliente: row.nombre_cliente,
        telefono_cliente: row.telefono_cliente,
        precio_venta: row.precio_venta,
        medio_de_pago: row.medio_de_pago,
        fecha_venta: row.fecha_venta,
        lugar_entrega: row.lugar_entrega,
        fecha_entrega: row.fecha_entrega,
        hora_entrega: row.hora_entrega,
        costo_entrega: row.costo_entrega,
      });
    }
  });

  return photocard;
}

async function createPhotocard(
  nombre,
  grupo,
  imagen,
  precio_comprada,
  album_id
) {
  const response = await dbClient.query(
    "INSERT INTO photocards(nombre, grupo, imagen, precio_comprada, album_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [nombre, grupo, imagen, precio_comprada, album_id]
  );

  if (response.rowCount === 0) {
    return undefined;
  }
  return response.rows[0];
}

async function deletePhotocard(id) {
  const response = await dbClient.query(
    "DELETE FROM photocards WHERE id = $1",
    [id]
  );

  if (response.rowCount === 0) {
    return undefined;
  }
  return id;
}

async function updatePhotocard(id, datos) {
  const campos = [];
  const valores = [];
  let i = 1;

  for (const [clave, valor] of Object.entries(datos)) {
    campos.push(`${clave} = $${i}`);
    valores.push(valor);
    i++;
  }

  if (campos.length === 0) {
    return undefined;
  }

  const query = `
        UPDATE photocards
        SET ${campos.join(", ")}
        WHERE id = $${i}
        RETURNING *; `;

  valores.push(id);

  const response = await dbClient.query(query, valores);

  if (response.rowCount === 0) {
    return undefined;
  }

  return response.rows[0];
}

module.exports = {
  getPhotocards,
  getPhotocard,
  createPhotocard,
  deletePhotocard,
  updatePhotocard,
};
