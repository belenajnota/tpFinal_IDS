const express = require("express");
const {
  getAllPhotocards,
  getPhotocard,
  createPhotocard,
  deletePhotocard,
  updatePhotocards,
} = require("./photocard.js");

const {
  getAllTransacciones,
  getTransaccion,
  createTransaccion,
  deleteTransaccion,
  updateTransaccion,
} = require("./transacciones.js");

const {
  getAllCompradores,
  getComprador,
  createComprador,
  deleteComprador,
  updateComprador,
} = require("./compradores.js");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;


const { getPhotocards, getPhotocard, createPhotocard, deletePhotocard, updatePhotocard } = require("./scripts/photocards");
const { getAlbums, getAlbum, createAlbum, deleteAlbum, updateAlbum } = require("./scripts/albums");
const { getVentas, getVenta, createVenta, deleteVenta, updateVenta} = require("./scripts/ventas")

const max_longitud_valor = {
        nombre: 40,
        imagen: 200,
        estado: 15
}

const max_caract_valores_albums = {
        nombre: 30, 
        version_album: 30,
        grupo: 20,
        imagen: 200
}

const max_caract_valores_ventas = {
    nombre_cliente: 40,
    telefono_cliente: 15,
    instagram_cliente: 30,
    medio_de_pago: 20,
    lugar_entrega: 30
}



const estadosValidos = ['vendida', 'disponible', 'entregada'];

//Health route
app.get('/api/health', (req, res) => {
    res.json({status: 'OK'});
});

//Health route
app.get("/Api/health", (req, res) => {
  res.json({ status: "OK" });

});

// CRUD de photocards
app.get("/api/v1/photocards", async (req, res) => {
  const photocards = await getAllPhotocards();
  //verificador de errores de servidor
  if (photocards == false) {
    res.status(500).send("An error occurred");
  }
  res.json(photocards);
});

app.get("/api/v1/photocards/:id", async (req, res) => {
  const photocard = await getPhotocard(req.params.id);
  if (photocard == undefined) {
    res.status(404).send("Photocard Not Found");
  }
  if (photocard == false) {
    res.status(500).send("An error occurred");
  }

  res.json(photocard);
});

app.post("/api/v1/photocards", async (req, res) => {
  if (!req.body.nombre_idol) {
    res.status(400).send("The nombre_idol field is required.");
  }
  if (!req.body.nombre_grupo) {
    res.status(400).send("The nombre_grupo field is required.");
  }
  if (!req.body.nombre_grupo) {
    res.status(400).send("The nombre_album field is required.");
  }
  if (!req.body.imagen) {
    res.status(400).send("The imagen field is required.");
  }
  if (!req.body.precio) {
    res.status(400).send("The precio field is required.");
  }
  if (!req.body.precio_comprada) {
    res.status(400).send("The precio_comprada field is required.");
  }

  const photocard = await createPhotocard(
    req.body.nombre_idol,
    req.body.nombre_grupo,
    req.body.nombre_album,
    req.body.imagen,
    req.body.precio,
    req.body.precio_comprada
  );
  if (photocard == false) {
    res
      .status(500)
      .send("An error occurred while attempting to create the photocard.");
  }
  res.status(201).send("Photocard created successfully");
});

app.delete("/api/v1/photocards/:id", async (req, res) => {
  const photocard = await getPhotocard(req.params.id);
  if (photocard == undefined) {
    res.status(404).send("Not Found: The requested resource was not found.");
  }

  const status = await deletePhotocard(req.params.id);
  if (status == false) {
    res.status(500).send("An error occurred ");
  }
  res.status(200).send("Item deleted successfully.");
});

app.put("/api/v1/photocards/:id", async (req, res) => {
  const photocard = await getPhotocard(req.params.id);
  if (photocard == undefined) {
    res.status(404).send("Not Found: The requested resource was not found.");
  }

  const columns = Object.keys(req.body); //obtengo las llaves del json
  const values = Object.values(req.body); //obtengo los valores del json
  const status = await updatePhotocards(req.params.id, columns, values);

  if (status == false) {
    res.status(500).send("An error occurred ");
  }
  res.status(200).send("Changes saved successfully.");
});

