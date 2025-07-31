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

image.addEventListener("input", () => {
  const preview = document.getElementById("cardImage");
  if (image.value.trim() == "") {
    preview.src = "../../images/resources/no-img.jpeg";
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
  } else {
    alert("El nombre del archivo esta mal escrito");
  }

  if (company.value !== 0 && isValidInput(company.value)) {
    requestJson.empresa = company.value;
  }
  requestJson.pais = "Corea";

  return requestJson;
}

async function createAlbum() {
  try {
    const requestJson = await getInfo();
    const fields = [
      "nombre",
      "version_album",
      "grupo",
      "imagen",
      "empresa",
      "pais",
    ];
    const receivedFields = Object.keys(requestJson);
    let missingFields = fields.filter(
      (field) => !receivedFields.includes(field)
    );

    if (Object.keys(requestJson).length == 6) {
      const postBackendUrl = "http://localhost:3000/api/albums";
      await fetch(postBackendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestJson),
      });
      alert("se creo el album");
      setTimeout(() => {
        window.location.href = "../index.html?nocache=" + new Date().getTime();
      }, 3000);
    } else {
      if (missingFields.includes("version_album")) {
        const index = missingFields.indexOf("version_album");
        missingFields[index] = "version del album";
        alert("Complete correctamente los campos: " + missingFields);
      } else {
        alert("Complete correctamente los campos: " + missingFields);
      }
    }
  } catch (e) {
    console.log(e);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  createAlbum();
});
