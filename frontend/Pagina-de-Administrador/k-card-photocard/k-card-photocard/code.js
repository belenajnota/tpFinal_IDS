const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const photocardBackendUrl = "http://localhost:3000/api/photocards/" + id;

async function getPhotocard() {
  try {
    const response = await fetch(photocardBackendUrl);
    const photocard = await response.json();

    const image = document.getElementById("imgPhotocard");
    const namePhotocard = document.getElementById("name-photocard");
    const group = document.getElementById("group");
    const price = document.getElementById("price");
    const availability = document.getElementById("availability");

    image.src = photocard.imagen;
    namePhotocard.innerHTML = photocard.nombre;
    group.innerHTML = photocard.grupo;
    price.innerHTML = photocard.precio_comprada;
    if (photocard.disponible) {
      availability.innerHTML = "Disponible";
    } else {
      availability.innerHTML = "Vendida";
    }

    const associatedAlbum = photocard.album;
    const cardImage = document.getElementById("cardImage");
    const cardName = document.getElementById("cardName");
    const cardGroup = document.getElementById("cardGroup");
    const cardVersion = document.getElementById("cardVersion");
    const cardButton = document.getElementById("cardButton");

    cardImage.src = associatedAlbum.imagen;
    cardName.innerHTML = associatedAlbum.nombre;
    cardGroup.innerHTML = associatedAlbum.grupo;
    cardVersion.innerHTML = associatedAlbum.version;
    cardButton.href =
      "/frontend/Pagina-de-Administrador/k-card-albums/k-card-album/index.html?id=" +
      associatedAlbum.id;
  } catch (e) {}
}

getPhotocard();

const form = document.getElementById("formulario");

async function completeSelects() {
  // esto es para los select que filtran
  try {
    const albumBackendUrl = "http://localhost:3000/api/albums";
    const responseAlbum = await fetch(albumBackendUrl);
    const data = await responseAlbum.json();
    const albums = Object.values(data);
    const albumPhotocard = document.getElementById("albumPhotocard");
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

        const inputNamePhotocard = document.getElementById("namePhotocard");
        const valueNamePhotocard = inputNamePhotocard.value;
        if (
          valueNamePhotocard.length !== 0 &&
          isValidInput(valueNamePhotocard)
        ) {
          requestJson.nombre = valueNamePhotocard;
        }

        const inputGroup = document.getElementById("Group");
        const valueGroup = inputGroup.value;
        if (valueGroup.length !== 0 && isValidInput(valueGroup)) {
          requestJson.grupo = valueGroup;
        }

        const inputPrice = document.getElementById("Price");
        const valuePrice = inputPrice.value;
        if (valuePrice.length !== 0 && regexNumber.test(valuePrice)) {
          requestJson.empresa = valuePrice;
        }

        const inputImage = document.getElementById("Image");
        const imagePath = "/images/photocards/" + inputImage.value;
        if (await verifyImage(imagePath)) {
          requestJson.imagen = imagePath;
        } else if (inputImage.value == "sin-imagen") {
          requestJson.imagen = "/images/resources/no-img.jpeg";
        }
        if (albumPhotocard.value !== "") {
          requestJson.album_id = parseInt(albumPhotocard.value);
        }

        inputNamePhotocard.value = "";
        inputPrice.value = "";
        inputGroup.value = "";
        inputImage.value = "";

        return requestJson;
      }

      async function updatePhotocard() {
        try {
          const requestJson = await getInfoForm();
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
              window.location.reload();
            }, 3000);
          }
        } catch (e) {
          console.log(e);
        }
      }

      updatePhotocard();
    });
  }
});
const deleteButtonPhotocard = document.getElementById("deleteButton");

deleteButtonPhotocard.addEventListener("click", () => {
  const deleteMessage = prompt(
    "¿Estas seguro de borrar esta photocard? Si desea eliminar escriba 'Eliminar-photocard'"
  );
  async function deletePhotocard() {
    try {
      await fetch(photocardBackendUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Se elimino correctamente");
    } catch (e) {
      alert("Ocurrio un error al intentar eliminar la photocard");
    }
  }
  if (deleteMessage == "Eliminar-photocard") {
    deletePhotocard();
    setTimeout(() => {
      window.location.href =
        "/frontend/Pagina-de-Administrador/k-card-photocard/index.html?nocache=" +
        new Date().getTime();
    }, 3000);
  }
});
