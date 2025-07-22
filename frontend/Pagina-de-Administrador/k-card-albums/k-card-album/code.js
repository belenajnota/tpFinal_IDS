const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const albumBackendUrl = "http://localhost:3000/api/albums/" + id;

async function getalbum() {
  try {
    const responseAlbum = await fetch(albumBackendUrl);
    const album = await responseAlbum.json();
    //Llamo a todas la filas de la columna
    const imgAlbum = document.getElementById("imgAlbum");
    imgAlbum.src = album.imagen;

    const nameAlbum = document.getElementById("name-album");
    const versionAlbum = document.getElementById("version-album");
    const group = document.getElementById("group");
    const company = document.getElementById("company");
    const country = document.getElementById("country");
    //Appendeo la informacion a la tabla
    nameAlbum.innerHTML = album.nombre;
    versionAlbum.innerHTML = album.version_album;
    group.innerHTML = album.grupo;
    company.innerHTML = album.empresa;
    country.innerHTML = album.pais;
    const associatedPhotocards = album.photocards;
    associatedPhotocards.forEach((photocard) => {
      const containerCard = document.getElementById("containerCard");
      const card = document.createElement("div");
      card.className = "card-photocard";

      const cardImage = document.createElement("img");
      cardImage.className = "card-img";
      cardImage.src = photocard.imagen;
      card.appendChild(cardImage);

      const cardName = document.createElement("p");
      cardName.className = "card-text card-name";
      cardName.innerHTML = photocard.nombre;
      card.appendChild(cardName);

      const cardGroup = document.createElement("p");
      cardGroup.className = "card-text";
      cardGroup.innerHTML = photocard.grupo;
      card.appendChild(cardGroup);

      const cardPrice = document.createElement("p");
      cardPrice.className = "card-text";
      cardPrice.innerHTML = "$" + photocard.precio_comprada;
      card.appendChild(cardPrice);

      const buttonVer = document.createElement("a");
      buttonVer.className = "button card-button";
      buttonVer.innerHTML = "Ver";
      buttonVer.href =
        "/frontend/Pagina-de-Administrador/k-card-photocard/k-card-photocard/index.html?id=" +
        photocard.id;
      card.appendChild(buttonVer);

      containerCard.appendChild(card);
    });
  } catch (e) {
    console.log(e);
  }
}

getalbum();

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

        const inputNameAlbum = document.getElementById("nameAlbum");
        const valueNameAlbum = inputNameAlbum.value;
        if (valueNameAlbum.length !== 0 && isValidInput(valueNameAlbum)) {
          requestJson.nombre = valueNameAlbum;
        }

        const inputVersionAlbum = document.getElementById("versionAlbum");
        const valueVersionAlbum = inputVersionAlbum.value;
        if (valueVersionAlbum.length !== 0 && isValidInput(valueVersionAlbum)) {
          requestJson.version_album = valueVersionAlbum;
        }

        const inputGroup = document.getElementById("Group");
        const valueGroup = inputGroup.value;
        if (valueGroup.length !== 0 && isValidInput(valueGroup)) {
          requestJson.grupo = valueGroup;
        }

        const inputImage = document.getElementById("Image");
        const imagePath = "/images/albums/" + inputImage.value;
        if (await verifyImage(imagePath)) {
          requestJson.imagen = imagePath;
        } else if (inputImage.value == "sin-imagen") {
          requestJson.imagen = "/images/resources/no-img.jpeg";
        } else if (inputImage.value.trim() !== "") {
          requestJson.imagen = "RME"; //Ruta Mal Escrita
        }

        const inputCompany = document.getElementById("Company");
        const valueCompany = inputCompany.value;
        if (valueCompany.length !== 0 && isValidInput(valueCompany)) {
          requestJson.empresa = valueCompany;
        }

        inputNameAlbum.value = "";
        inputVersionAlbum.value = "";
        inputGroup.value = "";
        inputImage.value = "";
        inputCompany.value = "";
        return requestJson;
      }

      async function updateAlbum() {
        try {
          const requestJson = await getInfoForm();
          if (
            requestJson.imagen !== "RME" &&
            Object.keys(requestJson).length > 0
          ) {
            const patchBackendUrl = "http://localhost:3000/api/albums/" + id;
            await fetch(patchBackendUrl, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(requestJson),
            });
            closeModal(formDentroModal.closest(".modal"));

            alert("Formulario procesado y cambios guardados");
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          } else {
            alert("No se Modifico el album");
          }
        } catch (e) {
          console.log(e);
        }
      }

      updateAlbum();
    });
  }
});

const deleteButtonAlbum = document.getElementById("deleteButton");

deleteButtonAlbum.addEventListener("click", () => {
  const deleteMessage = prompt(
    "¿Estas seguro de borrar esta album? Si desea eliminar escriba 'Eliminar-album'"
  );
  async function deleteAlbum() {
    try {
      await fetch(albumBackendUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Se elimino correctamente");
    } catch (e) {
      alert("Ocurrio un error al intentar eliminar el album");
    }
  }
  if (deleteMessage == "Eliminar-album") {
    deleteAlbum();
    setTimeout(() => {
      window.location.href =
        "/frontend/Pagina-de-Administrador/k-card-albums/index.html?nocache=" +
        new Date().getTime();
    }, 3000);
  }
});