//CRUD photocards_vendidas

app.get("/api/v1/photocards_vendidas", async (req, res) => {
  const transacciones = await getAllTransacciones();
  //verificador de errores de servidor
  if (transacciones == false) {
    res.status(500).send("An error occurred");
  }
  res.json(transacciones);
});

app.get("/api/v1/photocards_vendidas/:id", async (req, res) => {
  const transaccion = await getTransaccion(req.params.id);
  if (transaccion == undefined) {
    res.status(404).send("Transaccion Not Found");
  }
  if (transaccion == false) {
    res.status(500).send("An error occurred");
  }

  res.json(transaccion);
});

app.post("/api/v1/photocards_vendidas", async (req, res) => {
  if (!req.body.tipo_entrega) {
    res.status(400).send("The tipo_entrega field is required.");
  }
  if (!req.body.lugar_entrega) {
    res.status(400).send("The lugar_entrega field is required.");
  }
  if (!req.body.costo_entrega) {
    res.status(400).send("The costo_entrega field is required.");
  }
  if (!req.body.fecha_entrega) {
    res.status(400).send("The fecha_entrega field is required.");
  }
  if (!req.body.hora_entrega) {
    res.status(400).send("The hora_entrega field is required.");
  }
  if (!req.body.id_photocard) {
    res.status(400).send("The id_photocard field is required.");
  }

  const photocard = await getPhotocard(req.body.id_photocard);

  if (photocard == undefined) {
    res.status(404).send("Photocard Not Found");
  }

  const transaccion = await createTransaccion(
    req.body.tipo_entrega,
    req.body.lugar_entrega,
    req.body.costo_entrega,
    req.body.fecha_entrega,
    req.body.hora_entrega,
    req.body.id_photocard
  );
  if (transaccion == false) {
    res
      .status(500)
      .send("An error occurred while attempting to create the transaccion.");
  }
  res.status(201).send("Transaccion created successfully");
});

app.delete("/api/v1/photocards_vendidas/:id", async (req, res) => {
  const transaccion = await getTransaccion(req.params.id);
  if (transaccion == undefined) {
    res.status(404).send("Not Found: The requested resource was not found.");
  }

  const status = await deleteTransaccion(req.params.id);
  if (status == false) {
    res.status(500).send("An error occurred ");
  }
  res.status(200).send("Item deleted successfully.");
});

app.put("/api/v1/photocards_vendidas/:id", async (req, res) => {
  const transaccion = await getTransaccion(req.params.id);
  if (transaccion == undefined) {
    res.status(404).send("Not Found: The requested resource was not found.");
  }

  const columns = Object.keys(req.body); //obtengo las llaves del json
  const values = Object.values(req.body); //obtengo los valores del json
  const status = await updateTransaccion(req.params.id, columns, values);

  if (status == false) {
    res.status(500).send("An error occurred ");
  }
  res.status(200).send("Changes saved successfully.");
});

//CRUD de compradores
app.get("/api/v1/compradores", async (req, res) => {
  const compradores = await getAllCompradores();
  //verificador de errores de servidor
  if (compradores == false) {
    res.status(500).send("An error occurred");
  }
  res.json(compradores);
});

app.get("/api/v1/compradores/:id", async (req, res) => {
  const comprador = await getComprador(req.params.id);
  if (comprador == undefined) {
    res.status(404).send("Comprador Not Found");
  }
  if (comprador == false) {
    res.status(500).send("An error occurred");
  }

  res.json(comprador);
});

