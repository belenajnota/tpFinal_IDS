const {Pool} = require('pg');

//para conectarse a la base de datos 
const dbClient = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "k-cards",
});



async function getPhotocards() {

    const response = await dbClient.query("SELECT * FROM photocards");
    if (response.rowCount === 0) {
        return undefined;
    }
    return response.rows;
}


async function getPhotocard(id) {
    const response = await dbClient.query("SELECT * FROM photocards WHERE id = $1", [id]);

    if (response.rowCount === 0) {
        return undefined;
    }
    return response.rows[0];

}


//RETURNING * hace que PostgreSQL devuelva la fila recién insertada
async function createPhotocard(nombre, imagen, precio_comprada, fecha_comprada, estado, id_album) {
    const response = await dbClient.query(
        'INSERT INTO photocards(nombre, imagen, precio_comprada, fecha_comprada, estado, id_album) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [nombre, imagen, precio_comprada, fecha_comprada, estado, id_album]);

    if (response.rowCount === 0) {
        return undefined;
    }
    return response.rows[0];  

}


async function deletePhotocard(id) {
    const response = await dbClient.query('DELETE FROM photocards WHERE id = $1', [id]);

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
    getPhotocards,
    getPhotocard,
    createPhotocard,
    deletePhotocard,
    updatePhotocard
};