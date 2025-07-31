const { Pool } = require("pg");

//para conectarse a la base de datos
const dbClient = new Pool({
  user: "postgres",
  password: "postgres",
  host: "postgres",
  port: 5432,
  database: "k-cards",
});

async function getVentas() {
  const response = await dbClient.query("SELECT * FROM ventas");
  if (response.rowCount === 0) {
    return undefined;
  }
  return response.rows;
}

async function getVenta(id) {
  const response = await dbClient.query("SELECT * FROM ventas WHERE id = $1", [
    id,
  ]);

  if (response.rowCount === 0) {
    return undefined;
  }
  return response.rows[0];
}

//RETURNING * hace que PostgreSQL devuelva la fila recién insertada
async function createVenta(
  nombre_cliente,
  telefono_cliente,
  precio_venta,
  medio_de_pago,
  fecha_venta,
  lugar_entrega,
  fecha_entrega,
  hora_entrega,
  costo_entrega,
  id_photocard
) {
  const sql = `
        INSERT INTO ventas (
            nombre_cliente,
            telefono_cliente,

            precio_venta,
            medio_de_pago,
            fecha_venta,
            lugar_entrega,
            fecha_entrega,
            hora_entrega,
            costo_entrega,
            id_photocard
        )

        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)

        RETURNING *;
    `;

  const values = [
    nombre_cliente,
    telefono_cliente,

    precio_venta,
    medio_de_pago,
    fecha_venta,
    lugar_entrega,
    fecha_entrega,
    hora_entrega,
    costo_entrega,
    id_photocard,
  ];

  const response = await dbClient.query(sql, values);

  if (response.rowCount === 0) return undefined;

  return response.rows[0];
}

async function deleteVenta(id) {
  const response = await dbClient.query("DELETE FROM ventas WHERE id = $1", [
    id,
  ]);

  if (response.rowCount === 0) {
    return undefined;
  }
  return id;
}

async function updateVenta(id, datos) {
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
        UPDATE ventas
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
  getVentas,
  getVenta,
  createVenta,
  deleteVenta,
  updateVenta,
};
