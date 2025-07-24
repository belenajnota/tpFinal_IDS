const albumsBackendUrl = "http://localhost:3000/api/albums";

async function getAlbums() {
  try {
    const response = await fetch(albumsBackendUrl);
    const data = await response.json();
    const albums = Object.values(data);

    albums.forEach((album) => {
      // se crea la fila para toda la informacion
      const newContainer = document.createElement("div");
      newContainer.className = "card-album is-flex is-flex-direction-column";
      // se crean y se appendean los datos en la fila
      const imgAlbum = document.createElement("img");
      imgAlbum.className = "card-img";
      imgAlbum.src = album.imagen;
      newContainer.appendChild(imgAlbum);

      const nameAlbum = document.createElement("p");
      nameAlbum.className = "card-text card-name";
      nameAlbum.innerHTML = album.nombre;
      newContainer.appendChild(nameAlbum);

      const groupAlbum = document.createElement("p");
      groupAlbum.className = "card-text card-group";
      groupAlbum.innerHTML = album.grupo;
      newContainer.appendChild(groupAlbum);

      const versionAlbum = document.createElement("p");
      versionAlbum.className = "card-text card-version";
      versionAlbum.innerHTML = album.version_album;
      newContainer.appendChild(versionAlbum);

      // se crean los botones para las acciones ver, borrar y modificar
      const newButtonVer = document.createElement("a");
      newButtonVer.innerHTML = "Ver";
      newButtonVer.className = "card-button";
      newButtonVer.id = "button-card";
      newButtonVer.href =
        "/frontend/Pagina-de-usuario/k-card-albums/k-card-album/index.html?id=" +
        album.id;
      newContainer.appendChild(newButtonVer);

      const newButtonAddToCart = document.createElement("a");
      newButtonAddToCart.innerHTML = "Añadir al Carrito";
      newButtonAddToCart.className = "button card-button";
      newButtonAddToCart.id = "button-card";

      newContainer.appendChild(newButtonAddToCart);
      newButtonAddToCart.addEventListener("click", () => {
        for (photocard of album.photocards) {
          const cart = JSON.parse(localStorage.getItem("cart"));
          cart.push(photocard);
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      });

      const containerCard = document.getElementById("container-card");
      containerCard.appendChild(newContainer);
    });
  } catch (e) {
    console.log(e);
  }
}

getAlbums();

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
    const albumBackendUrl = "http://localhost:3000/api/albums";
    const responseAlbum = await fetch(albumBackendUrl);
    const data = await responseAlbum.json();
    const albums = Object.values(data);
    const selectGroupAlbum = document.getElementById("filter-by-group");
    const selectVersionAlbum = document.getElementById("filter-by-version");
    //hago verificadores para hacer el select de los filtros
    const groupAlbum = albums.map((album) => album.grupo);
    const uniqueGroups = [...new Set(groupAlbum)];
    const versionAlbum = albums.map((album) => album.version_album);
    const uniqueVersions = [...new Set(versionAlbum)];

    for (let version of uniqueVersions) {
      const newOptionVersionAlbum = document.createElement("option");
      newOptionVersionAlbum.innerHTML = version;
      newOptionVersionAlbum.value = version;
      selectVersionAlbum.appendChild(newOptionVersionAlbum);
    }
    for (let group of uniqueGroups) {
      const newOptionGroupAlbum = document.createElement("option");
      newOptionGroupAlbum.innerHTML = group;
      newOptionGroupAlbum.value = group;
      selectGroupAlbum.appendChild(newOptionGroupAlbum);
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
  }
});

const selectGroupFilter = document.getElementById("filter-by-group");
const selectVersionFilter = document.getElementById("filter-by-version");
//Los acumuladores son para que el filtro pueda funcionar indefinidamente
let accFilter = 0;
const containerCard = document.querySelector(".container-card");
selectGroupFilter.addEventListener("change", async () => {
  if (accFilter > 0) {
    containerCard.innerHTML = "";
    await getAlbums();
    accFilter += 1;
  }

  const cards = Array.from(containerCard.querySelectorAll("div"));

  containerCard.innerHTML = "";
  accFilter += 1;

  selectVersionFilter.value = "";

  cards.forEach((card) => {
    const group = card.querySelector(".card-group").textContent;
    if (group == selectGroupFilter.value) {
      containerCard.appendChild(card);
    } else if (selectGroupFilter.value == "") {
      containerCard.appendChild(card);
    }
  });
});
selectVersionFilter.addEventListener("change", async () => {
  if (accFilter > 0) {
    containerCard.innerHTML = "";
    await getAlbums();
    accFilter += 1;
  }

  const cards = Array.from(containerCard.querySelectorAll("div"));

  containerCard.innerHTML = "";
  accFilter += 1;

  selectGroupFilter.value = "";

  cards.forEach((card) => {
    const version = card.querySelector(".card-version").textContent;
    if (version == selectVersionFilter.value) {
      containerCard.appendChild(card);
    } else if (selectVersionFilter.value == "") {
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
      window.location.href =
        "/frontend/Pagina-de-usuario/k-card-inicio/index.html?nocache=" +
        new Date().getTime();
    }, 3000);
  }
});
