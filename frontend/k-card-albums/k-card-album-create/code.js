const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const ventaBackendUrl = "http://localhost:3000/api/ventas/" + id;

const formulario = document.getElementById("formulario");

async function getInfoForm() {
  const requestJson = {};
  const regexNumber = /^[0-9]+$/;
  const inputNombreAlbum = document.getElementById("nombreAlbum");
  const valueNombreAlbum = inputNombreAlbum.value;
  if (valueNombreAlbum.length !== 0) {
    requestJson.nombre = valueNombreAlbum;
  }
  const inputVersionAlbum = document.getElementById("versionAlbum");
  const valueVersionAlbum = inputVersionAlbum.value;

  if (valueVersionAlbum.length !== 0) {
    requestJson.version_album = valueVersionAlbum;
  }

  const inputGrupo = document.getElementById("Grupo");
  const valueGrupo = inputGrupo.value;
  if (valueGrupo.length !== 0) {
    requestJson.grupo = valueGrupo;
  }

  const regexHttp = /^https?:\/\//;
  const inputImagen = document.getElementById("Imagen");
  const valueImagen = inputImagen.value;
  if (valueImagen.length !== 0 && regexHttp.test(valueImagen)) {
    requestJson.imagen = valueImagen;
  }

  const inputFechaLanzamiento = document.getElementById("fechaLanzamiento");
  const valueFechaLanzamiento = inputFechaLanzamiento.value;
  if (valueFechaLanzamiento.length !== 0) {
    requestJson.fecha_lanzamiento = valueFechaLanzamiento;
  }
  const inputPrecioAlbum = document.getElementById("Precio");
  const valuePrecioAlbum = inputPrecioAlbum.value;
  if (valuePrecioAlbum.length !== 0 && regexNumber.test(valuePrecioAlbum)) {
    const precioAlbumEntero = parseInt(valuePrecioAlbum);
    requestJson.precio = precioAlbumEntero;
  }
  console.log("funcion ejecutada");
  return requestJson;
}

async function createVenta() {
  const requestJson = await getInfoForm();
  console.log(requestJson);
  const postBackendUrl = "http://localhost:3000/api/albums";
  await fetch(postBackendUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestJson),
  });

  alert("se creo un album");
}

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  createVenta();
  setTimeout(() => {
    window.location.href = "../index.html?nocache=" + new Date().getTime();
  }, 3000);
});
