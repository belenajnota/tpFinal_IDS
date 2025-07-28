const form = document.getElementById("formulario");

const namePhotocard = document.getElementById("namePhotocard");
const price = document.getElementById("price");
const group = document.getElementById("group");
const image = document.getElementById("image");
const albumPhotocard = document.getElementById("albumPhotocard");

namePhotocard.addEventListener("input", () => {
  const preview = document.getElementById("cardName");
  preview.innerHTML = namePhotocard.value || "Nombre de la Photocard";
});

group.addEventListener("input", () => {
  const preview = document.getElementById("cardGroup");
  preview.innerHTML = group.value || "Grupo";
});

albumPhotocard.addEventListener("change", () => {
  const preview = document.getElementById("cardAlbum");
  const selectedText = albumPhotocard.selectedOptions[0].text;
  preview.innerHTML = selectedText || "Album de la Photocard";
});

image.addEventListener("input", () => {
  const preview = document.getElementById("cardImage");
  if (image.value.trim() == "") {
    preview.src = "../../images/resources/no-img.jpeg";
  } else if (image.value == "sin-imagen") {
    preview.src = "../../images/resources/no-img.jpeg";
  } else if (image.value.toLowerCase().endsWith(".webp")) {
    preview.src = "../../images/photocards/" + image.value;
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

    albums.forEach((album) => {
      const newOptionAlbum = document.createElement("option");
      newOptionAlbum.innerHTML = album.nombre;
      newOptionAlbum.value = album.id;
      albumPhotocard.appendChild(newOptionAlbum);
    });
  } catch (e) {}
}

completeSelects();

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
  const imagePath = "../../images/photocards/" + image.value;
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

  if (albumPhotocard.value !== "") {
    requestJson.album_id = parseInt(albumPhotocard.value);
  }

  return requestJson;
}

async function createPhotocard() {
  try {
    const requestJson = await getInfo();
    const fields = ["nombre", "grupo", "precio_comprada", "imagen"];
    const receivedFields = Object.keys(requestJson);
    let missingFields = fields.filter(
      (field) => !receivedFields.includes(field)
    );
    if (Object.keys(requestJson).length == 5) {
      const postBackendUrl = "http://localhost:3000/api/photocards";
      await fetch(postBackendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestJson),
      });
      alert("se creo la photocard");
      setTimeout(() => {
        window.location.href = "../index.html?nocache=" + new Date().getTime();
      }, 3000);
    } else {
      if (missingFields.includes("precio_comprada")) {
        const index = missingFields.indexOf("precio_comprada");
        missingFields[index] = "precio";
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
  createPhotocard();
});