app.post("/api/v1/compradores", async (req, res) => {
  if (!req.body.nombre) {
    res.status(400).send("The nombre field is required.");
  }
  if (!req.body.numero_telefono) {
    res.status(400).send("The numero_telefono field is required.");
  }
  if (!req.body.usuario_instagram) {
    res.status(400).send("The usuario_instagram field is required.");
  }
  if (!req.body.medio_de_pago) {
    res.status(400).send("The medio_de_pago field is required.");
  }
  if (!req.body.localidad) {
    res.status(400).send("The localidad field is required.");
  }
  if (!req.body.id_photocard_comprada) {
    res.status(400).send("The id_photocard_comprada field is required.");
  }

  const transaccion = await getTransaccion(req.body.id_photocard_comprada);

  if (transaccion == undefined) {
    res.status(404).send("Transaccion Not Found");
  }

  const comprador = await createComprador(
    req.body.nombre,
    req.body.numero_telefono,
    req.body.usuario_instagram,
    req.body.medio_de_pago,
    req.body.localidad,
    req.body.id_photocard_comprada
  );
  if (transaccion == false) {
    res
      .status(500)
      .send("An error occurred while attempting to create the comprador.");
  }
  res.status(201).send("comprador created successfully");
});

app.delete("/api/v1/compradores/:id", async (req, res) => {
  const comprador = await getComprador(req.params.id);
  if (comprador == undefined) {
    res.status(404).send("Not Found: The requested resource was not found.");
  }

  const status = await deleteComprador(req.params.id);
  if (status == false) {
    res.status(500).send("An error occurred ");
  }
  res.status(200).send("Item deleted successfully.");
});

