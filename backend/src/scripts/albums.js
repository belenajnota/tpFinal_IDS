const {Pool} = require('pg');

//para conectarse a la base de datos 
const dbClient = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "k-cards",
});

const { getPhotocardsByAlbumId } = require('./photocards')


async function getAlbums() {
    const response = await dbClient.query(`
        SELECT 
            a.id AS album_id,
            a.nombre AS album_nombre,
            a.version_album,
            a.imagen AS album_imagen,
            a.pais,
            a.empresa,

            p.id AS photocard_id,
            p.nombre AS photocard_nombre,
            p.grupo,
            p.imagen AS photocard_imagen,
            p.precio_comprada,
            p.disponible
        FROM albums a
        LEFT JOIN photocards p ON a.id = p.album_id
        ORDER BY a.id, p.id
    `);

    if (response.rowCount === 0) {
        return undefined;
    }

    const albums = {};

    response.rows.forEach(row => {
        if (!albums[row.album_id]) {
            albums[row.album_id] = {
                nombre: row.album_nombre,
                version_album: row.version_album,
                imagen: row.album_imagen,
                pais: row.pais,
                empresa: row.empresa,
                photocards: []
            };
        }

        if (row.photocard_id !== null) {
            albums[row.album_id].photocards.push({
                id: row.photocard_id,
                nombre: row.photocard_nombre,
                grupo: row.grupo,
                imagen: row.photocard_imagen,
                precio_comprada: row.precio_comprada,
                disponible: row.disponible
            });
        }
    });

    return albums;
}



async function getAlbum(id) {
    const response = await dbClient.query(`
        SELECT 
            a.id AS album_id,
            a.nombre AS album_nombre,
            a.version_album,
            a.imagen AS album_imagen,
            a.pais,
            a.empresa,

            p.id AS photocard_id,
            p.nombre AS photocard_nombre,
            p.grupo,
            p.imagen AS photocard_imagen,
            p.precio_comprada,
            p.disponible
        FROM albums a
        LEFT JOIN photocards p ON a.id = p.album_id
        WHERE a.id = $1
        ORDER BY p.id
    `, [id]);

    if (response.rowCount === 0) {
        return undefined;
    }

    const rows = response.rows;

    const album = {
        id: rows[0].album_id,
        nombre: rows[0].album_nombre,
        version_album: rows[0].version_album,
        imagen: rows[0].album_imagen,
        pais: rows[0].pais,
        empresa: rows[0].empresa,
        photocards: []
    };

    rows.forEach(row => {
        if (row.photocard_id !== null) {
            album.photocards.push({
                id: row.photocard_id,
                nombre: row.photocard_nombre,
                grupo: row.grupo,
                imagen: row.photocard_imagen,
                precio_comprada: row.precio_comprada,
                disponible: row.disponible
            });
        }
    });

    return album;
}


//RETURNING * hace que PostgreSQL devuelva la fila recién insertada
async function createAlbum(nombre, grupo,version_album,  imagen, pais, empresa) {
    const response = await dbClient.query(
        'INSERT INTO albums (nombre, grupo, version_album, imagen, pais, empresa) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [nombre, grupo, version_album, imagen, pais, empresa]);

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
<<<<<<< Updated upstream
    updateAlbum
};
=======
    updateAlbum,
    getPhotocardsByAlbumId
};
>>>>>>> Stashed changes
