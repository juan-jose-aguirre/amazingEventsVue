//Url base para los datalles de las tarjetas
let urlDetails = new URL("http://127.0.0.1:5500/details.html");
//funcion que pinta las tarjetas
export function pintarTarjetas(arreglo, lugar) {
    lugar.innerHTML = "";
    for (let i = 0; i < arreglo.length; i++) {
      let tarjeta = document.createElement("div");
      let urlTemp = urlDetails+"?id="+arreglo[i]._id;
  
      tarjeta.innerHTML = `<div class="card h-100 tarjetas" style="width: 18rem">
        <img src="${arreglo[i].image}" class="card-img-top h-50 object-fit-cover" alt="${arreglo[i].name}" >
        <div class="card-body text-center d-flex flex-column h-50">
          <h5 class="card-title">${arreglo[i].name}</h5>
          <p class="card-text">
          ${arreglo[i].description}
          </p>
          <div class="d-flex justify-content-around align-items-baseline">
            <p>$${arreglo[i].price} USD</p>
            <a href="${urlTemp}" class="btn irDetails">Details</a>
          </div>
        </div>
      </div>`;
      tarjeta.classList.add("my-3");
      lugar.appendChild(tarjeta);
    }
}
//funcion que pinta los checkbox
export function pintarCheckbox (arregloCategorias, lugar) {
    for (let categoria of arregloCategorias) {
        let inputCheckbox = document.createElement("div");
        inputCheckbox.innerHTML = `
            <input class="form-check-input mt-0 inputCheckbox"
                id="${categoria}"
                type="checkbox"
                value="${categoria}"
                name="${categoria}"
                aria-label="${categoria}"
                >
            <label for="${categoria}" class="ms-2">${categoria}</label>`;
        inputCheckbox.className = "input-group-text me-1 mb-1";
        lugar.appendChild(inputCheckbox);
    }
}
//funcion que filtra el arreglo con respecto a las filtros del usuarios
export function filtar(text,data,lugar){
    let checkboxTrue = document.querySelectorAll("input[type=checkbox]:checked");
  
    if (checkboxTrue.length == 0 && text == "") {
      pintarTarjetas(data.events, lugar);
    } else if (checkboxTrue.length != 0 && text == "") {
      let arregloFiltrado = data.events.filter((evento) => {
        for (let checkboxTachado of checkboxTrue) {
          if (evento.category == checkboxTachado.value) {
            return evento;
          }
        }
      });
      pintarTarjetas(arregloFiltrado, lugar);
    } else if (checkboxTrue.length != 0 && text != "") {
      let arregloFiltrado = data.events.filter((evento) => {
        if (
          evento.name
            .toLowerCase()
            .trim()
            .includes(text.trim().toLowerCase()) ||
          evento.description
            .toLowerCase()
            .trim()
            .includes(text.trim().toLowerCase())
        ) {
          return evento;
        }
      });
      let arregloFiltrado2 = arregloFiltrado.filter((evento) => {
        for (let checkboxTachado of checkboxTrue) {
          if (checkboxTachado.value == evento.category) {
            return evento;
          }
        }
      });
      if (arregloFiltrado2.length != 0) {
        pintarTarjetas(arregloFiltrado2, lugar);
      } else {
        lugar.innerHTML = "";
        let aviso = document.createElement("div");
        aviso.className = "alert alert-info p-4 my-5";
        aviso.setAttribute("role", "alert");
        aviso.innerText = "No hay eventos que coincidan con los filtros";
        lugar.appendChild(aviso);
      }
    } else if (checkboxTrue.length == 0 && text != "") {
      let arregloFiltrado = data.events.filter((evento) => {
        if (
          evento.name.toLowerCase().includes(text.trim().toLowerCase()) ||
          evento.description.toLowerCase().includes(text.trim().toLowerCase())
        ) {
          return evento;
        }
      });
      if (arregloFiltrado.length != 0) {
        pintarTarjetas(arregloFiltrado, lugar);
      } else {
        lugar.innerHTML = "";
        let aviso = document.createElement("div");
        aviso.className = "alert alert-info p-4 my-5";
        aviso.setAttribute("role", "alert");
        aviso.innerText = "No hay eventos que coincidan con los filtros";
        lugar.appendChild(aviso);
      }
    }
}