app.put("/api/v1/compradores/:id", async (req, res) => {
  const comprador = await getComprador(req.params.id);
  if (comprador == undefined) {
    res.status(404).send("Not Found: The requested resource was not found.");
  }

  const columns = Object.keys(req.body); //obtengo las llaves del json
  const values = Object.values(req.body); //obtengo los valores del json
  const status = await updateComprador(req.params.id, columns, values);

  if (status == false) {
    res.status(500).send("An error occurred ");
  }
  res.status(200).send("Changes saved successfully.");
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
    
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: 'El ID debe ser un número entero válido' });
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

    const { nombre, imagen, precio_comprada, fecha_comprada, estado, id_album} = req.body;

    if (
        nombre == null ||
        imagen == null ||
        precio_comprada == null ||
        fecha_comprada == null ||
        estado == null ||
        id_album == null) {
        return res.status(400).json({ error: 'Faltan campos para crear la photocard'});
    }


    if (nombre.length > max_longitud_valor.nombre) {
        return res.status(400).json({ error: 'El nombre no puede tener más de ' +  max_longitud_valor.nombre + ' caracteres' });
    }

    if (imagen.length > max_longitud_valor.imagen) {
        return res.status(400).json({ error: 'El álbum no puede tener más de ' + max_longitud_valor.imagen + ' caracteres' });
    }

    if (estado.length < max_longitud_valor.estado) {
        if (!estadosValidos.includes(estado.toLowerCase())) {
           return res.status(400).json({ error: 'El estado debe ser "vendida", "disponible" p "entregada' });
        }
    } else {
        return res.status(400).json({ error: 'El estado de la photocard no puede tener más de ' + max_longitud_valor.estado + ' caracteres' });
    }

    if (!Number.isInteger(precio_comprada) || precio_comprada < 0) {
        return res.status(400).json({ error: 'El precio debe ser un número entero positivo' });
    }

    if (isNaN(Date.parse(fecha_comprada))) {
        return res.status(400).json({ error: 'La fecha comprada no es válida' });
    }

    if (!Number.isInteger(id_album) || id_album <= 0) {
        return res.status(400).json({ error: 'El id del album debe ser un número entero positivo' });
    }

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

    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: 'El ID debe ser un número entero válido' });
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
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    const camposPermitidos = ['nombre', 'imagen', 'precio_comprada', 'fecha_comprada', 'estado', 'id_album'];
    const datos = {};

    for (const campo of camposPermitidos) {
        if (req.body[campo] !== undefined) {
            datos[campo] = req.body[campo];
        }
    }

    if (Object.keys(datos).length === 0) {
        return res.status(400).json({ error: 'No se enviaron campos válidos para actualizar' });
    }

    if (datos.nombre !== undefined && datos.nombre.length > max_longitud_valor.nombre) {
        return res.status(400).json({ error: `El nombre no puede tener más de ${max_longitud_valor.nombre} caracteres` });
    }

    if (datos.imagen !== undefined && datos.imagen.length > max_longitud_valor.imagen) {
        return res.status(400).json({ error: `La URL de la imagen no puede tener más de ${max_longitud_valor.imagen} caracteres` });
    }

    if (datos.precio_comprada !== undefined &&
        (!Number.isInteger(datos.precio_comprada) || datos.precio_comprada < 0)) {
        return res.status(400).json({ error: 'El precio debe ser un número entero positivo' });
    }

    if (datos.fecha_comprada !== undefined && isNaN(Date.parse(datos.fecha_comprada))) {
        return res.status(400).json({ error: 'La fecha comprada no es válida' });
    }

    if (datos.estado !== undefined && !estadosValidos.includes(datos.estado)) {
        return res.status(400).json({ error: 'Estado inválido' });
    }

    if (datos.id_album !== undefined &&
        (!Number.isInteger(datos.id_album) || datos.id_album <= 0)) {
        return res.status(400).json({ error: 'El id del álbum debe ser un número entero positivo' });
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
    
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: 'El ID debe ser un número entero válido' });
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

    const { nombre, version_album, grupo, imagen, fecha_lanzamiento, precio } = req.body;

    if (
        nombre == null ||
        version_album == null ||
        grupo == null ||
        precio == null) {
        return res.status(400).json({ error: 'Faltan campos para crear el album'});
    }


    if (nombre.length > max_caract_valores_albums.nombre) {
        return res.status(400).json({ error: 'El nombre no puede tener más de ' +  max_caract_valores_albums.nombre + ' caracteres' });
    }

    if (version_album.length > max_caract_valores_albums.version_album) {
        return res.status(400).json({ error: 'La version del album no puede tener más de ' +  max_caract_valores_albums.version_album + ' caracteres' });
    }

    if (grupo.length > max_caract_valores_albums.grupo) {
        return res.status(400).json({ error: 'El grupo no puede tener más de ' + max_caract_valores_albums.grupo + ' caracteres' });
    }

    if (imagen != null && imagen.length > max_caract_valores_albums.imagen) {
        return res.status(400).json({ error: 'El álbum no puede tener más de ' + max_caract_valores_albums.imagen + ' caracteres' });
    }
    
    if (fecha_lanzamiento != null &&isNaN(Date.parse(fecha_lanzamiento))) {
        return res.status(400).json({ error: 'La fecha de lanzamiento no es válida' });
    }

    if (!Number.isInteger(precio) || precio < 0) {
        return res.status(400).json({ error: 'El precio debe ser un número entero positivo' });
    }

    try {
        const album = await createAlbum(
            nombre, version_album , grupo , imagen , fecha_lanzamiento, precio);

        if (!album) {
            return res.status(500).json({ error: 'Error al crear el album' });
        }
        return res.status(201).json(album);
    } catch(e) {
        return res.status(500).json({ error: 'Error al crear el album'});
    }

})


