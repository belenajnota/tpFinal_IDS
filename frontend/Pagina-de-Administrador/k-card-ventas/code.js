const ventasBackendUrl = "http://localhost:3000/api/ventas";

async function getVentas() {
  try {
    const response = await fetch(ventasBackendUrl);
    const data = await response.json();
    data.forEach((venta) => {
      // se crea la fila para toda la informacion
      const newRow = document.createElement("tr");
      // se crean y se appendean los datos en la fila
      const nombre_cliente = document.createElement("td");
      nombre_cliente.innerHTML = venta.nombre_cliente;
      newRow.appendChild(nombre_cliente);

      const newTelefono_cliente = document.createElement("td");
      newTelefono_cliente.innerHTML = venta.telefono_cliente;
      newRow.appendChild(newTelefono_cliente);

      const newInstagram_cliente = document.createElement("td");
      newInstagram_cliente.innerHTML = venta.instagram_cliente;
      newRow.appendChild(newInstagram_cliente);

      const newPrecio_venta = document.createElement("td");
      newPrecio_venta.innerHTML = venta.precio_venta;
      newRow.appendChild(newPrecio_venta);

      const newMedio_de_pago = document.createElement("td");
      newMedio_de_pago.innerHTML = venta.medio_de_pago;
      newRow.appendChild(newMedio_de_pago);

      const newFecha_venta = document.createElement("td");
      // fecha limpia y fecha correcta estan para eliminar el formato T03:00:00.000Z
      const fechaLimpia = venta.fecha_venta;
      newFecha_venta.innerHTML = fechaLimpia.split("T")[0];
      newRow.appendChild(newFecha_venta);

      const newLugar_entrega = document.createElement("td");
      newLugar_entrega.innerHTML = venta.lugar_entrega;
      newRow.appendChild(newLugar_entrega);

      const newFecha_entrega = document.createElement("td");
      const fechaCorrecta = venta.fecha_entrega;
      newFecha_entrega.innerHTML = fechaCorrecta.split("T")[0];
      newRow.appendChild(newFecha_entrega);

      const newHora_entrega = document.createElement("td");
      newHora_entrega.innerHTML = venta.hora_entrega;
      newRow.appendChild(newHora_entrega);

      const newCosto_entrega = document.createElement("td");
      newCosto_entrega.innerHTML = venta.costo_entrega;
      newRow.appendChild(newCosto_entrega);
      // se crean los botones para las acciones ver, borrar y modificar
      const newVer = document.createElement("td");
      const newButtonVer = document.createElement("a");
      newButtonVer.innerHTML = "Ver";
      newButtonVer.className = "button button-change";
      newButtonVer.href = "./k-card-venta/index.html?id=" + venta.id;
      newVer.appendChild(newButtonVer);
      newRow.appendChild(newVer);

      const newBorrar = document.createElement("td");
      const newButtonBorrar = document.createElement("a");
      newButtonBorrar.innerHTML = "Borrar";
      newButtonBorrar.className = "button button-change";
      newBorrar.appendChild(newButtonBorrar);
      newRow.appendChild(newBorrar);

      newButtonBorrar.addEventListener("click", () => {
        const mensajeBorrar = prompt(
          "¿Estas seguro de borrar esta venta? Si desea eliminar escriba 'Eliminar-Venta'"
        );
        const ventaBackendUrl = "http://localhost:3000/api/ventas/" + venta.id;
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
        if (mensajeBorrar == "Eliminar-Venta") {
          deleteVenta();
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      });

      const newModificar = document.createElement("td");
      const newButtonModificar = document.createElement("a");
      newButtonModificar.innerHTML = "Modificar";
      newButtonModificar.className = "button button-change";
      newButtonModificar.href =
        "./k-card-venta-update/index.html?id=" + venta.id;
      newModificar.appendChild(newButtonModificar);
      newRow.appendChild(newModificar);

      const trBody = document.getElementById("tabla-body");
      trBody.appendChild(newRow);
    });
  } catch (e) {
    console.log(e);
  }
}

getVentas();
