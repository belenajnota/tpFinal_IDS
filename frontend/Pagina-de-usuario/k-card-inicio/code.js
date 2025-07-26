const buttonNavPhotocards = document.getElementById("buttonNavPhotocards");
const buttonNavAlbums = document.getElementById("buttonNavAlbums");
const buttonNavColeccion = document.getElementById("buttonNavColeccion");
const buttonBodyPhotocards = document.getElementById("buttonBodyPhotocards");
const buttonBodyAlbums = document.getElementById("buttonBodyAlbums");
const buttonBodyColeccion = document.getElementById("buttonBodyColeccion");
const buttonNavLogIn = document.getElementById("buttonNavLogIn");
const buttonNavSignUp = document.getElementById("buttonNavSignUp");
const cartLink = document.getElementById("cartLink");

const user = JSON.parse(localStorage.getItem("session"));
if (user !== null) {
  buttonNavPhotocards.href = "./k-card-photocards/index.html";
  buttonNavAlbums.href = "./k-card-albums/index.html";
  buttonNavColeccion.href = "./k-card-coleccion/index.html";
  buttonBodyPhotocards.href = "./k-card-photocards/index.html";
  buttonBodyAlbums.href = "./k-card-albums/index.html";
  buttonBodyColeccion.href = "./k-card-coleccion/index.html";
  buttonNavSignUp.remove();
  buttonNavLogIn.remove();
  const containerActions = document.getElementById("containerActions");
  const userIcon = document.createElement("img");
  userIcon.className = "user-icon";
  userIcon.src =
    "../../Pagina-de-Administrador/k-card-inicio/images/resources/user.png";
  containerActions.appendChild(userIcon);
  const nameUser = document.createElement("p");
  nameUser.className = "font";
  nameUser.innerHTML = user.usuario;
  containerActions.appendChild(nameUser);
  const cartIcon = document.createElement("img");
  cartIcon.className = "user-icon";
  cartIcon.src =
    "../../Pagina-de-Administrador/k-card-inicio/images/resources/carrito.png";
  cartLink.appendChild(cartIcon);
  const buttonLogOut = document.createElement("button");
  buttonLogOut.className = "font";
  buttonLogOut.innerHTML = "Cerrar Sesion";
  containerActions.appendChild(buttonLogOut);

  buttonLogOut.addEventListener("click", () => {
    const message = prompt(
      "Desea cerrar la sesion? si es afirmativo escriba si, caso contrario escriba no"
    );
    if (message.toLowerCase() == "si") {
      localStorage.removeItem("session");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  });
}
