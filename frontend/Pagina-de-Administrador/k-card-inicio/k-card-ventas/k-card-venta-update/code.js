const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const ventaBackendUrl = "http://localhost:3000/api/ventas/" + id;

const form = document.getElementById("formulario");

const nameClient = document.getElementById("nameClient");
const phoneNumber = document.getElementById("numberPhone");
const price = document.getElementById("price");
const buyMethod = document.getElementById("buyMethod");
const saleDate = document.getElementById("saleDate");
const deliveryLocation = document.getElementById("deliveryLocation");
const deliveryDate = document.getElementById("deliveryDate");
const photocardSelect = document.getElementById("photocard");

async function getVenta() {
  try {
    const responseVenta = await fetch(ventaBackendUrl);
    const venta = await responseVenta.json();
    nameClient.value = venta.nombre_cliente;
    phoneNumber.value = venta.telefono_cliente;
    price.value = venta.precio_venta;
    buyMethod.value = venta.medio_de_pagp;
    deliveryLocation = venta.lugar_entrega;
  } catch {}
}
getVenta();

async function completeSelects() {
  try {
    const photocardsBackendUrl = "http://localhost:3000/api/photocards/";
    const responsePhotocard = await fetch(photocardsBackendUrl);
    const data = await responsePhotocard.json();
    const photocards = Object.values(data);
    photocards.forEach((photocard) => {
      const newOptionPhotocard = document.createElement("option");
      newOptionPhotocard.innerHTML = photocard.nombre;
      newOptionPhotocard.value = photocard.id;
      photocardSelect.appendChild(newOptionPhotocard);
    });
  } catch (e) {
    console.log(e);
  }
}

completeSelects();

function isValidInput(input) {
  // No permite repeticiones como "aaa"
  const regexVariety = /^(?!.*(.)\1{3,}).+$/;
  // Solo letras, espacios, guiones, tildes, etc.
  const regexLetters = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü0-9' -]+$/;

  return regexVariety.test(input) && regexLetters.test(input);
}

const nearbyZones = [
  "Colegiales",
  "Belgrano",
  "Recoleta",
  "Almagro",
  "Villa Crespo",
  "Chacarita",
];
const mediumDistanceZones = [
  "Saavedra",
  "Villa Urquiza",
  "Caballito",
  "Balvanera",
  "San Nicolás",
  "Retiro",
  "Congreso",
  "San Telmo",
  "La Boca",
  "Barracas",
  "Boedo",
  "Parque Patricios",
  "Villa del Parque",
  "Agronomía",
  "Paternal",
  "Villa General Mitre",
];
const furtherZones = [
  "Villa Lugano",
  "Villa Riachuelo",
  "Mataderos",
  "Liniers",
  "Floresta",
  "Villa Luro",
  "Villa Devoto",
  "Villa Pueyrredón",
  "Villa Real",
  "Versalles",
  "Coghlan",
  "Villa Soldati",
  "Parque Avellaneda",
  "Nueva Pompeya",
];

async function getInfo() {
  const requestJson = {};
  const regexNumber = /^[0-9]+$/;

  if (nameClient.value !== 0 && isValidInput(nameClient.value)) {
    requestJson.nombre_cliente = nameClient.value;
  }
  if (regexNumber.test(phoneNumber.value)) {
    requestJson.telefono_cliente = phoneNumber.value;
  }
  if (regexNumber.test(price.value)) {
    requestJson.precio_venta = parseInt(price.value);
  }
  if (buyMethod.value !== "") {
    requestJson.medio_de_pago = buyMethod.value;
  }
  if (saleDate.value !== "" && saleDate.value >= "2025-06-16") {
    requestJson.fecha_venta = saleDate.value;
  }
  if (deliveryLocation.value == "Palermo") {
    requestJson.lugar_entrega = deliveryLocation.value;
    requestJson.costo_entrega = 0;
  } else if (nearbyZones.includes(deliveryLocation.value)) {
    requestJson.lugar_entrega = deliveryLocation.value;
    requestJson.costo_entrega = 2500;
  } else if (mediumDistanceZones.includes(deliveryLocation.value)) {
    requestJson.lugar_entrega = deliveryLocation.value;
    requestJson.costo_entrega = 4000;
  } else if (furtherZones.includes(deliveryLocation.value)) {
    requestJson.lugar_entrega = deliveryLocation.value;
    requestJson.costo_entrega = 5500;
  }
  if (
    deliveryDate.value > saleDate.value &&
    deliveryDate.value >= "2025-06-16"
  ) {
    requestJson.fecha_entrega = deliveryDate.value;
  }
  if (photocardSelect.value !== "") {
    requestJson.id_photocard = parseInt(photocardSelect.value);
  }
  return requestJson;
}

async function updateVenta() {
  try {
    const requestJson = await getInfo();

    if (Object.keys(requestJson).length > 0) {
      const patchBackendUrl = ventaBackendUrl;
      await fetch(patchBackendUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestJson),
      });
      alert("se modifico la venta");
      setTimeout(() => {
        window.location.href = "../index.html?nocache=" + new Date().getTime();
      }, 3000);
    } else {
      alert("No se modifico la venta");
    }
  } catch (e) {
    console.log(e);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  updateVenta();
});
