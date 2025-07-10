const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const albumBackendUrl = "http://localhost:3000/api/albums/" + id;

async function getAlbum() {
  const response = await fetch(albumBackendUrl);
  const album = await response.json();
  document.getElementById("nombreAlbum").placeholder = album.nombre;
  document.getElementById("versionAlbum").placeholder = album.version_album;
  document.getElementById("Grupo").placeholder = album.grupo;
  document.getElementById("Precio").placeholder = album.precio;
}
getAlbum();
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

async function updateAlbum() {
  const requestJson = await getInfoForm();
  console.log(requestJson);

  await fetch(albumBackendUrl, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestJson),
  });

  alert("se modifico el album");
}

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  updateAlbum();
  setTimeout(() => {
    window.location.href = "../index.html?nocache=" + new Date().getTime();
  }, 3000);
});
