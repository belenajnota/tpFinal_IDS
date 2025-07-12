const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const photocardBackendUrl = "http://localhost:3000/api/photocards/" + id;

async function getPhotocard() {
  try {
    const responsePhotocard = await fetch(photocardBackendUrl);
    const photocard = await responsePhotocard.json();
    //Llamo a todas la filas de la columna
    console.log(photocard);
    const imgPhotocard = document.getElementById("imgPhotocard");
    if (photocard.imagen == null) {
      imgPhotocard.src = "../../imagenes/no-img.jpeg";
    } else {
      imgPhotocard.src = photocard.imagen;
    }

    const nombrePhotocard = document.getElementById("nombre");
    const precioCompra = document.getElementById("precio-compra");
    const estado = document.getElementById("estado");
    const fechaCompra = document.getElementById("fecha-compra");
    //Appendeo la informacion a la tabla
    nombrePhotocard.innerHTML = photocard.nombre;
    precioCompra.innerHTML = "$" + photocard.precio_comprada;
    estado.innerHTML = photocard.estado;
    if (photocard.fecha_comprada !== null) {
      const fecha = photocard.fecha_comprada;
      const fechaLimpia = fecha.split("T")[0];
      fechaCompra.innerHTML = fechaLimpia;
    }
  } catch (e) {
    console.log(e);
  }
}

getPhotocard();

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
        }
        const inputFechaCompra = document.getElementById("fechaCompra");
        const valueFechaCompra = inputFechaCompra.value;
        if (valueFechaCompra.length !== 0) {
          requestJson.fecha_comprada = valueFechaCompra;
        }
        const selectEstado = document.getElementById("Estado");
        const valueEstado = selectEstado.value;
        if (valueEstado !== "Selecciona un Estado") {
          requestJson.estado = valueEstado;
        }

        console.log("funcion ejecutada");

        inputNombrePhotocard.value = "";
        inputVersionphotocard.value = "";
        inputGrupo.value = "";
        inputImagen.value = "";
        inputFechaLanzamiento.value = "";
        inputPreciophotocard.value = "";
        return requestJson;
      }

      async function updatephotocard() {
        const requestJson = await getInfoForm();
        console.log(requestJson);
        const patchBackendUrl = "http://localhost:3000/api/photocards/" + id;
        await fetch(patchBackendUrl, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestJson),
        });

        console.log("Hubo cambios en el robos");
      }

      updatephotocard();
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
    "¿Estas seguro de borrar esta photocard? Si desea eliminar escriba 'Eliminar-photocard'"
  );
  async function deletephotocard() {
    try {
      await fetch(photocardBackendUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Se elimino correctamente");
    } catch (e) {
      alert("Ocurrio un error al intentar eliminar la photocard");
    }
  }
  if (mensajeBorrar == "Eliminar-photocard") {
    deletephotocard();
    setTimeout(() => {
      window.location.href = "../index.html?nocache=" + new Date().getTime();
    }, 3000);
  }
});

//photocards asociadas
const photocardsBackendUrl = "http://localhost:3000/api/photocards";

const AlbumsBackendUrl = "http://localhost:3000/api/albums";

async function getAlbums() {
  try {
    const response = await fetch(AlbumsBackendUrl);
    const albums = await response.json();

    const responsePhotocard = await fetch(photocardBackendUrl);
    const photocard = await responsePhotocard.json();

    albums.forEach((album) => {
      if (photocard.id_album == album.id) {
        // se crea la fila para toda la informacion
        const newContainer = document.createElement("div");
        newContainer.className =
          "card-photocard is-flex is-flex-direction-column";
        // se crean y se appendean los datos en la fila
        const imgAlbum = document.createElement("img");
        if (album.imagen == null) {
          imgAlbum.src = "../imagenes/no-img.jpeg";
          newContainer.appendChild(imgAlbum);
        } else {
          imgAlbum.src = album.imagen;
          newContainer.appendChild(imgAlbum);
        }

        const nombreAlbum = document.createElement("h2");
        nombreAlbum.className = "nombre-photocard";
        nombreAlbum.innerHTML = album.nombre;
        newContainer.appendChild(nombreAlbum);

        // se crean los botones para las acciones ver, borrar y modificar
        const newButtonVer = document.createElement("a");
        newButtonVer.innerHTML = "Ver";
        newButtonVer.className = "button";
        newButtonVer.id = "button-card";
        newButtonVer.href =
          "../../k-card-albums/k-card-album/index.html?id=" + album.id;
        newContainer.appendChild(newButtonVer);

        const newButtonBorrar = document.createElement("a");
        newButtonBorrar.innerHTML = "Borrar";
        newButtonBorrar.className = "button ";
        newButtonBorrar.id = "button-card";
        newContainer.appendChild(newButtonBorrar);

        newButtonBorrar.addEventListener("click", () => {
          const mensajeBorrar = prompt(
            "¿Estas seguro de borrar este album? Si desea eliminar escriba 'Eliminar-album'"
          );
          const albumBackendUrl =
            "http://localhost:3000/api/albums/" + album.id;
          async function deleteAlbum() {
            try {
              await fetch(albumBackendUrl, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              });
              console.log("Se elimino correctamente");
            } catch (e) {
              alert("Ocurrio un error al intentar eliminar el album");
            }
          }
          if (mensajeBorrar == "Eliminar-album") {
            deleteAlbum();
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
          "../../k-card-albums/k-card-album-update/index.html?id=" + album.id;

        newContainer.appendChild(newButtonModificar);

        const containerCard = document.getElementById("container-card");
        containerCard.appendChild(newContainer);
      }
    });
  } catch (e) {
    console.log(e);
  }
}

getAlbums();
