const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const albumBackendUrl = "http://localhost:3000/api/albums/" + id;

const form = document.getElementById("formulario");

const nameAlbum = document.getElementById("nameAlbum");
const versionAlbum = document.getElementById("versionAlbum");
const group = document.getElementById("group");
const image = document.getElementById("image");
const company = document.getElementById("company");

async function getImageAlbum() {
  try {
    const response = await fetch(albumBackendUrl);
    const album = await response.json();
    const cardImage = document.getElementById("cardImage");
    cardImage.src = album.imagen;
  } catch (e) {}
}
async function getNameAlbum() {
  try {
    const response = await fetch(albumBackendUrl);
    const album = await response.json();
    const cardName = document.getElementById("cardName");
    cardName.innerHTML = album.nombre;
  } catch (e) {}
}
async function getGroupAlbum() {
  try {
    const response = await fetch(albumBackendUrl);
    const album = await response.json();
    const cardGroup = document.getElementById("cardGroup");
    cardGroup.innerHTML = album.grupo;
  } catch (e) {}
}
async function getVersionAlbum() {
  try {
    const response = await fetch(albumBackendUrl);
    const album = await response.json();
    const cardVersion = document.getElementById("cardVersion");
    cardVersion.innerHTML = album.version_album;
  } catch (e) {}
}

getImageAlbum();
getNameAlbum();
getGroupAlbum();
getVersionAlbum();

nameAlbum.addEventListener("input", () => {
  const preview = document.getElementById("cardName");
  preview.innerHTML = nameAlbum.value || getNameAlbum();
});

group.addEventListener("input", () => {
  const preview = document.getElementById("cardGroup");
  preview.innerHTML = group.value || getGroupAlbum();
});

versionAlbum.addEventListener("input", () => {
  const preview = document.getElementById("cardVersion");
  preview.innerHTML = versionAlbum.value || getVersionAlbum();
});

image.addEventListener("input", () => {
  const preview = document.getElementById("cardImage");
  if (image.value.trim() == "") {
    getImageAlbum();
  } else if (image.value == "sin-imagen") {
    preview.src = "../../images/resources/no-img.jpeg";
  } else if (image.value.toLowerCase().endsWith(".webp")) {
    preview.src = "../../images/albums/" + image.value;
  }
});

function isValidInput(input) {
  // No permite repeticiones como "aaa"
  const regexVariety = /^(?!.*(.)\1{3,}).+$/;
  // Solo letras, espacios, guiones, tildes, etc.
  const regexLetters = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü0-9' -]+$/;

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
  const imagePath = "../../images/albums/" + image.value;

  if (nameAlbum.value !== 0 && isValidInput(nameAlbum.value)) {
    requestJson.nombre = nameAlbum.value;
  }
  if (versionAlbum.value !== 0 && isValidInput(versionAlbum.value)) {
    requestJson.version_album = versionAlbum.value;
  }
  if (group.value !== 0 && isValidInput(group.value)) {
    requestJson.grupo = group.value;
  }
  if (
    (await verifyImage(imagePath)) &&
    imagePath.toLowerCase().endsWith(".webp")
  ) {
    requestJson.imagen = imagePath;
  } else if (image.value == "sin-imagen") {
    requestJson.imagen = "../../images/resources/no-img.jpeg";
  } else if (image.value.trim() !== "") {
    requestJson.imagen = "RME"; //Ruta Mal Escrita
    alert("El nombre del archivo esta mal escrito");
  }

  if (company.value !== 0 && isValidInput(company.value)) {
    requestJson.empresa = company.value;
  }

  return requestJson;
}

async function updateAlbum() {
  try {
    const requestJson = await getInfo();
    if (requestJson.imagen !== "RME" && Object.keys(requestJson).length > 0) {
      const postBackendUrl = "http://localhost:3000/api/albums/" + id;
      await fetch(postBackendUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestJson),
      });
      alert("Se modifico el album");
      setTimeout(() => {
        window.location.href = "../index.html?nocache=" + new Date().getTime();
      }, 3000);
    } else {
      alert("El album no fue modificado");
    }
  } catch (e) {
    console.log(e);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  updateAlbum();
});