app.delete('/api/albums/:id', async (req, res) => {

    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: 'El ID debe ser un número entero válido' });
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
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    const camposPermitidos = ['nombre', 'version_album', 'grupo', 'imagen', 'fecha_lanzamiento', 'precio'];
    const datos = {};

    for (const campo of camposPermitidos) {
        if (req.body[campo] !== undefined) {
            datos[campo] = req.body[campo];
        }
    }


    if (Object.keys(datos).length === 0) {
        return res.status(400).json({ error: 'No se enviaron campos válidos para actualizar' });
    }

    if (datos.nombre !== undefined && datos.nombre.length > max_caract_valores_albums.nombre) {
        return res.status(400).json({ error: `El nombre no puede tener más de ${max_caract_valores_albums.nombre} caracteres` });
    }

    if (datos.version_album !== undefined && datos.version_album.length > max_caract_valores_albums.version_album) {
        return res.status(400).json({ error: `La versión del album no puede tener más de ${max_caract_valores_albums.version_album} caracteres` });
    }

    if (datos.grupo !== undefined && datos.grupo.length > max_caract_valores_albums.grupo ) {
        return res.status(400).json({ error: `El nombre del grupo no puede tener más de ${max_caract_valores_albums.grupo} caracteres` });
    }

    if (datos.imagen !== undefined && datos.imagen.length > max_caract_valores_albums.imagen ) {
        return res.status(400).json({ error: `La URL de la imagen no puede tener más de ${max_caract_valores_albums.imagen} caracteres` });
    }
    
    if (datos.fecha_lanzamiento !== undefined && isNaN(Date.parse(datos.fecha_lanzamiento))) {
        return res.status(400).json({ error: 'La fecha de lanzamiento no es válida' });
    }
    if (datos.precio !== undefined &&
        (!Number.isInteger(datos.precio) || datos.precio < 0)) {
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
    
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: 'El ID debe ser un número entero válido' });
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
        id_photocard,
        id_album
    } = req.body;

    const formatoHora = /^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/;

    // Validar campos obligatorios (instagram_cliente puede ser null)
    if (
        nombre_cliente == null ||
        telefono_cliente == null ||
        precio_venta == null ||
        medio_de_pago == null ||
        fecha_venta == null ||
        lugar_entrega == null ||
        fecha_entrega == null ||
        costo_entrega == null ||
        id_photocard == null ||
        id_album == null
    ) {
        return res.status(400).json({ error: 'Faltan campos para crear la venta' });
    }

    // Validaciones de longitud
    if (nombre_cliente.length > max_caract_valores_ventas.nombre_cliente) {
        return res.status(400).json({ error: `El nombre del cliente no puede tener más de ${max_caract_valores_ventas.nombre_cliente} caracteres` });
    }

    if (telefono_cliente.length > max_caract_valores_ventas.telefono_cliente) {
        return res.status(400).json({ error: `El teléfono del cliente no puede tener más de ${max_caract_valores_ventas.telefono_cliente} caracteres` });
    }

    if (instagram_cliente != null && instagram_cliente.length > max_caract_valores_ventas.instagram_cliente) {
        return res.status(400).json({ error: `El instagram del cliente no puede tener más de ${max_caract_valores_ventas.instagram_cliente} caracteres` });
    }

    if (!Number.isInteger(precio_venta) || precio_venta < 0) {
        return res.status(400).json({ error: 'El precio debe ser un número entero positivo' });
    }

    if (medio_de_pago.length > max_caract_valores_ventas.medio_de_pago) {
        return res.status(400).json({ error: `El medio de pago no puede tener más de ${max_caract_valores_ventas.medio_de_pago} caracteres` });
    }

    // Validar fechas con Date.parse
    if (isNaN(Date.parse(fecha_venta))) {
        return res.status(400).json({ error: 'La fecha de venta no es válida' });
    }

    if (lugar_entrega.length > max_caract_valores_ventas.lugar_entrega) {
        return res.status(400).json({ error: `El lugar de entrega no puede tener más de ${max_caract_valores_ventas.lugar_entrega} caracteres` });
    }

    if (isNaN(Date.parse(fecha_entrega))) {
        return res.status(400).json({ error: 'La fecha de entrega no es válida' });
    }

    // Validar hora_entrega solo si está presente (es opcional)
    if (hora_entrega != null && !formatoHora.test(hora_entrega)) {
        return res.status(400).json({ error: 'La hora de entrega no es válida. Debe tener formato HH:MM o HH:MM:SS' });
    }

    if (!Number.isInteger(costo_entrega) || costo_entrega < 0) {
        return res.status(400).json({ error: 'El costo de entrega debe ser un número entero positivo' });
    }

    if (!Number.isInteger(id_photocard) || id_photocard <= 0) {
        return res.status(400).json({ error: 'El id de la photocard debe ser un número entero mayor a 0' });
    }

    if (!Number.isInteger(id_album) || id_album <= 0) {
        return res.status(400).json({ error: 'El id del album debe ser un número entero mayor a 0' });
    }

    try {
        const venta = await createVenta(
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
            id_photocard,
            id_album
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

    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: 'El ID debe ser un número entero válido' });
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
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    const camposPermitidos = [
            nombre_cliente,
            telefono_cliente,
            instagram_cliente,
            precio_venta ,
            medio_de_pago,
            fecha_venta,
            lugar_entrega,
            fecha_entrega,
            hora_entrega,
            costo_entrega,
            id_photocard,
            id_album];

    const datos = {};

    for (const campo of camposPermitidos) {
        if (req.body[campo] !== undefined) {
            datos[campo] = req.body[campo];
        }
    }

    if (Object.keys(datos).length === 0) {
        return res.status(400).json({ error: 'No se enviaron campos válidos para actualizar' });
    }

    if (datos.nombre_cliente !== undefined && datos.nombre_cliente.length > max_caract_valores_ventas.nombre_cliente) {
        return res.status(400).json({ error: `El nombre del cliente no puede tener más de ${max_caract_valores_ventas.nombre_cliente} caracteres` });
    }


   if (datos.telefono_cliente !== undefined && telefono_cliente.length > max_caract_valores_ventas.telefono_cliente) {
        return res.status(400).json({ error: 'El telefono del cliente no puede tener más de ' +  max_caract_valores_ventas.telefono_cliente + ' caracteres' });
    }  

    if (datos.instagram_cliente !== undefined && instagram_cliente.length > max_caract_valores_ventas.instagram_cliente) {
       return res.status(400).json({ error: 'El instagram del cliente no puede tener más de ' +  max_caract_valores_ventas.instagram_cliente + ' caracteres' }); 
    } 

    if (datos.precio_venta !== undefined && (!Number.isInteger(precio_venta) || precio_venta < 0)) {
        return res.status(400).json({ error: 'El precio debe ser un número entero positivo' });
    }

    if (datos.medio_de_pago !== undefined && medio_de_pago.length > max_caract_valores_ventas.medio_de_pago) {
        return res.status(400).json({ error: 'El medio de pago no puede tener más de ' + max_caract_valores_ventas.medio_de_pago + ' caracteres' });
    }

    if (datos.fecha_venta !== undefined && isNaN(Date.parse(fecha_venta))) {
        return res.status(400).json({ error: 'La fecha de venta no es válida' });
    }

    if (datos.lugar_entrega !== undefined && lugar_entrega.length > max_caract_valores_ventas.lugar_entrega) {
        return res.status(400).json({ error: 'El lugar de entrega no puede tener más de ' + max_caract_valores_ventas.lugar_entrega+ ' caracteres' });
    }

    if (datos.fecha_entrega !== undefined && isNaN(Date.parse(fecha_entrega))) {
        return res.status(400).json({ error: 'La fecha de entrega no es válida' });
    }

    if (datos.hora_entrega !== undefined && !formatoHora.test(datos.hora_entrega)) {
        return res.status(400).json({ error: 'La hora de entrega no es válida. Debe tener formato HH:MM o HH:MM:SS' });
    } 

    if (datos.costo_entrega !== undefined && (!Number.isInteger(costo_entrega) || costo_entrega < 0)) {
        return res.status(400).json({ error: 'El costo de entrega debe ser un número entero positivo' });
    }
    
    if (datos.id_photocard !== undefined && (!Number.isInteger(id_photocard) || id_photocard <= 0)) {
        return res.status(400).json({ error: 'El id de la photocard debe ser un número entero mayor a 0' });
    }

    if (datos.id_album !== undefined && (!Number.isInteger(id_album) || id_album <= 0)) {
        return res.status(400).json({ error: 'El id del album debe ser un número entero mayor a 0' });
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
