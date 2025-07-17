const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const form = document.getElementById("formulario");

const nameAlbum = document.getElementById("nameAlbum");
const versionAlbum = document.getElementById("versionAlbum");
const group = document.getElementById("group");
const image = document.getElementById("image");
const country = document.getElementById("country");
const company = document.getElementById("company");

nameAlbum.addEventListener("input", () => {
  const preview = document.getElementById("cardName");
  preview.innerHTML = nameAlbum.value || "Nombre del Álbum";
});

group.addEventListener("input", () => {
  const preview = document.getElementById("cardGroup");
  preview.innerHTML = group.value || "Grupo";
});

versionAlbum.addEventListener("input", () => {
  const preview = document.getElementById("cardVersion");
  preview.innerHTML = versionAlbum.value || "Version del Álbum";
});

const getInfo = () => {
  const requestJson = {};
};

async function createAlbum() {
  const requestJson = console.log(requestJson);
  const postBackendUrl = "http://localhost:3000/api/albums";
  await fetch(postBackendUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestJson),
  });

  alert("se creo un album");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  createAlbum();
  setTimeout(() => {
    window.location.href = "../index.html?nocache=" + new Date().getTime();
  }, 3000);
});
