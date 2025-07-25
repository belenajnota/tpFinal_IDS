const { Pool } = require("pg");

//para conectarse a la base de datos
const dbClient = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "k-cards",
});

async function getUsuarios() {
  const response = await dbClient.query(
    `SELECT u.id, u.usuario, u.contrasena, u.telefono, u.id_photocards FROM usuarios u`
  );

  const usuarios = {};

  response.rows.forEach((row) => {
    if (!usuarios[row.id]) {
      usuarios[row.id] = {
        id: row.id,
        usuario: row.usuario,
        contrasena: row.contrasena,
        telefono: row.telefono,
        id_photocards: row.id_photocards,
      };
    }
  });

  return usuarios;
}
async function getUsuario(id) {
  const response = await dbClient.query(
    `SELECT u.id, u.usuario, u.contrasena, u.telefono, u.id_photocards FROM usuarios u WHERE u.id = $1`,
    [id]
  );

  const rows = response.rows;
  if (rows.length === 0) {
    return null;
  }

  const usuario = {
    id: rows[0].id,
    usuario: rows[0].usuario,
    contrasena: rows[0].contrasena,
    telefono: rows[0].telefono,
    id_photocards: rows[0].id_photocards,
  };

  return usuario;
}

async function createUsuario(usuario, contrasena, telefono) {
  const response = await dbClient.query(
    "INSERT INTO usuarios (usuario, contrasena, telefono) VALUES ($1, $2, $3) RETURNING *",
    [usuario, contrasena, telefono]
  );

  if (response.rowCount === 0) {
    return undefined;
  }
  return response.rows[0];
}

async function deleteUsuario(id) {
  const response = await dbClient.query("DELETE FROM usuarios WHERE id = $1", [
    id,
  ]);

  if (response.rowCount === 0) {
    return undefined;
  }
  return id;
}

async function updateUsuario(id, datos) {
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
        UPDATE usuarios
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
  getUsuarios,
  getUsuario,
  createUsuario,
  deleteUsuario,
  updateUsuario,
};
