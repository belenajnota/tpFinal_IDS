const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const ventaBackendUrl = "http://localhost:3000/api/ventas/" + id;

const formulario = document.getElementById("formulario");

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

  const inputInstagramCliente = document.getElementById("instagram-cliente");
  const valueInstagramCliente = inputInstagramCliente.value;
  if (valueInstagramCliente.length !== 0) {
    requestJson.instagram_cliente = valueInstagramCliente;
  }
  const inputPrecioVenta = document.getElementById("precioVenta");
  const valuePrecioVenta = inputPrecioVenta.value;
  if (valuePrecioVenta.length !== 0 && regexNumber.test(valuePrecioVenta)) {
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
  } else if (valueFechaVenta.length !== 0 && valueFechaEntrega.length !== 0) {
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
  if (valueCostoEntrega.length !== 0 && regexNumber.test(valueCostoEntrega)) {
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

async function createVenta() {
  const requestJson = await getInfoForm();
  console.log(requestJson);
  const postBackendUrl = "http://localhost:3000/api/ventas";
  await fetch(postBackendUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestJson),
  });

  console.log("se creo un robos");
}

formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  console.log("Hola soy homero chino");
  createVenta();
  alert("Se ha creado correctamente la venta");
  setTimeout(() => {
    window.location.href = "../index.html?nocache=" + new Date().getTime();
  }, 3000);
});
