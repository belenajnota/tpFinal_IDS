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
const phoneNumber = document.getElementById("phoneNumber");

async function getInfo() {
  const requestJson = {};
  const regexPhoneNumber = /^(11|15)[0-9]{8}$/;
  const signInBackendUrl = "http://localhost:3000/api/usuarios";
  const response = await fetch(signInBackendUrl);
  const users = await response.json();
  const userExists = Object.values(users).some(
    (User) => User.usuario === user.value
  );
  const phoneNumberExists = Object.values(users).some(
    (User) => User.telefono === user.phoneNumber
  );

  if (isValidInput(user.value) && !userExists) {
    requestJson.usuario = user.value;
  } else if (userExists) {
    alert("El usuario ya existe");
  }

  if (regexPhoneNumber.test(phoneNumber.value)) {
    requestJson.telefono = parseInt(phoneNumber.value);
  }
  requestJson.contrasena = password.value;
  return requestJson;
}

async function createUser() {
  try {
    const requestJson = await getInfo();
    if (Object.keys(requestJson).length == 3) {
      const postBackendUrl = "http://localhost:3000/api/usuarios";
      await fetch(postBackendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestJson),
      });
      alert("se creo el usuario");
      setTimeout(() => {
        window.location.href =
          "../login-page/index.html?nocache=" + new Date().getTime();
      }, 3000);
    } else {
      alert("Complete correctamente los campos");
    }
  } catch (e) {
    console.log(e);
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  createUser();
});
