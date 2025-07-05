const express = require("express");
const {
  getAllPhotocards,
  getPhotocard,
  createPhotocard,
} = require("./photocard.js");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/api/photocards", async (req, res) => {
  const photocards = await getAllPhotocards();
  res.json(photocards);
});

app.get("/api/photocards/:num", async (req, res) => {
  const photocard = await getPhotocard(req.params.num);
  if (photocard == undefined) {
    res.status(404).send("Photocard Not Found");
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

  res.status(201).send("Photocard created successfully");
});

//Health route
app.get("/Api/health", (req, res) => {
  res.json({ status: "OK" });
});

app.listen(PORT, () => {
  console.log("Puerto: ", PORT);
});
