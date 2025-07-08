const express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;


const { getPhotocards, getPhotocard, createPhotocard, deletePhotocard, updatePhotocard } = require("./scripts/photocards");
const { getAlbums, getAlbum, createAlbum, deleteAlbum, updateAlbum } = require("./scripts/albums");
const { getVentas, getVenta, createVenta, deleteVenta, updateVenta} = require("./scripts/ventas");
const { esPrecioValido, esIDValido, validarHora, extraerCamposPermitidos } = require('./utils/validaciones');

const camposPhotocards = ['nombre', 'imagen', 'precio_comprada', 'fecha_comprada', 'estado', 'id_album'];
const camposObligatoriosAlbums = ['nombre', 'version_album', 'grupo', 'precio'];
const camposAlbums = ['nombre', 'version_album', 'grupo', 'imagen', 'fecha_lanzamiento', 'precio'];
const camposObligatoriosVentas = [
  'nombre_cliente',
  'telefono_cliente',
  'precio_venta',
  'medio_de_pago',
  'fecha_venta',
  'lugar_entrega',
  'fecha_entrega',
  'costo_entrega',
  'id_photocard'
];
const camposVentas = [
  'nombre_cliente',
  'telefono_cliente',
  'instagram_cliente',
  'precio_venta',
  'medio_de_pago',
  'fecha_venta',
  'lugar_entrega',
  'fecha_entrega',
  'hora_entrega',
  'costo_entrega',
  'id_photocard'
];

const longitud_valores_photocards = {
        nombre: 40,
        imagen: 200,
        estado: 15
}

const longitud_valores_albums = {
        nombre: 30, 
        version_album: 30,
        grupo: 20,
        imagen: 200
}

const longitud_valores_ventas = {
    nombre_cliente: 40,
    telefono_cliente: 15,
    instagram_cliente: 30,
    medio_de_pago: 20,
    lugar_entrega: 30
}


const estadosValidosPhotocards = ['vendida', 'disponible', 'entregada'];

app.get('/api/health', (req, res) => {
    res.json({status: 'OK'});
});



app.get('/api/photocards', async (req, res) => {

    try {
        const photocards = await getPhotocards();

        if (!photocards) {
            return res.status(404).json({ error: 'Photocards no encontradas' });
        }
        return res.json(photocards);
    } catch (e) {
        return res.status(500).json({ error: 'Error interno del servidor' });
    }

})

app.get('/api/photocards/:id', async (req, res) => {

    const id = parseInt(req.params.id, 10);

    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: 'El ID debe ser un número entero positivo mayor a 0' });
    }

    try {
        const photocard = await getPhotocard(id);

        if (!photocard) {
            return res.status(404).json({ error: 'Photocard no encontrada' });
        }
        return res.json(photocard);
    } catch (e) {
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
    
})


app.post('/api/photocards', async (req, res) => {

    for (const campo of camposPhotocards) {
        if (req.body[campo] == null) {
            return res.status(400).json({ error: `Falta el campo obligatorio: ${campo}` }); 
        }
    }

    for (const campo of Object.keys(longitud_valores_photocards)) {
        const valor = req.body[campo];
        //no verifico que sea un string porque ya verifique que NO sea de tipo null o undefined y al estar en longitud_valores_photocards 
        //me aseguro que contiene caracteres
        if (valor.length > longitud_valores_photocards[campo]) {
            return res.status(400).json({ 
                error: `${campo} no puede tener más de ${longitud_valores_photocards[campo]} caracteres`
            });
        }
    }
    
    if (!estadosValidosPhotocards.includes(req.body.estado.toLowerCase())) {
        return res.status(400).json({ error: 'El estado debe ser "vendida", "disponible" p "entregada' });
    }

    if (!esPrecioValido(req.body.precio_comprada)) {
        return res.status(400).json({ error: 'El precio a la que la photocard fue comprada debe ser un número entero positivo' });
    }

    if (isNaN(Date.parse(req.body.fecha_comprada))) {
        return res.status(400).json({ error: 'La fecha en la que fue comprada no es válida' });
    }

    if (!Number.isInteger(req.body.id_album) || req.body.id_album <= 0) {
        return res.status(400).json({ error: 'El id del album debe ser un número entero positivo mayor a 0' });
    }

    const {nombre, imagen, precio_comprada, fecha_comprada, estado, id_album} = req.body

    try {
        const photocard = await createPhotocard(
            nombre, imagen, precio_comprada, fecha_comprada, estado, id_album);

        if (!photocard) {
            return res.status(500).json({ error: 'Error al crear la photocard' });
        }
        return res.status(201).json(photocard);
    } catch(e) {
        return res.status(500).json({ error: 'Error al crear la photocard'});
    }

})


