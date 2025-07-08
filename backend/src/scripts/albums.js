const {Pool} = require('pg');

//para conectarse a la base de datos 
const dbClient = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "k-cards",
});

async function getAlbums() {

    const response = await dbClient.query("SELECT * FROM albums");
    if (response.rowCount === 0) {
        return undefined;
    }
    return response.rows;
}


async function getAlbum(id) {
    const response = await dbClient.query("SELECT * FROM albums WHERE id = $1", [id]);

    if (response.rowCount === 0) {
        return undefined;
    }
    return response.rows[0];

}


//RETURNING * hace que PostgreSQL devuelva la fila recién insertada
async function createAlbum(nombre, version_album, grupo, imagen, fecha_lanzamiento, precio) {
    const response = await dbClient.query(
        'INSERT INTO albums (nombre, version_album, grupo, imagen, fecha_lanzamiento, precio) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [nombre, version_album, grupo, imagen, fecha_lanzamiento, precio]);

    if (response.rowCount === 0) {
        return undefined;
    }
    return response.rows[0];  

}


async function deleteAlbum(id) {
    const response = await dbClient.query('DELETE FROM albums WHERE id = $1', [id]);

    if (response.rowCount === 0) {
        return undefined;
    }
    return id;
}

async function updateAlbum(id, datos) {
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
        UPDATE albums
        SET ${campos.join(', ')}
        WHERE id = $${i}
        RETURNING *; `

    valores.push(id);

    const response = await dbClient.query(query, valores);

    if (response.rowCount === 0) {
        return undefined;
    }

    return response.rows[0];
}



module.exports = {
    getAlbums,
    getAlbum,
    createAlbum,
    deleteAlbum,
    updateAlbum
};