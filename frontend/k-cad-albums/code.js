const albumsBackendUrl = "http://localhost:3000/api/albums";

async function getAlbums() {
  try {
    const response = await fetch(albumsBackendUrl);
    const albums = await response.json();

    albums.forEach((album) => {
      // se crea la fila para toda la informacion
      const newContainer = document.createElement("div");
      newContainer.className = "card-album is-flex is-flex-direction-column";
      // se crean y se appendean los datos en la fila
      const imgAlbum = document.createElement("img");
      if (album.imagen == null) {
        imgAlbum.src = "../imagenes/no-img.jpeg";
        newContainer.appendChild(imgAlbum);
      } else {
        imgAlbum.src = album.imagen;
        newContainer.appendChild(imgAlbum);
      }

      const nombreAlbum = document.createElement("h2");
      nombreAlbum.className = "nombre-album";
      nombreAlbum.innerHTML = album.nombre;
      newContainer.appendChild(nombreAlbum);

      // se crean los botones para las acciones ver, borrar y modificar
      const newButtonVer = document.createElement("a");
      newButtonVer.innerHTML = "Ver";
      newButtonVer.className = "button";
      newButtonVer.id = "button-card";
      newButtonVer.href = "" + album.id;
      newContainer.appendChild(newButtonVer);

      const newButtonBorrar = document.createElement("a");
      newButtonBorrar.innerHTML = "Borrar";
      newButtonBorrar.className = "button ";
      newButtonBorrar.id = "button-card";
      newContainer.appendChild(newButtonBorrar);

      newButtonBorrar.addEventListener("click", () => {
        const mensajeBorrar = prompt(
          "¿Estas seguro de borrar esta album? Si desea eliminar escriba 'Eliminar-album'"
        );
        const albumBackendUrl = "http://localhost:3000/api/albums/" + album.id;
        async function deletealbum() {
          try {
            await fetch(albumBackendUrl, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            });
            console.log("Se elimino correctamente");
          } catch (e) {
            alert("Ocurrio un error al intentar eliminar el album");
          }
        }
        if (mensajeBorrar == "Eliminar-album") {
          deletealbum();
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      });

      const newButtonModificar = document.createElement("a");
      newButtonModificar.innerHTML = "Modificar";
      newButtonModificar.className = "button";
      newButtonModificar.id = "button-card";
      newButtonModificar.href = "" + album.id;

      newContainer.appendChild(newButtonModificar);

      const containerCard = document.getElementById("container-card");
      containerCard.appendChild(newContainer);
    });
  } catch (e) {
    console.log(e);
  }
}

getAlbums();
