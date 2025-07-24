const form = document.getElementById("formulario");

function isValidInput(input) {
  // No permite repeticiones como "aaa"
  const regexVariety = /^(?!.*(.)\1+).+$/;
  // Solo letras, espacios, guiones, tildes, etc.
  const regexLetters = /^[A-Za-zÁÉÍÓÚáéíóúÑñüÜ' -]+$/;

  return regexVariety.test(input) && regexLetters.test(input);
}

const user = document.getElementById("user");
const password = document.getElementById("password");

async function getInfo() {
  const Session = {};
  const regexPhoneNumber = /^(11|15)[0-9]{8}$/;
  const signInBackendUrl = "http://localhost:3000/api/usuarios";
  try {
    const response = await fetch(signInBackendUrl);
    const users = await response.json();
    const userExists = Object.values(users).find(
      (User) => User.usuario === user.value
    );

    if (isValidInput(user.value) && userExists.usuario == user.value) {
      Session.usuario = user.value;
    }
    if (userExists.contrasena == password.value) {
      Session.contrasena = password.value;
      Session.id = userExists.id;
    } else {
      alert("La contraseña es incorrecta");
    }
  } catch (e) {
    alert("El usuario no existe");
  }

  if (Object.keys(Session).length == 3) {
    localStorage.setItem("session", JSON.stringify(Session));
    const cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    setTimeout(() => {
      window.location.href =
        "/frontend/Pagina-de-usuario/k-card-inicio/index.html?nocache=" +
        new Date().getTime();
    }, 3000);
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  getInfo();
});