app.delete('/api/photocards/:id', async (req, res) => {

    const id = parseInt(req.params.id, 10);

    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: 'El ID debe ser un número entero positivo mayor a 0' });
    }
    //no verifico que la photocard existe porque no me tira error sino que se cumple response.rowCount === 0
    try {
        const photocard = await deletePhotocard(id)
        if (!photocard) {
            return res.status(404).json({ error: 'No se encontró la photocard id: ' + id});
        }
        return res.json(photocard);
    } catch (e) {
        return res.status(500).json({ error: 'Error al eliminar la photocard' });
    }

})



app.patch('/api/photocards/:id', async (req, res) => {

    const id = parseInt(req.params.id, 10);

    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: 'El ID debe ser un número entero positivo mayor a 0' });
    }

    const datos = extraerCamposPermitidos(req.body, camposPhotocards);

    if (Object.keys(datos).length === 0) {
        return res.status(400).json({ error: 'No se enviaron campos válidos para actualizar' });
    }

    for (const campo of Object.keys(longitud_valores_photocards)) {
        const valor = datos[campo];
        if (typeof valor === 'string' && valor.length > longitud_valores_photocards[campo]) {
            return res.status(400).json({ 
                error: `${campo} no puede tener más de ${longitud_valores_photocards[campo]} caracteres`
            });
        }
    }

    if (datos.precio_comprada !== undefined && !esPrecioValido(datos.precio_comprada)) {
        return res.status(400).json({ error: 'El precio debe ser un número entero positivo' });
    }

    if (datos.fecha_comprada !== undefined && isNaN(Date.parse(datos.fecha_comprada))) {
        return res.status(400).json({ error: 'La fecha comprada no es válida' });
    }

    if (datos.estado !== undefined && !estadosValidosPhotocards.includes(datos.estado.toLowerCase())) {
        return res.status(400).json({ error: 'Estado inválido' });
    }

    if (datos.id_album !== undefined && (!Number.isInteger(datos.id_album) || datos.id_album <= 0)) {
        return res.status(400).json({ error: 'El id del álbum debe ser un número entero positivo mayor a 0' });
    }

    try {
        const resultado = await updatePhotocard(id, datos);
        if (!resultado) {
            return res.status(404).json({ error: `Photocard con id ${id} no encontrada` });
        }
        return res.json(resultado);
    } catch (e) {
        console.error('Error:', e);
        return res.status(500).json({ error: 'Error al actualizar la photocard' });
    }
});

/*

////////////////CRUD ALBUMS///////////////////////////////////////////////////////////////////////////////////////////////////

*/


app.get('/api/albums', async (req, res) => {

    try {
        const albums = await getAlbums();

        if (!albums) {
            return res.status(404).json({ error: 'Albums no encontrados' });
        }
        return res.json(albums);
    } catch (e) {
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
})




app.get('/api/albums/:id', async (req, res) => {
    
    const id = parseInt(req.params.id, 10);

    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: 'El ID debe ser un número entero positivo mayor a 0' });
    }

    try {
        const album = await getAlbum(id);

        if (!album) {
            return res.status(404).json({ error: 'Album no encontrado' });
        }
        return res.json(album);
    } catch (e) {
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
    
})




