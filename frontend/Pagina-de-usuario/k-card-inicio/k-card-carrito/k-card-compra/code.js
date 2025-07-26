const form = document.getElementById("formulario");

const cart = JSON.parse(localStorage.getItem("cart"));
let totalPrice = 0;
cart.forEach((photocard) => {
  totalPrice += photocard.price;
});

const photocardQuantity = document.getElementById("photocardQuantity");
photocardQuantity.innerHTML += cart.length;

const photocardsPrice = document.getElementById("photocardsPrice");
photocardsPrice.innerHTML += totalPrice;
const session = JSON.parse(localStorage.getItem("session"));

const finalPrice = document.getElementById("finalPrice");
finalPrice.innerHTML = "Precio final : $" + totalPrice;

const buyMethod = document.getElementById("buyMethod");
const deliveryLocation = document.getElementById("deliveryLocation");
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
const date = new Date();
const saleDay = String(date.getDate()).padStart(2, "0");
const saleMonth = String(date.getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11
const saleYear = date.getFullYear();
const saleDate = `${saleYear}-${saleMonth}-${saleDay}`;
const deliveryDay = String(date.getDate() + 4).padStart(2, "0");
const deliveryDate = `${saleYear}-${saleMonth}-${deliveryDay}`; //Le suma cuatro dias a la fecha actual

async function createVenta(json) {
  try {
    const postBackendUrl = "http://localhost:3000/api/ventas";
    await fetch(postBackendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    });
  } catch (e) {
    console.log(e);
  }
}

async function updateUsuario(json) {
  try {
    const userBackendUrl = "http://localhost:3000/api/usuarios/" + json.id;
    await fetch(userBackendUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    });
  } catch (e) {
    console.log(e);
  }
}

deliveryLocation.addEventListener("change", () => {
  if (deliveryLocation.value == "Palermo") {
    finalPrice.innerHTML = "Precio final : $" + totalPrice;
  } else if (nearbyZones.includes(deliveryLocation.value)) {
    const price = totalPrice + 2500;
    finalPrice.innerHTML = "Precio final : $" + price;
  } else if (mediumDistanceZones.includes(deliveryLocation.value)) {
    const price = totalPrice + 4000;
    finalPrice.innerHTML = "Precio final : $" + price;
  } else if (furtherZones.includes(deliveryLocation.value)) {
    const price = totalPrice + 5500;
    finalPrice.innerHTML = "Precio final : $" + price;
  }
});

function getInfo() {
  for (const photocard of cart) {
    const validHours = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    const validMinutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
    function getRandomElement(list) {
      const index = Math.floor(Math.random() * list.length);
      return list[index];
    }
    const hoursDate = getRandomElement(validHours);
    const minutesDate = String(getRandomElement(validMinutes)).padStart(2, "0");
    const secondsDate = String(getRandomElement(validMinutes)).padStart(2, "0");

    const deliveryHour = `${hoursDate}:${minutesDate}:${secondsDate}`;

    ventaJson = {};
    ventaJson.nombre_cliente = session.usuario;
    ventaJson.telefono_cliente = String(session.telefono);
    ventaJson.precio_venta = totalPrice;
    ventaJson.medio_de_pago = buyMethod.value;
    ventaJson.fecha_venta = saleDate;
    ventaJson.lugar_entrega = deliveryLocation.value;
    ventaJson.fecha_entrega = deliveryDate;
    ventaJson.hora_entrega = deliveryHour;
    if (deliveryLocation.value == "Palermo") {
      ventaJson.costo_entrega = 0;
    } else if (nearbyZones.includes(deliveryLocation.value)) {
      ventaJson.costo_entrega = 2500;
    } else if (mediumDistanceZones.includes(deliveryLocation.value)) {
      ventaJson.costo_entrega = 4000;
    } else if (furtherZones.includes(deliveryLocation.value)) {
      ventaJson.costo_entrega = 5500;
    }
    ventaJson.id_photocard = photocard.id;
    createVenta(ventaJson);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  getInfo();
  let idPhotocards = [];
  cart.forEach((photocard) => {
    idPhotocards.push(photocard.id);
  });
  if (session.id_photocards == "") {
    session.id_photocards = idPhotocards;
    localStorage.setItem("session", JSON.stringify(session));
  } else {
    const ids = [...session.id_photocards, ...idPhotocards];
    session.id_photocards = ids;
    localStorage.setItem("session", JSON.stringify(session));
  }
  updateUsuario(session);
  alert("La compra se ha procesado correctamente");
  const newCart = [];
  localStorage.setItem("cart", JSON.stringify(newCart));
  setTimeout(() => {
    window.location.href = "../../index.html?nocache=" + new Date().getTime();
  }, 3000);
});

const nameUser = document.getElementById("nameUser");

nameUser.innerHTML = session.usuario;

const buttonLogOut = document.getElementById("buttonLogOut");

buttonLogOut.addEventListener("click", () => {
  const message = prompt(
    "¿Desea cerrar la sesion? si es afirmativo escriba si, caso contrario escriba no"
  );
  if (message.toLowerCase() == "si") {
    localStorage.removeItem("session");
    localStorage.removeItem("cart");
    setTimeout(() => {
      window.location.href = "../../index.html?nocache=" + new Date().getTime();
    }, 3000);
  }
});
