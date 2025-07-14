const ventasBackendUrl = "http://localhost:3000/api/ventas";

async function getVentas() {
  try {
    const responseVentas = await fetch(ventasBackendUrl);
    const ventas = await responseVentas.json();
    ventas.forEach((venta) => {
      // se crea la fila para toda la informacion
      const newRow = document.createElement("tr");
      // se crean y se appendean los datos en la fila
      const nombre_cliente = document.createElement("td");
      nombre_cliente.innerHTML = venta.nombre_cliente;
      newRow.appendChild(nombre_cliente);

      const newTelefono_cliente = document.createElement("td");
      newTelefono_cliente.innerHTML = venta.telefono_cliente;
      newRow.appendChild(newTelefono_cliente);

      const newPrecio_venta = document.createElement("td");
      newPrecio_venta.innerHTML = venta.precio_venta;
      newRow.appendChild(newPrecio_venta);

      const newMedio_de_pago = document.createElement("td");
      newMedio_de_pago.innerHTML = venta.medio_de_pago;
      newRow.appendChild(newMedio_de_pago);

      const newFecha_venta = document.createElement("td");
      newFecha_venta.innerHTML = venta.fecha_venta.split("T")[0];
      newRow.appendChild(newFecha_venta);

      const newLugar_entrega = document.createElement("td");
      newLugar_entrega.innerHTML = venta.lugar_entrega;
      newRow.appendChild(newLugar_entrega);

      const newFecha_entrega = document.createElement("td");
      newFecha_entrega.innerHTML = venta.fecha_entrega.split("T")[0];
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

      const trBody = document.getElementById("tbody");
      trBody.appendChild(newRow);
      const rows = Array.from(trBody.querySelectorAll("tr"));
      const sortedRows = rows.sort((a, b) => {
        return b.children[4].textContent.localeCompare(
          a.children[4].textContent
        );
      });

      trBody.innerHTML = "";

      sortedRows.forEach((row) => {
        trBody.appendChild(row);
      });
    });
  } catch (e) {
    console.log(e);
  }
}

getVentas();

//codigo para que funcione el boton filtro
document.addEventListener("DOMContentLoaded", () => {
  // Obtener el elemento del dropdown
  const dropdown = document.querySelector(".dropdown");
  // Obtener el disparador del dropdown (el botón)
  const dropdownTrigger = dropdown.querySelector(".dropdown-trigger button");

  // Función para alternar la clase 'is-active'
  function toggleDropdown() {
    dropdown.classList.toggle("is-active");
  }

  // Añadir evento de clic al disparador
  dropdownTrigger.addEventListener("click", toggleDropdown);

  // Cerrar el dropdown si se hace clic fuera de él
  document.addEventListener("click", (event) => {
    // Si el clic no fue dentro del dropdown ni en el disparador del dropdown
    if (!dropdown.contains(event.target) && event.target !== dropdownTrigger) {
      // Y si el dropdown está activo, entonces desactivarlo
      if (dropdown.classList.contains("is-active")) {
        dropdown.classList.remove("is-active");
      }
    }
  });
});

//codigo para que funcionen los filtros

const selectFilter = document.getElementById("order-by");

selectFilter.addEventListener("change", () => {
  const tbody = document.querySelector("tbody");
  const rows = Array.from(tbody.querySelectorAll("tr"));

  if (selectFilter.value == "NameA-Z") {
    const sortedRows = rows.sort((a, b) => {
      return a.children[0].textContent.localeCompare(b.children[0].textContent);
    });

    tbody.innerHTML = "";

    sortedRows.forEach((row) => {
      tbody.appendChild(row);
    });
  } else if (selectFilter.value == "NameZ-A") {
    const sortedRows = rows.sort((a, b) => {
      return b.children[0].textContent.localeCompare(a.children[0].textContent);
    });

    tbody.innerHTML = "";

    sortedRows.forEach((row) => {
      tbody.appendChild(row);
    });
  } else if (selectFilter.value == "priceLowHigh") {
    const sortedRows = rows.sort((a, b) => {
      return (
        Number(a.children[2].textContent) - Number(b.children[2].textContent)
      );
    });

    tbody.innerHTML = "";

    sortedRows.forEach((row) => {
      tbody.appendChild(row);
    });
  } else if (selectFilter.value == "priceHighLow") {
    const sortedRows = rows.sort((a, b) => {
      return (
        Number(b.children[2].textContent) - Number(a.children[2].textContent)
      );
    });

    tbody.innerHTML = "";

    sortedRows.forEach((row) => {
      tbody.appendChild(row);
    });
  } else if (selectFilter.value == "oldestSale") {
    const sortedRows = rows.sort((a, b) => {
      return a.children[4].textContent.localeCompare(b.children[4].textContent);
    });

    tbody.innerHTML = "";

    sortedRows.forEach((row) => {
      tbody.appendChild(row);
    });
  } else if (selectFilter.value == "newestSale") {
    const sortedRows = rows.sort((a, b) => {
      return b.children[4].textContent.localeCompare(a.children[4].textContent);
    });

    tbody.innerHTML = "";

    sortedRows.forEach((row) => {
      tbody.appendChild(row);
    });
  }
});
