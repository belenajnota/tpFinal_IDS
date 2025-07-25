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
    const price = document.getElementById("price");
    //Appendeo la informacion a la tabla
    nameAlbum.innerHTML = album.nombre;
    versionAlbum.innerHTML = album.version_album;
    group.innerHTML = album.grupo;
    company.innerHTML = album.empresa;
    country.innerHTML = album.pais;
    if (album.photocards.length > 0) {
      let totalPrice = 0;
      for (const photocard of album.photocards) {
        totalPrice += photocard.precio_comprada;
      }
      price.innerHTML = totalPrice;
    }
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
        "/frontend/Pagina-de-usuario/k-card-photocards/k-card-photocard/index.html?id=" +
        photocard.id;
      card.appendChild(buttonVer);

      const buttonAddToCart = document.getElementById("buttonAddToCart");

      buttonAddToCart.addEventListener("click", () => {
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

      containerCard.appendChild(card);
    });
  } catch (e) {
    console.log(e);
  }
}

getalbum();

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
