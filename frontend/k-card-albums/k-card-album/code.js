const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const albumBackendUrl = "http://localhost:3000/api/albums/" + id;

async function getalbum() {
  try {
    const responsealbum = await fetch(albumBackendUrl);
    const album = await responsealbum.json();
    //Llamo a todas la filas de la columna
    const imgAlbum = document.getElementById("imgAlbum");
    if (album.imagen == null) {
      imgAlbum.src = "../../imagenes/no-img.jpeg";
    } else {
      imgAlbum.src = album.imagen;
    }

    const nombreAlbum = document.getElementById("nombre");
    const versionAlbum = document.getElementById("version-album");
    const grupo = document.getElementById("grupo");
    const fechaLanzamiento = document.getElementById("fecha-lanzamiento");
    const precio = document.getElementById("precio");
    //Appendeo la informacion a la tabla
    nombreAlbum.innerHTML = album.nombre;
    versionAlbum.innerHTML = album.version_album;
    grupo.innerHTML = album.grupo;
    if (album.fecha_lanzamiento !== null) {
      fechaLanzamiento.innerHTML = album.fecha_lanzamiento.split("T")[0];
    }
    precio.innerHTML = "$" + album.precio;
    //fetch para la informacion de la photocard
    /*const photocardBackendUrl =
      "http://localhost:3000/api/photocards/" + album.id_photocard;
    const responsePhotocard = await fetch(photocardBackendUrl);
    const photocard = await responsePhotocard.json();
    const imgPhotocard = photocard.imagen;
    const imgPhotocardHtml = document.getElementById("photocard-img");
    if (imgPhotocard == null) {
      imgPhotocardHtml.src = "../../imagenes/no-img.jpeg";
    } else {
      imgPhotocardHtml.src = imgPhotocard;
    }
    //Apendeo el nombre de la photocard
    const nombrePhotocardHtml = document.getElementById("nombre-photocard");
    const nombrePhotocard = photocard.nombre;
    nombrePhotocardHtml.innerHTML = "Nombre del Idol:<br />" + nombrePhotocard;*/
  } catch (e) {
    console.log(e);
  }
}

getalbum();

async function getIdOfPhotocard(nombre_photocard) {
  try {
    const response = await fetch("http://localhost:3000/api/photocards");
    const photocards = await response.json();
    const photocardEncontrado = photocards.find(
      (photocard) => photocard.nombre === nombre_photocard
    );
    const idPhotocard = photocardEncontrado.id;
    return idPhotocard;
  } catch (e) {}
}

async function getIdOfAlbum(nombre_album) {
  try {
    const response = await fetch("http://localhost:3000/api/albums");
    const albums = await response.json();
    const albumEncontrado = albums.find(
      (album) => album.nombre === nombre_album
    );
    const idAlbum = albumEncontrado.id;
    return idAlbum;
  } catch (e) {}
}

//codigo para que funcione el modal
document.addEventListener("DOMContentLoaded", () => {
  // ... (Tus funciones de modal existentes) ...
  function openModal($el) {
    $el.classList.add("is-active");
  }

  function closeModal($el) {
    $el.classList.remove("is-active");
  }

  function closeAllModals() {
    (document.querySelectorAll(".modal") || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll(".js-modal-trigger") || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener("click", () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (
    document.querySelectorAll(
      ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button"
    ) || []
  ).forEach(($close) => {
    const $target = $close.closest(".modal");

    $close.addEventListener("click", () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllModals();
    }
  });
  //aca se procesa la informacion del formulario
  const formDentroModal = document.querySelector("#formulario");
  if (formDentroModal) {
    formDentroModal.addEventListener("submit", (event) => {
      event.preventDefault(); // Esto detiene el envío del formulario y la recarga de la página.
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

        const inputFechaLanzamiento =
          document.getElementById("fechaLanzamiento");
        const valueFechaLanzamiento = inputFechaLanzamiento.value;
        if (valueFechaLanzamiento.length !== 0) {
          requestJson.fecha_lanzamiento = valueFechaLanzamiento;
        }
        const inputPrecioAlbum = document.getElementById("Precio");
        const valuePrecioAlbum = inputPrecioAlbum.value;
        if (
          valuePrecioAlbum.length !== 0 &&
          regexNumber.test(valuePrecioAlbum)
        ) {
          const precioAlbumEntero = parseInt(valuePrecioAlbum);
          requestJson.precio = precioAlbumEntero;
        }
        console.log("funcion ejecutada");
        inputNombreAlbum.value = "";
        inputVersionAlbum.value = "";
        inputGrupo.value = "";
        inputImagen.value = "";
        inputFechaLanzamiento.value = "";
        inputPrecioAlbum.value = "";
        return requestJson;
      }

      async function updateAlbum() {
        const requestJson = await getInfoForm();
        console.log(requestJson);
        const patchBackendUrl = "http://localhost:3000/api/albums/" + id;
        await fetch(patchBackendUrl, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestJson),
        });

        console.log("Hubo cambios en el robos");
      }

      updateAlbum();
      //aca hacer el patch

      closeModal(formDentroModal.closest(".modal"));

      alert("Formulario procesado y cambios guardados");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    });
  }
});

