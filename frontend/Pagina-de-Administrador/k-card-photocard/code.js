const photocardsBackendUrl = "http://localhost:3000/api/photocards";

async function getPhotocards() {
  try {
    const response = await fetch(photocardsBackendUrl);
    const data = await response.json();
    const photocards = Object.values(data);
    photocards.forEach((photocard) => {
      // se crea la fila para toda la informacion
      const newContainer = document.createElement("div");
      newContainer.className =
        "card-photocard is-flex is-flex-direction-column";
      // se crean y se appendean los datos en la fila
      const imgPhotocard = document.createElement("img");
      imgPhotocard.className = "card-img";
      if (photocard.imagen == null) {
        imgPhotocard.src = "/images/resources/no-img.jpeg";
        newContainer.appendChild(imgPhotocard);
      } else {
        imgPhotocard.src = photocard.imagen;
        newContainer.appendChild(imgPhotocard);
      }

      const namePhotocard = document.createElement("p");
      namePhotocard.className = "card-text card-name";
      namePhotocard.innerHTML = photocard.nombre;
      newContainer.appendChild(namePhotocard);

      const group = document.createElement("p");
      group.className = "card-text card-group";
      group.innerHTML = photocard.grupo;
      newContainer.appendChild(group);

      const availability = document.createElement("p");
      availability.className = "card-text card-availability";
      if (photocard.disponible) {
        availability.innerHTML = "Disponible";
      } else {
        availability.innerHTML = "Vendida";
      }
      newContainer.appendChild(availability);

      const price = document.createElement("p");
      price.className = "card-text card-price";
      price.innerHTML = photocard.precio_comprada;
      newContainer.appendChild(price);

      // se crean los botones para las acciones ver, borrar y modificar
      const newButtonVer = document.createElement("a");
      newButtonVer.innerHTML = "Ver";
      newButtonVer.className = "button card-button";
      newButtonVer.id = "button-card";
      newButtonVer.href = "./k-card-photocard/index.html?id=" + photocard.id;
      newContainer.appendChild(newButtonVer);

      const newButtonBorrar = document.createElement("a");
      newButtonBorrar.innerHTML = "Borrar";
      newButtonBorrar.className = "button card-button";
      newButtonBorrar.id = "button-card";
      newContainer.appendChild(newButtonBorrar);

      newButtonBorrar.addEventListener("click", () => {
        const mensajeBorrar = prompt(
          "¿Estas seguro de borrar esta photocard? Si desea eliminar escriba 'Eliminar-photocard'"
        );
        const photocardBackendUrl =
          "http://localhost:3000/api/photocards/" + photocard.id;
        async function deletePhotocard() {
          try {
            await fetch(photocardBackendUrl, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            });
            console.log("Se elimino correctamente");
          } catch (e) {
            alert("Ocurrio un error al intentar eliminar la photocard");
          }
        }
        if (mensajeBorrar == "Eliminar-photocard") {
          deletePhotocard();
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      });

      const newButtonModificar = document.createElement("a");
      newButtonModificar.innerHTML = "Modificar";
      newButtonModificar.className = "button card-button";
      newButtonModificar.id = "button-card";
      newButtonModificar.href =
        "./k-card-photocard-update/index.html?id=" + photocard.id;

      newContainer.appendChild(newButtonModificar);

      const containerCard = document.getElementById("containerCard");
      containerCard.appendChild(newContainer);
    });
  } catch (e) {
    console.log(e);
  }
}

getPhotocards();

//codigo para que funcione el boton filtro
document.addEventListener("DOMContentLoaded", () => {
  // Obtener el elemento del dropdown
  const dropdown = document.querySelector(".dropdown");
  // Obtener el disparador del dropdown (el botón)
  const dropdownTrigger = dropdown.querySelector(".dropdown-trigger button");

  // Función para alternar la clase 'is-active'
  function toggleDropdown() {
    dropdown.classList.toggle("is-active");
  }

  // Añadir evento de clic al disparador
  dropdownTrigger.addEventListener("click", toggleDropdown);

  // Cerrar el dropdown si se hace clic fuera de él
  document.addEventListener("click", (event) => {
    // Si el clic no fue dentro del dropdown ni en el disparador del dropdown
    if (!dropdown.contains(event.target) && event.target !== dropdownTrigger) {
      // Y si el dropdown está activo, entonces desactivarlo
      if (dropdown.classList.contains("is-active")) {
        dropdown.classList.remove("is-active");
      }
    }
  });
});