app.post('/api/albums', async (req, res) => {

    for (const campo of camposObligatoriosAlbums) {
        if (req.body[campo] == null) {
            return res.status(400).json({ error: `Falta el campo obligatorio: ${campo}` }); 
        }
    }
    for (const campo of Object.keys(longitud_valores_albums)) {
        const valor = req.body[campo];
        if (valor != null && valor.length > longitud_valores_albums[campo]) {
            return res.status(400).json({ 
                error: `${campo} no puede tener más de ${longitud_valores_albums[campo]} caracteres`
            });
        }
    }

    if (req.body.fecha_lanzamiento != null &&isNaN(Date.parse(req.body.fecha_lanzamiento))) {
        return res.status(400).json({ error: 'La fecha de lanzamiento no es válida' });
    }

    if (!Number.isInteger(req.body.precio) || req.body.precio < 0) {
        return res.status(400).json({ error: 'El precio debe ser un número entero positivo' });
    }

    const { nombre, version_album, grupo, imagen, fecha_lanzamiento, precio } = req.body;

    const imagenFinal = imagen != null && imagen !== '' ? imagen : null;
    const fecha_lanzamiento_Final = fecha_lanzamiento != null && fecha_lanzamiento !== '' ? fecha_lanzamiento : null;

    try {
        const album = await createAlbum(
            nombre, version_album , grupo , imagenFinal , fecha_lanzamiento_Final, precio);

        if (!album) {
            return res.status(500).json({ error: 'Error al crear el album' });
        }
        return res.status(201).json(album);
    } catch(e) {
        return res.status(500).json({ error: 'Error al crear el album'});
    }

})


app.delete('/api/albums/:id', async (req, res) => {

    const id = parseInt(req.params.id, 10);

    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: 'El ID debe ser un número entero positivo mayor a 0' });
    }

    try {
        const album = await deleteAlbum(id)
        if (!album) {
            return res.status(404).json({ error: 'No se encontró el album id: ' + id});
        }
        return res.json(album);
    } catch (e) {
        return res.status(500).json({ error: 'Error al eliminar el album' });
    }

})



app.patch('/api/albums/:id', async (req, res) => {
    
    const id = parseInt(req.params.id, 10);

    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: 'El ID debe ser un número entero positivo mayor a 0' });
    }

    const datos = extraerCamposPermitidos(req.body, camposAlbums);

    if (Object.keys(datos).length === 0) {
        return res.status(400).json({ error: 'No se enviaron campos válidos para actualizar' });
    }


    for (const campo of Object.keys(longitud_valores_albums)) {
        const valor = datos[campo];
        if (typeof valor === 'string' && valor.length > longitud_valores_albums[campo]) {
            return res.status(400).json({ 
                error: `${campo} no puede tener más de ${longitud_valores_albums[campo]} caracteres`
            });
        }
    }


    if (datos.fecha_lanzamiento !== undefined && isNaN(Date.parse(datos.fecha_lanzamiento))) {
        return res.status(400).json({ error: 'La fecha de lanzamiento no es válida' });
    }
    if (datos.precio !== undefined &&
        (!esPrecioValido(datos.precio_comprada))) {
        return res.status(400).json({ error: 'El precio debe ser un número entero positivo' });
    }

    try {
        const album = await updateAlbum(id, datos);
        if (!album) {
            return res.status(404).json({ error: `El album con id ${id} no fue encontrado` });
        }
        return res.json(album);
    } catch (e) {
        console.error('Error:', e);
        return res.status(500).json({ error: 'Error al actualizar el album' });
    }
});

/*

////////////////CRUD VENTAS//////////////////////////////////////////////////////////////////////////////////////////////////////

*/


app.get('/api/ventas', async (req, res) => {

    try {
        const ventas = await getVentas();

        if (!ventas) {
            return res.status(404).json({ error: 'Ventas no encontrados' });
        }
        return res.json(ventas);
    } catch (e) {
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
})




app.get('/api/ventas/:id', async (req, res) => {
    
    const id = parseInt(req.params.id, 10);

    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: 'El ID debe ser un número entero positivo mayor a 0' });
    }

    try {
        const venta = await getVenta(id);

        if (!venta) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }
        return res.json(venta);
    } catch (e) {
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
    
})




