const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const ventaBackendUrl = "http://localhost:3000/api/ventas/" + id;

async function getVenta() {
  try {
    const responseVenta = await fetch(ventaBackendUrl);
    const venta = await responseVenta.json();
    //Llamo a todas la filas de la columna
    const clientName = document.getElementById("clientName");
    const clientPhone = document.getElementById("clientPhone");
    const salePrice = document.getElementById("salePrice");
    const buyMethod = document.getElementById("buyMethod");
    const saleDate = document.getElementById("saleDate");
    const deliveryLocation = document.getElementById("deliveryLocation");
    const deliveryDate = document.getElementById("deliveryDate");
    const deliveryHour = document.getElementById("deliveryHour");
    const shippingCost = document.getElementById("shippingCost");

    //Appendeo la informacion a la tabla
    clientName.innerHTML = venta.nombre_cliente;
    clientPhone.innerHTML = venta.telefono_cliente;
    salePrice.innerHTML = "$" + venta.precio_venta;
    buyMethod.innerHTML = venta.medio_de_pago;
    saleDate.innerHTML = venta.fecha_venta.split("T")[0];
    deliveryLocation.innerHTML = venta.lugar_entrega;
    deliveryDate.innerHTML = venta.fecha_venta.split("T")[0];
    deliveryHour.innerHTML = venta.hora_entrega + "hs";
    shippingCost.innerHTML = "$" + venta.costo_entrega;

    //fetch para la informacion de la photocard
    const photocardBackendUrl =
      "http://localhost:3000/api/photocards/" + venta.id_photocard;
    const responsePhotocard = await fetch(photocardBackendUrl);
    const photocard = await responsePhotocard.json();
    const card = document.createElement("div");
    card.className = "card-photocard ";

    const imgPhotocard = document.createElement("img");
    imgPhotocard.className = "card-img";
    imgPhotocard.src = photocard.imagen;
    card.appendChild(imgPhotocard);

    const namePhotocard = document.createElement("p");
    namePhotocard.className = "card-text";
    namePhotocard.innerHTML = photocard.nombre;
    card.appendChild(namePhotocard);

    const groupPhotocard = document.createElement("p");
    groupPhotocard.className = "card-text";
    groupPhotocard.innerHTML = photocard.grupo;
    card.appendChild(groupPhotocard);

    const albumPhotocard = document.createElement("p");
    albumPhotocard.className = "card-text";
    albumPhotocard.innerHTML = photocard.album.nombre;
    card.appendChild(albumPhotocard);

    const price = document.createElement("p");
    price.className = "card-text";
    price.innerHTML = "$" + photocard.precio_comprada;
    card.appendChild(price);

    const newButtonVer = document.createElement("a");
    newButtonVer.className = "card-button";
    newButtonVer.innerHTML = "Ver";
    newButtonVer.href =
      "../../k-card-photocard/k-card-photocard/index.html?id=" +
      venta.id_photocard;
    card.appendChild(newButtonVer);

    const containerCard = document.getElementById("container-card");
    containerCard.appendChild(card);
  } catch (e) {
    console.log(e);
  }
}

getVenta();

const deleteButton = document.getElementById("deleteButton");

deleteButton.addEventListener("click", () => {
  const mensajeBorrar = prompt(
    "¿Estas seguro de borrar esta venta? Si desea eliminar escriba 'Eliminar-venta'"
  );
  async function deleteVenta() {
    try {
      await fetch(ventaBackendUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Se elimino correctamente");
    } catch (e) {
      alert("Ocurrio un error al intentar eliminar la venta");
    }
  }
  if (mensajeBorrar == "Eliminar-venta") {
    deleteVenta();
    setTimeout(() => {
      window.location.href = "../index.html?nocache=" + new Date().getTime();
    }, 3000);
  }
});
