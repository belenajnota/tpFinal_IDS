const containerCard = document.getElementById("containerCard");
const cart = JSON.parse(localStorage.getItem("cart"));

const uniqueCart = cart.filter(
  (item, index, self) => index === self.findIndex((t) => t.id === item.id)
);

let totalPrice = 0;
cart.forEach((photocard) => {
  totalPrice += photocard.price;
});

const finalPrice = document.getElementById("finalPrice");
finalPrice.innerHTML += totalPrice;

uniqueCart.forEach((photocard) => {
  // se crea la fila para toda la informacion
  const newContainer = document.createElement("div");
  newContainer.className = "card-photocard is-flex is-flex-direction-column";
  // se crean y se appendean los datos en la fila
  const imgPhotocard = document.createElement("img");
  imgPhotocard.className = "card-img";
  imgPhotocard.src = photocard.image;
  newContainer.appendChild(imgPhotocard);

  const namePhotocard = document.createElement("p");
  namePhotocard.className = "card-text card-name";
  namePhotocard.innerHTML = photocard.name;
  newContainer.appendChild(namePhotocard);

  const group = document.createElement("p");
  group.className = "card-text card-group";
  group.innerHTML = photocard.group;
  newContainer.appendChild(group);

  const numberOfPhotocards = document.createElement("p");
  numberOfPhotocards.className = "card-text";
  const quantity = cart.filter((item) => item.id === photocard.id).length;
  numberOfPhotocards.innerHTML = "Cantidad: " + quantity;
  newContainer.appendChild(numberOfPhotocards);

  const price = document.createElement("p");
  price.className = "card-text card-price";
  price.innerHTML = photocard.price;
  newContainer.appendChild(price);

  const newButtonVer = document.createElement("a");
  newButtonVer.innerHTML = "Ver";
  newButtonVer.className = "button card-button";
  newButtonVer.id = "button-card";
  newButtonVer.href =
    "/frontend/Pagina-de-usuario/k-card-photocards/k-card-photocard/index.html?id=" +
    photocard.id;
  newContainer.appendChild(newButtonVer);

  const newButtonRemoveFromCart = document.createElement("a");
  newButtonRemoveFromCart.innerHTML = "Eliminar del Carrito";
  newButtonRemoveFromCart.className = "button card-button";
  newButtonRemoveFromCart.id = "button-card";

  newContainer.appendChild(newButtonRemoveFromCart);
  newButtonRemoveFromCart.addEventListener("click", () => {
    const message = prompt("¿Cuantos desea eliminar? coloque un numero");

    if (!isNaN(message) && message.trim() !== "") {
      for (let i = 0; i < message; i++) {
        const index = cart.findIndex((item) => item.id === photocard.id);

        if (index !== -1) {
          cart.splice(index, 1); // Elimina solo una aparición (la primera)
        } else {
          break; // Si ya no hay items que coindidan rompe el bucle
        }
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } else {
      alert("Coloque un numero valido");
    }
  });

  const containerCard = document.getElementById("containerCard");
  containerCard.appendChild(newContainer);
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