async function completeSelects() {
  // esto es para los select que filtran
  try {
    const photocardBackendUrl = "http://localhost:3000/api/photocards";
    const responsePhotocard = await fetch(photocardBackendUrl);
    const data = await responsePhotocard.json();
    const photocards = Object.values(data);
    const selectGroupPhotocard = document.getElementById("filter-by-group");
    //hago verificadores para hacer el select de los filtros
    const groupPhotocard = photocards.map((photocard) => photocard.grupo);
    const uniqueGroups = [...new Set(groupPhotocard)];

    for (let group of uniqueGroups) {
      const newOptionGroupAlbum = document.createElement("option");
      newOptionGroupAlbum.innerHTML = group;
      newOptionGroupAlbum.value = group;
      selectGroupPhotocard.appendChild(newOptionGroupAlbum);
    }
  } catch (e) {}
}

completeSelects();

//codigo para que funcionen los filtros

const selectOrderBy = document.getElementById("order-by");

selectOrderBy.addEventListener("change", () => {
  const containerCard = document.querySelector(".container-card");
  const cards = Array.from(containerCard.querySelectorAll("div"));

  if (selectOrderBy.value == "NameA-Z") {
    const sortedCards = cards.sort((a, b) => {
      return a
        .querySelector(".card-name")
        .textContent.localeCompare(b.querySelector(".card-name").textContent);
    });

    containerCard.innerHTML = "";

    sortedCards.forEach((card) => {
      containerCard.appendChild(card);
    });
  } else if (selectOrderBy.value == "NameZ-A") {
    const sortedCards = cards.sort((a, b) => {
      return b
        .querySelector(".card-name")
        .textContent.localeCompare(a.querySelector(".card-name").textContent);
    });

    containerCard.innerHTML = "";

    sortedCards.forEach((card) => {
      containerCard.appendChild(card);
    });
  } else if (selectOrderBy.value == "priceHighLow") {
    const sortedCards = cards.sort((a, b) => {
      return (
        Number(b.querySelector(".card-price").textContent) -
        Number(a.querySelector(".card-price").textContent)
      );
    });

    containerCard.innerHTML = "";

    sortedCards.forEach((card) => {
      containerCard.appendChild(card);
    });
  } else if (selectOrderBy.value == "priceLowHigh") {
    const sortedCards = cards.sort((a, b) => {
      return (
        Number(a.querySelector(".card-price").textContent) -
        Number(b.querySelector(".card-price").textContent)
      );
    });

    containerCard.innerHTML = "";

    sortedCards.forEach((card) => {
      containerCard.appendChild(card);
    });
  }
});

const selectGroupFilter = document.getElementById("filter-by-group");
const selectAvailabilityFilter = document.getElementById(
  "filter-by-availability"
);
//Los acumuladores son para que el filtro pueda funcionar indefinidamente
let accFilter = 0;
const containerCard = document.querySelector(".container-card");
selectGroupFilter.addEventListener("change", async () => {
  if (accFilter > 0) {
    containerCard.innerHTML = "";
    await getPhotocards();
    accFilter += 1;
  }

  const cards = Array.from(containerCard.querySelectorAll("div"));

  containerCard.innerHTML = "";
  accFilter += 1;

  selectAvailabilityFilter.value = "";

  cards.forEach((card) => {
    const group = card.querySelector(".card-group").textContent;
    if (group == selectGroupFilter.value) {
      containerCard.appendChild(card);
    } else if (selectGroupFilter.value == "") {
      containerCard.appendChild(card);
    }
  });
});
selectAvailabilityFilter.addEventListener("change", async () => {
  if (accFilter > 0) {
    containerCard.innerHTML = "";
    await getPhotocards();
    accFilter += 1;
  }

  const cards = Array.from(containerCard.querySelectorAll("div"));

  containerCard.innerHTML = "";
  accFilter += 1;

  selectGroupFilter.value = "";

  cards.forEach((card) => {
    const version = card.querySelector(".card-availability").textContent;
    if (version == selectAvailabilityFilter.value) {
      containerCard.appendChild(card);
    } else if (selectAvailabilityFilter.value == "") {
      containerCard.appendChild(card);
    }
  });
});
