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

app.listen(PORT, () => {
  console.log("Puerto: ", PORT);
});
