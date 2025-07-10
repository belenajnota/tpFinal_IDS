const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const ventaBackendUrl = "http://localhost:3000/api/ventas/" + id;

async function getVenta() {
  try {
    const responseVenta = await fetch(ventaBackendUrl);
    const venta = await responseVenta.json();
    //Llamo a todas la filas de la columna
    const nombreCliente = document.getElementById("nombre-cliente");
    const telefonoCliente = document.getElementById("numero-telefono");
    const instagramCliente = document.getElementById("instagram");
    const PrecioVenta = document.getElementById("precio-venta");
    const medioDePago = document.getElementById("medio-de-pago");
    const fechaVenta = document.getElementById("fecha-venta");
    const lugarEntrega = document.getElementById("lugar-entrega");
    const fechaEntrega = document.getElementById("fecha-entrega");
    const horaEntrega = document.getElementById("hora-entrega");
    const costoEntrega = document.getElementById("costo-entrega");
    //Appendeo la informacion a la tabla
    nombreCliente.innerHTML = venta.nombre_cliente;
    telefonoCliente.innerHTML = venta.telefono_cliente;
    instagramCliente.innerHTML = "@" + venta.instagram_cliente;
    PrecioVenta.innerHTML = "$" + venta.precio_venta;
    medioDePago.innerHTML = venta.medio_de_pago;
    fechaVenta.innerHTML = venta.fecha_venta.split("T")[0];
    lugarEntrega.innerHTML = venta.lugar_entrega;
    fechaEntrega.innerHTML = venta.fecha_venta.split("T")[0];
    horaEntrega.innerHTML = venta.hora_entrega + "hs";
    costoEntrega.innerHTML = "$" + venta.costo_entrega;

    //fetch para la informacion del album
    const albumBackendUrl =
      "http://localhost:3000/api/albums/" + venta.id_album;
    const responseAlbum = await fetch(albumBackendUrl);
    const album = await responseAlbum.json();
    const imgAlbum = album.imagen;
    const imgAlbumHtml = document.getElementById("album-img");
    if (imgAlbum == null) {
      imgAlbumHtml.src = "../../imagenes/no-img.jpeg";
    } else {
      imgAlbumHtml.src = imgAlbum;
    }
    //Apendeo el nombre del album
    const nombreAlbumHtml = document.getElementById("nombre-album");
    const nombreAlbum = album.nombre;
    nombreAlbumHtml.innerHTML = "Nombre del Album:<br />" + nombreAlbum;

    //fetch para la informacion de la photocard
    const photocardBackendUrl =
      "http://localhost:3000/api/photocards/" + venta.id_photocard;
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
    nombrePhotocardHtml.innerHTML = "Nombre del Idol:<br />" + nombrePhotocard;
  } catch (e) {
    console.log(e);
  }
}

getVenta();

/*async function deleteVenta() {
  try {
    const responseDelete = await fetch(ventaBackendUrl)

  }
}*/

// codigo para opcion modificar
async function completeSelects() {
  // esto es para los select que estan dentro del modal modificacion
  try {
    const albumBackendUrl = "http://localhost:3000/api/albums";
    const responseAlbum = await fetch(albumBackendUrl);
    const albums = await responseAlbum.json();
    const photocardBackendUrl = "http://localhost:3000/api/photocards";
    const responsePhotocard = await fetch(photocardBackendUrl);
    const photocards = await responsePhotocard.json();
    const selectAlbum = document.getElementById("select-album");
    const selectPhotocard = document.getElementById("select-idol");
    albums.forEach((album) => {
      const newOptionAlbum = document.createElement("option");
      newOptionAlbum.innerHTML = album.nombre;
      selectAlbum.appendChild(newOptionAlbum);
    });
    selectAlbum.addEventListener("change", () => {
      const selectAlbumvalue = selectAlbum.value;
      const albumEncontrado = albums.find(
        (album) => album.nombre === selectAlbumvalue
      );
      const idAlbum = albumEncontrado.id;
      photocards.forEach((photocard) => {
        if (idAlbum == photocard.id_album) {
          const newOptionPhotocard = document.createElement("option");
          newOptionPhotocard.innerHTML = photocard.nombre;
          selectPhotocard.appendChild(newOptionPhotocard);
        }
      });
    });
  } catch (e) {}
}

