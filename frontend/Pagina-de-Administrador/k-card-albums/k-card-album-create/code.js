const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const form = document.getElementById("formulario");

const nameAlbum = document.getElementById("nameAlbum");
const versionAlbum = document.getElementById("versionAlbum");
const group = document.getElementById("group");
const image = document.getElementById("image");
const company = document.getElementById("company");

nameAlbum.addEventListener("input", () => {
  const preview = document.getElementById("cardName");
  preview.innerHTML = nameAlbum.value || "Nombre del Álbum";
});

group.addEventListener("input", () => {
  const preview = document.getElementById("cardGroup");
  preview.innerHTML = group.value || "Grupo";
});

versionAlbum.addEventListener("input", () => {
  const preview = document.getElementById("cardVersion");
  preview.innerHTML = versionAlbum.value || "Version del Álbum";
});

function getInfo() {
  const regex = new RegExp("\\.\\.\\/\\.\\.\\/imagenes\\/");

  const requestJson = {};
  if (nameAlbum.value !== 0) {
    requestJson.nombre = nameAlbum.value;
  }
  if (versionAlbum.value !== 0) {
    requestJson.version_album = versionAlbum.value;
  }
  if (group.value !== 0) {
    requestJson.grupo = group.value;
  }
  if (regex.test(image.value)) {
    requestJson.imagen = image.value;
  } else {
    requestJson.imagen = "../../imagenes/Untitled.jpeg";
  }
  if (company.value !== 0) {
    requestJson.empresa = company.value;
  }
  requestJson.pais = "Corea";

  return requestJson;
}

async function createAlbum() {
  try {
    const requestJson = getInfo();
    console.log(requestJson);
    const postBackendUrl = "http://localhost:3000/api/albums";
    await fetch(postBackendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestJson),
    });

    alert("se creo un album");
  } catch (e) {
    console.log(e);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  createAlbum();
  /*setTimeout(() => {
    window.location.href = "../index.html?nocache=" + new Date().getTime();
  }, 3000);*/
});
