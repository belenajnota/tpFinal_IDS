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
      const imgPathPhotocard = photocard.imagen;
      const fileName = imgPathPhotocard.split("/").pop();
      if (imgPathPhotocard == "../../images/resources/no-img.jpeg") {
        imgPhotocard.src =
          "../../../Pagina-de-Administrador/k-card-inicio/images/resources/" +
          fileName;
      } else {
        imgPhotocard.src =
          "../../../Pagina-de-Administrador/k-card-inicio/images/photocards/" +
          fileName;
      }
      newContainer.appendChild(imgPhotocard);

      const namePhotocard = document.createElement("p");
      namePhotocard.className = "card-text card-name";
      namePhotocard.innerHTML = photocard.nombre;
      newContainer.appendChild(namePhotocard);

      const group = document.createElement("p");
      group.className = "card-text card-group";
      group.innerHTML = photocard.grupo;
      newContainer.appendChild(group);

      const price = document.createElement("p");
      price.className = "card-text card-price";
      price.innerHTML = photocard.precio_comprada;
      newContainer.appendChild(price);

      const newButtonVer = document.createElement("a");
      newButtonVer.innerHTML = "Ver";
      newButtonVer.className = "button card-button";
      newButtonVer.id = "button-card";
      newButtonVer.href = "./k-card-photocard/index.html?id=" + photocard.id;
      newContainer.appendChild(newButtonVer);

      const newButtonAddToCart = document.createElement("a");
      newButtonAddToCart.innerHTML = "Añadir al Carrito";
      newButtonAddToCart.className = "button card-button";
      newButtonAddToCart.id = "button-card";

      newContainer.appendChild(newButtonAddToCart);
      newButtonAddToCart.addEventListener("click", () => {
        const product = {
          id: photocard.id,
          name: photocard.nombre,
          group: photocard.grupo,
          image: photocard.imagen,
          price: photocard.precio_comprada,
        };

        const cart = JSON.parse(localStorage.getItem("cart"));
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
      });

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

  cards.forEach((card) => {
    const group = card.querySelector(".card-group").textContent;
    if (group == selectGroupFilter.value) {
      containerCard.appendChild(card);
    } else if (selectGroupFilter.value == "") {
      containerCard.appendChild(card);
    }
  });
});

const nameUser = document.getElementById("nameUser");
const session = JSON.parse(localStorage.getItem("session"));

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
      window.location.href = "../index.html?nocache=" + new Date().getTime();
    }, 3000);
  }
});
