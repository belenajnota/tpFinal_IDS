const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const photocardBackendUrl = "http://localhost:3000/api/photocards/" + id;
const formulario = document.getElementById("formulario");

// codigo para opcion modificar
async function completeSelects() {
  // esto es para los select que estan dentro del modal modificacion
  try {
    const albumBackendUrl = "http://localhost:3000/api/albums";
    const responseAlbum = await fetch(albumBackendUrl);
    const albums = await responseAlbum.json();
    const selectAlbum = document.getElementById("Album");
    albums.forEach((album) => {
      const newOptionAlbum = document.createElement("option");
      newOptionAlbum.innerHTML = album.nombre;
      selectAlbum.appendChild(newOptionAlbum);
    });
  } catch (e) {}
}

completeSelects();

formulario.addEventListener("submit", (event) => {
  event.preventDefault(); // Esto detiene el envío del formulario y la recarga de la página.
  async function getInfoForm() {
    const requestJson = {};
    const regexNumber = /^[0-9]+$/;
    const inputNombrePhotocard = document.getElementById("nombrePhotocard");
    const valueNombrePhotocard = inputNombrePhotocard.value;
    if (valueNombrePhotocard.length !== 0) {
      requestJson.nombre = valueNombrePhotocard;
    }

    const inputPrecioPhotocard = document.getElementById("precioCompra");
    const valuePrecioPhotocard = inputPrecioPhotocard.value;
    if (
      valuePrecioPhotocard.length !== 0 &&
      regexNumber.test(valuePrecioPhotocard)
    ) {
      const precioPhotocardEntero = parseInt(valuePrecioPhotocard);
      requestJson.precio_comprada = precioPhotocardEntero;
    }

    const regexHttp = /^https?:\/\//;
    const inputImagen = document.getElementById("Imagen");
    const valueImagen = inputImagen.value;
    if (valueImagen.length !== 0 && regexHttp.test(valueImagen)) {
      requestJson.imagen = valueImagen;
    } else {
      requestJson.imagen = "../../imagenes/no-img.jpeg";
    }
    const inputFechaCompra = document.getElementById("fechaCompra");
    const valueFechaCompra = inputFechaCompra.value;
    if (valueFechaCompra.length !== 0) {
      requestJson.fecha_comprada = valueFechaCompra;
    }
    requestJson.estado = "disponible";

    const albumBackendUrl = "http://localhost:3000/api/albums";
    const responseAlbum = await fetch(albumBackendUrl);
    const albums = await responseAlbum.json();

    const selectAlbum = document.getElementById("Album");
    const valueSelectAlbum = selectAlbum.value;
    const albumEncontrado = albums.find(
      (album) => album.nombre === valueSelectAlbum
    );

    if (valueSelectAlbum.length !== 0 && valueSelectAlbum !== "null") {
      requestJson.id_album = albumEncontrado.id;
    } else if (valueSelectAlbum.length !== 0 && valueSelectAlbum == "null") {
      requestJson.id_album = null;
    }

    console.log("funcion ejecutada");
    return requestJson;
  }

  async function createPhotocard() {
    const requestJson = await getInfoForm();
    console.log(requestJson);
    const postBackendUrl = "http://localhost:3000/api/photocards";
    await fetch(postBackendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestJson),
    });

    console.log("Hubo cambios en el robos");
  }

  createPhotocard();
  //aca hacer el patch
  setTimeout(() => {
    window.location.href = "../index.html?nocache=" + new Date().getTime();
  }, 3000);
  alert("Formulario procesado y cambios guardados");
});
