const photocardsBackendUrl = "http://localhost:3000/api/photocards";

async function getPhotocards() {
  try {
    const response = await fetch(photocardsBackendUrl);
    const photocards = await response.json();

    photocards.forEach((photocard) => {
      // se crea la fila para toda la informacion
      const newContainer = document.createElement("div");
      newContainer.className =
        "card-photocard is-flex is-flex-direction-column";
      // se crean y se appendean los datos en la fila
      const imgPhotocard = document.createElement("img");
      if (photocard.imagen == null) {
        imgPhotocard.src = "../imagenes/no-img.jpeg";
        newContainer.appendChild(imgPhotocard);
      } else {
        imgPhotocard.src = photocard.imagen;
        newContainer.appendChild(imgPhotocard);
      }

      const nombrePhotocard = document.createElement("h2");
      nombrePhotocard.className = "nombre-photocard";
      nombrePhotocard.innerHTML = photocard.nombre;
      newContainer.appendChild(nombrePhotocard);

      // se crean los botones para las acciones ver, borrar y modificar
      const newButtonVer = document.createElement("a");
      newButtonVer.innerHTML = "Ver";
      newButtonVer.className = "button";
      newButtonVer.id = "button-card";
      newButtonVer.href = "./k-card-photocard/index.html?id=" + photocard.id;
      newContainer.appendChild(newButtonVer);

      const newButtonBorrar = document.createElement("a");
      newButtonBorrar.innerHTML = "Borrar";
      newButtonBorrar.className = "button ";
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
      newButtonModificar.className = "button";
      newButtonModificar.id = "button-card";
      newButtonModificar.href =
        "./k-card-photocard-update/index.html?id=" + photocard.id;

      newContainer.appendChild(newButtonModificar);

      const containerCard = document.getElementById("container-card");
      containerCard.appendChild(newContainer);
    });
  } catch (e) {
    console.log(e);
  }
}

getPhotocards();