completeSelects();

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
        const inputNombreCliente = document.getElementById("cliente");
        const valueNombreCliente = inputNombreCliente.value;
        if (valueNombreCliente.length !== 0) {
          requestJson.nombre_cliente = valueNombreCliente;
        }
        const inputTelefonoCliente = document.getElementById("telefono");
        const valueTelefonoCliente = inputTelefonoCliente.value;

        if (
          valueTelefonoCliente.length !== 0 &&
          regexNumber.test(valueTelefonoCliente)
        ) {
          const telefonoEntero = parseInt(valueTelefonoCliente);
          requestJson.telefono_cliente = telefonoEntero;
        }

        const inputInstagramCliente =
          document.getElementById("instagram-cliente");
        const valueInstagramCliente = inputInstagramCliente.value;
        if (valueInstagramCliente.length !== 0) {
          requestJson.instagram_cliente = valueInstagramCliente;
        }
        const inputPrecioVenta = document.getElementById("precioVenta");
        const valuePrecioVenta = inputPrecioVenta.value;
        if (
          valuePrecioVenta.length !== 0 &&
          regexNumber.test(valuePrecioVenta)
        ) {
          const precioVentaEntero = parseInt(valuePrecioVenta);
          requestJson.precio_venta = precioVentaEntero;
        }
        const selectMedioDePago = document.getElementById("medioDePago");
        const valueMedioDePago = selectMedioDePago.value;
        if (valueMedioDePago !== "Selecciona un Medio de Pago") {
          requestJson.medio_de_pago = valueMedioDePago;
        }

        const inputLugarEntrega = document.getElementById("lugarEntrega");
        const valueLugarEntrega = inputLugarEntrega.value;
        if (valueLugarEntrega.length !== 0) {
          requestJson.lugar_entrega = valueLugarEntrega;
        }

        const inputFechaEntrega = document.getElementById("fechaEntrega");
        const valueFechaEntrega = inputFechaEntrega.value;
        const inputFechaVenta = document.getElementById("fechaVenta");
        const valueFechaVenta = inputFechaVenta.value;
        if (
          valueFechaVenta.length !== 0 &&
          valueFechaEntrega.length !== 0 &&
          valueFechaEntrega > valueFechaVenta
        ) {
          requestJson.fecha_entrega = valueFechaVenta;
          requestJson.fecha_venta = valueFechaVenta;
        } else if (
          valueFechaVenta.length !== 0 &&
          valueFechaEntrega.length !== 0
        ) {
          requestJson.fecha_entrega = valueFechaEntrega;
          requestJson.fecha_venta = valueFechaVenta;
        }

        const inputHoraEntrega = document.getElementById("horaEntrega");
        const valueHoraEntrega = inputHoraEntrega.value;
        if (valueHoraEntrega.length !== 0) {
          requestJson.hora_entrega = valueHoraEntrega;
        }
        const inputCostoEntrega = document.getElementById("costoEntrega");
        const valueCostoEntrega = inputCostoEntrega.value;
        if (
          valueCostoEntrega.length !== 0 &&
          regexNumber.test(valueCostoEntrega)
        ) {
          const costoEntregaEntero = parseInt(valueCostoEntrega);
          requestJson.costo_entrega = costoEntregaEntero;
        }

        const selectIdPhotocard = document.getElementById("select-idol");
        const valueIdPhotocard = selectIdPhotocard.value;
        if (valueIdPhotocard !== "Selecciona un Idol") {
          const idPhotocard = await getIdOfPhotocard(valueIdPhotocard);
          requestJson.id_photocard = idPhotocard;
        }

        const selectIdAlbum = document.getElementById("select-album");
        const valueIdAlbum = selectIdAlbum.value;

        if (valueIdAlbum !== "Selecciona un Album") {
          const idAlbum = await getIdOfAlbum(valueIdAlbum);
          requestJson.id_album = idAlbum;
        }
        return requestJson;
      }

      async function updateVenta() {
        const requestJson = await getInfoForm();
        const patchBackendUrl = "http://localhost:3000/api/ventas/" + id;
        await fetch(patchBackendUrl, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestJson),
        });
        console.log(requestJson);
        console.log("Hubo cambios en el robos");
      }
      updateVenta();
      //aca hacer el patch

      closeModal(formDentroModal.closest(".modal"));

      alert("Formulario procesado y cambios guardados");
    });
  }
});

const deleteButton = document.getElementById("deleteButton");

deleteButton.addEventListener("click", () => {
  const mensajeBorrar = prompt(
    "¿Estas seguro de borrar esta venta? Si desea eliminar escriba 'Eliminar-Venta'"
  );
  async function deleteVenta() {
    try {
      await fetch(ventaBackendUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Se elimino correctamente");
    } catch (e) {
      alert("Ocurrio un error al intentar eliminar la venta");
    }
  }
  if (mensajeBorrar == "Eliminar-Venta") {
    deleteVenta();
    setTimeout(() => {
      window.location.href = "../index.html?nocache=" + new Date().getTime();
    }, 3000);
  }
});