app.post('/api/ventas', async (req, res) => {

    const {
        nombre_cliente,
        telefono_cliente,
        instagram_cliente,
        precio_venta,
        medio_de_pago,
        fecha_venta,
        lugar_entrega,
        fecha_entrega,
        hora_entrega,
        costo_entrega,
        id_photocard
    } = req.body;


    for (const campo of camposObligatoriosVentas) {
        if (req.body[campo] == null) {
            return res.status(400).json({ error: `Falta el campo obligatorio: ${campo}` }); 
        }
    }

    for (const campo of Object.keys(longitud_valores_ventas)) {
        const valor = req.body[campo];
        if (valor != null && valor.length > longitud_valores_ventas[campo]) {
            return res.status(400).json({ 
                error: `${campo} no puede tener más de ${longitud_valores_ventas[campo]} caracteres`
            });
        }
    }

    if (!esPrecioValido(precio_venta)) {
        return res.status(400).json({ error: 'El precio debe ser un número entero positivo' });
    }
    if (isNaN(Date.parse(fecha_venta))) {
        return res.status(400).json({ error: 'La fecha de venta no es válida' });
    }

    if (hora_entrega != null && validarHora(hora_entrega)) {
        return res.status(400).json({ error: 'La hora de entrega no es válida. Debe tener formato HH:MM o HH:MM:SS' });
    }

    if (!esPrecioValido(costo_entrega)) {
        return res.status(400).json({ error: 'El costo de entrega debe ser un número entero positivo' });
    }

    if (!Number.isInteger(id_photocard) || id_photocard <= 0) {
        return res.status(400).json({ error: 'El id de la photocard debe ser un número entero mayor a 0' });
    }

    const instagram_cliente_final = instagram_cliente != null && instagram_cliente !== '' ? instagram_cliente : null;
    const hora_entrega_final = hora_entrega != null && hora_entrega !== '' ? hora_entrega : null;



    try {
        const venta = await createVenta(
            nombre_cliente,
            telefono_cliente,
            instagram_cliente_final,
            precio_venta,
            medio_de_pago,
            fecha_venta,
            lugar_entrega,
            fecha_entrega,
            hora_entrega_final,
            costo_entrega,
            id_photocard
        );

        if (!venta) {
            return res.status(500).json({ error: 'Error al crear la venta' });
        }

        return res.status(201).json(venta);
    } catch (e) {
        console.error('Error al crear la venta:', e);
        return res.status(500).json({ error: 'Error del servidor al crear la venta' });
    }
});


app.delete('/api/ventas/:id', async (req, res) => {

    const id = parseInt(req.params.id, 10);

    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: 'El ID debe ser un número entero positivo mayor a 0' });
    }
    try {
        const venta = await deleteVenta(id)
        if (!venta) {
            return res.status(404).json({ error: 'No se encontró la venta id: ' + id});
        }
        return res.json(venta);
    } catch (e) {
        return res.status(500).json({ error: 'Error al eliminar la venta' });
    }

})



app.patch('/api/ventas/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: 'El ID debe ser un número entero positivo mayor a 0' });
    }
    const datos = extraerCamposPermitidos(req.body, camposVentas);

    if (Object.keys(datos).length === 0) {
        return res.status(400).json({ error: 'No se enviaron campos válidos para actualizar' });
    }


    for (const campo of Object.keys(longitud_valores_ventas)) {
        const valor = datos[campo];
        if (typeof valor === 'string' && valor.length > longitud_valores_ventas[campo]) {
            return res.status(400).json({ 
                error: `${campo} no puede tener más de ${longitud_valores_ventas[campo]} caracteres`
            });
        }
    }

    if (datos.precio_venta !== undefined && !esPrecioValido(datos.precio_venta)) {
        return res.status(400).json({ error: 'El precio debe ser un número entero positivo' });
    }

    if (datos.fecha_venta !== undefined && isNaN(Date.parse(datos.fecha_venta))) {
        return res.status(400).json({ error: 'La fecha de venta no es válida' });
    }

    if (datos.fecha_entrega !== undefined && isNaN(Date.parse(datos.fecha_entrega))) {
        return res.status(400).json({ error: 'La fecha de entrega no es válida' });
    }

    if (datos.hora_entrega !== undefined && !validarHora(datos.hora_entrega)) {
        return res.status(400).json({ error: 'La hora de entrega no es válida. Debe tener formato HH:MM o HH:MM:SS' });
    } 

    if (datos.costo_entrega !== undefined &&  !esPrecioValido(datos.costo_entrega)) {
        return res.status(400).json({ error: 'El costo de entrega debe ser un número entero positivo' });
    }
    
    if (datos.id_photocard !== undefined && (!Number.isInteger(datos.id_photocard) || datos.id_photocard <= 0)) {
        return res.status(400).json({ error: 'El id de la photocard debe ser un número entero mayor a 0' });
    }


    try {
        const venta = await updateVenta(id, datos);
        if (!venta) {
            return res.status(404).json({ error: 'La venta con id ${id} no fue encontrada' });
        }
        return res.json(venta);
    } catch (e) {
        console.error('Error:', e);
        return res.status(500).json({ error: 'Error al actualizar el album' });
    }
});


app.listen(PORT, () => {
    console.log("Puerto: ", PORT);
});