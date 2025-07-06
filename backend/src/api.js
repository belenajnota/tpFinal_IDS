const express = require("express");
const {
  getAllPhotocards,
  getPhotocard,
  createPhotocard,
  deletePhotocard,
  updatePhotocards,
} = require("./photocard.js");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
//Health route
app.get("/Api/health", (req, res) => {
  res.json({ status: "OK" });
});

// CRUD de photocards
app.get("/api/photocards", async (req, res) => {
  const photocards = await getAllPhotocards();
  //verificador de errores de servidor
  if (photocards == false) {
    res.status(500).send("An error occurred");
  }
  res.json(photocards);
});

app.get("/api/photocards/:num", async (req, res) => {
  const photocard = await getPhotocard(req.params.num);
  if (photocard == undefined) {
    res.status(404).send("Photocard Not Found");
  }
  if (photocard == false) {
    res.status(500).send("An error occurred");
  }

  res.json(photocard);
});

app.post("/api/photocards", async (req, res) => {
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

app.delete("/api/photocards/:id", async (req, res) => {
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

app.put("/api/photocards/:id", async (req, res) => {
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

app.listen(PORT, () => {
  console.log("Puerto: ", PORT);
});
