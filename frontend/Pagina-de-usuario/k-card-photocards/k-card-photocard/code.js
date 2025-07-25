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
      "/frontend/Pagina-de-usuario/k-card-albums/k-card-album/index.html?id=" +
      associatedAlbum.id;

    const buttonAddToCart = document.getElementById("buttonAddToCart");

    buttonAddToCart.addEventListener("click", () => {
      const product = {
        id: parseInt(id),
        name: photocard.nombre,
        group: photocard.grupo,
        image: photocard.imagen,
        price: photocard.precio_comprada,
      };

      const cart = JSON.parse(localStorage.getItem("cart"));
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
    });
  } catch (e) {}
}

getPhotocard();

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
