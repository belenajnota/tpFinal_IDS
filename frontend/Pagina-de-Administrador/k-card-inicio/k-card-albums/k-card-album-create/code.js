const form = document.getElementById("formulario");

const nameAlbum = document.getElementById("nameAlbum");
const versionAlbum = document.getElementById("versionAlbum");
const group = document.getElementById("group");
const image = document.getElementById("image");
const company = document.getElementById("company");
const price = document.getElementById("price");


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

  if (nameAlbum.value.trim() === "" || !isValidInput(nameAlbum.value)) {
     return null;
  }
  if (versionAlbum.value.trim() === "" || !isValidInput(versionAlbum.value)) {
    return null;
  }
  if (group.value.trim() === "" || !isValidInput(group.value)) {
    return null;
  }
  requestJson.nombre = nameAlbum.value;
  requestJson.grupo = group.value; 
  requestJson.version_album = versionAlbum.value;

  if (image.value == "sin-imagen") {
    requestJson.imagen = "../../images/resources/no-img.jpeg";
  } else if (!image.value.toLowerCase().endsWith(".webp")) {
    alert("Solo se permiten imágenes con extensión .webp");
    return null;
  } else {
    const imagePath = "../../images/albums/" + image.value;
    const exists = await verifyImage(imagePath);

    if (!exists) {
      alert("La imagen no existe en la carpeta correspondiente.");
      return null;
    }

    requestJson.imagen = imagePath; 
  }


  if (company.value.trim() === "" || !isValidInput(company.value)) {
    return null;
  }
  requestJson.empresa = company.value;


  const priceValue = parseInt(price.value, 10);

  if (isNaN(priceValue) || priceValue <= 0) {
    alert("El precio debe ser un número entero positivo.");
    return null;
  }

  requestJson.precio = priceValue;

  return requestJson;
}

async function createAlbum() {
  try {
    const requestJson = await getInfo();
    console.log(requestJson);
    if (requestJson === null) {
      alert("No se pudo completar porque los datos son invalidos");
      return;
    }
    const fields = ["nombre", "grupo", "version_album", "imagen", "empresa", "precio"];
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