const deleteButton = document.getElementById("deleteButton");

deleteButton.addEventListener("click", () => {
  const mensajeBorrar = prompt(
    "¿Estas seguro de borrar esta album? Si desea eliminar escriba 'Eliminar-album'"
  );
  async function deletealbum() {
    try {
      await fetch(albumBackendUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Se elimino correctamente");
    } catch (e) {
      alert("Ocurrio un error al intentar eliminar la album");
    }
  }
  if (mensajeBorrar == "Eliminar-album") {
    deletealbum();
    setTimeout(() => {
      window.location.href = "../index.html?nocache=" + new Date().getTime();
    }, 3000);
  }
});

//photocards asociadas
const photocardsBackendUrl = "http://localhost:3000/api/photocards";

async function getPhotocards() {
  try {
    const response = await fetch(photocardsBackendUrl);
    const photocards = await response.json();

    photocards.forEach((photocard) => {
      if (id == photocard.id_album) {
        // se crea la fila para toda la informacion
        const newContainer = document.createElement("div");
        newContainer.className =
          "card-photocard is-flex is-flex-direction-column";
        // se crean y se appendean los datos en la fila
        const imgPhotocard = document.createElement("img");
        if (photocard.imagen == null) {
          imgPhotocard.src = "../imagenes/no-img.jpeg";
          newContainer.appendChild(imgPhotocard);
        } else {
          imgPhotocard.src = photocard.imagen;
          newContainer.appendChild(imgPhotocard);
        }

        const nombrePhotocard = document.createElement("h2");
        nombrePhotocard.className = "nombre-photocard";
        nombrePhotocard.innerHTML = photocard.nombre;
        newContainer.appendChild(nombrePhotocard);

        // se crean los botones para las acciones ver, borrar y modificar
        const newButtonVer = document.createElement("a");
        newButtonVer.innerHTML = "Ver";
        newButtonVer.className = "button";
        newButtonVer.id = "button-card";
        newButtonVer.href =
          "../../k-card-photocard/k-card-photocard/index.html?id=" +
          photocard.id;
        newContainer.appendChild(newButtonVer);

        const newButtonBorrar = document.createElement("a");
        newButtonBorrar.innerHTML = "Borrar";
        newButtonBorrar.className = "button ";
        newButtonBorrar.id = "button-card";
        newContainer.appendChild(newButtonBorrar);

        newButtonBorrar.addEventListener("click", () => {
          const mensajeBorrar = prompt(
            "¿Estas seguro de borrar esta photocard? Si desea eliminar escriba 'Eliminar-photocard'"
          );
          const albumBackendUrl =
            "http://localhost:3000/api/photocards/" + photocard.id;
          async function deletePhotocard() {
            try {
              await fetch(albumBackendUrl, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              });
              console.log("Se elimino correctamente");
            } catch (e) {
              alert("Ocurrio un error al intentar eliminar la photocard");
            }
          }
          if (mensajeBorrar == "Eliminar-photocard") {
            deletePhotocard();
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }
        });

        const newButtonModificar = document.createElement("a");
        newButtonModificar.innerHTML = "Modificar";
        newButtonModificar.className = "button";
        newButtonModificar.id = "button-card";
        newButtonModificar.href =
          "../../k-card-photocard/k-card-photocard-update/index.html?id=" +
          photocard.id;

        newContainer.appendChild(newButtonModificar);

        const containerCard = document.getElementById("container-card");
        containerCard.appendChild(newContainer);
      }
    });
  } catch (e) {
    console.log(e);
  }
}

getPhotocards();
