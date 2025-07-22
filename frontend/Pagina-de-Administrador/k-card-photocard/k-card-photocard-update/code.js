const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const photocardBackendUrl = "http://localhost:3000/api/photocards/" + id;

const form = document.getElementById("formulario");

const namePhotocard = document.getElementById("namePhotocard");
const price = document.getElementById("price");
const group = document.getElementById("group");
const image = document.getElementById("image");
const albumPhotocard = document.getElementById("albumPhotocard");

async function getImagePhotocard() {
  try {
    const response = await fetch(photocardBackendUrl);
    const photocard = await response.json();
    const cardImage = document.getElementById("cardImage");
    cardImage.src = photocard.imagen;
  } catch (e) {
    console.log(e);
  }
}

async function getAlbumPhotocard() {
  try {
    const response = await fetch(photocardBackendUrl);
    const photocard = await response.json();
    const cardAlbum = document.getElementById("cardAlbum");
    cardAlbum.innerHTML = photocard.album.nombre;
  } catch (e) {
    console.log(e);
  }
}

async function getNamePhotocard() {
  try {
    const response = await fetch(photocardBackendUrl);
    const photocard = await response.json();
    const cardName = document.getElementById("cardName");
    cardName.innerHTML = photocard.nombre;
  } catch (e) {
    console.log(e);
  }
}
async function getGroupPhotocard() {
  try {
    const response = await fetch(photocardBackendUrl);
    const photocard = await response.json();
    const cardGroup = document.getElementById("cardGroup");
    cardGroup.innerHTML = photocard.grupo;
  } catch (e) {
    console.log(e);
  }
}
async function getPricePhotocard() {
  try {
    const response = await fetch(photocardBackendUrl);
    const photocard = await response.json();
    const cardPrice = document.getElementById("cardPrice");
    cardPrice.innerHTML = photocard.precio_comprada;
  } catch (e) {
    console.log(e);
  }
}

getImagePhotocard();
getNamePhotocard();
getGroupPhotocard();
getAlbumPhotocard();
getPricePhotocard();

namePhotocard.addEventListener("input", () => {
  const preview = document.getElementById("cardName");
  preview.innerHTML = namePhotocard.value || getNamePhotocard();
});

group.addEventListener("input", () => {
  const preview = document.getElementById("cardGroup");
  preview.innerHTML = group.value || getGroupPhotocard();
});

let accChangeAlbum = 0;

albumPhotocard.addEventListener("change", () => {
  accChangeAlbum += 1;
  const preview = document.getElementById("cardAlbum");
  const selectedText = albumPhotocard.selectedOptions[0].text;
  preview.innerHTML = selectedText;
});

image.addEventListener("input", () => {
  const preview = document.getElementById("cardImage");
  if (image.value.trim() == "") {
    getImagePhotocard();
  } else if (image.value == "sin-imagen") {
    preview.src = "/images/resources/no-img.jpeg";
  } else {
    preview.src = "/images/photocards/" + image.value;
  }
});

price.addEventListener("input", () => {
  const preview = document.getElementById("cardPrice");
  preview.innerHTML = price.value || "Precio";
});

async function completeSelects() {
  // esto es para los select que filtran
  try {
    const albumBackendUrl = "http://localhost:3000/api/albums";
    const responseAlbum = await fetch(albumBackendUrl);
    const data = await responseAlbum.json();
    const albums = Object.values(data);
    const responsePhotocard = await fetch(photocardBackendUrl);
    const photocard = await responsePhotocard.json();

    albums.forEach((album) => {
      const newOptionAlbum = document.createElement("option");
      newOptionAlbum.innerHTML = album.nombre;
      newOptionAlbum.value = album.id;
      albumPhotocard.appendChild(newOptionAlbum);
    });

    const optionAlbum = Array.from(albumPhotocard.querySelectorAll("option"));
    optionAlbum.forEach((option) => {
      if (option.value == photocard.album.id) {
        option.selected = true;
      }
    });
  } catch (e) {}
}

completeSelects();

function isValidInput(input) {
  // No permite repeticiones como "aaa"
  const regexVariety = /^(?!.*(.)\1+).+$/;
  // Solo letras, espacios, guiones, tildes, etc.
  const regexLetters = /^[A-Za-zÁÉÍÓÚáéíóúÑñüÜ' -]+$/;

  return regexVariety.test(input) && regexLetters.test(input);
}

function verifyImage(path) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = path;
  });
}

async function getInfo() {
  const requestJson = {};
  const imagePath = "/images/photocards/" + image.value;
  const regexNumber = /^[0-9]+$/;

  if (namePhotocard.value !== 0 && isValidInput(namePhotocard.value)) {
    requestJson.nombre = namePhotocard.value;
  }

  if (group.value !== 0 && isValidInput(group.value)) {
    requestJson.grupo = group.value;
  }
  if (regexNumber.test(price.value)) {
    requestJson.precio_comprada = parseInt(price.value);
  }
  if (await verifyImage(imagePath)) {
    requestJson.imagen = imagePath;
  } else if (image.value == "sin-imagen") {
    requestJson.imagen = "/images/resources/no-img.jpeg";
  }

  if (albumPhotocard.value !== "" && accChangeAlbum > 0) {
    requestJson.album_id = parseInt(albumPhotocard.value);
  }

  return requestJson;
}

async function updatePhotocard() {
  try {
    const requestJson = await getInfo();

    if (Object.keys(requestJson).length > 0) {
      const patchBackendUrl = photocardBackendUrl;
      await fetch(patchBackendUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestJson),
      });
      alert("se modifico la photocard");
      setTimeout(() => {
        window.location.href =
          "/frontend/Pagina-de-Administrador/k-card-photocard/index.html?nocache=" +
          new Date().getTime();
      }, 3000);
    }
  } catch (e) {
    console.log(e);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  updatePhotocard();
});
