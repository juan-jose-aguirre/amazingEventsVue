//Importación de las funciones de modules
import { pintarTarjetas, pintarCheckbox, filtar } from "./modules.js";

//Obtener las variables del HTML
let lugar = document.getElementById("tarjetasUpcoming");
let inputSearch = document.querySelector(".inputSearch");
let padreCheckbox = document.querySelector(".padreCheckbox");

//fetch de consulta a la API y trabajo dentro, cuando obtengo la data
fetch("https://aulamindhub.github.io/amazing-api/events.json")
.then(res => res.json())
.then(data => {
  //Arreglo para los eventos futuros
  let arregloEventosUpcoming = [];
  //Arreglo para las categorias de eventos futuros
  let arregloCategorias = [];
  for (let i = 0; i < data.events.length; i++) {
    //si la fecha del evento es mayor a la fecha actual, es proximo
    if (data.events[i].date > data.currentDate) {
      arregloEventosUpcoming.push(data.events[i]);
    }
    //si el arreglo de categorias no tiene las categoria del evento, la incluye
    if (data.events[i].date > data.currentDate && !arregloCategorias.includes(data.events[i].category)){
      arregloCategorias.push(data.events[i].category);
    }
  }

  //iniciamos la pagina mostrando las tarjetas
  pintarTarjetas(arregloEventosUpcoming, lugar);
  //funcion que crea los checkbox, envia el arreglo y donde pintarlos
  pintarCheckbox(arregloCategorias,padreCheckbox);

  inputSearch.addEventListener("input", (e) => filtar(inputSearch.value, {events:arregloEventosUpcoming}, lugar));
  
  padreCheckbox.addEventListener("change", (e) => filtar(inputSearch.value, {events:arregloEventosUpcoming}, lugar));
})
.catch();


//escuchador del boton de busqueda, para simular que funciona
let form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (inputSearch.value == "") {
    alert("Please enter something in the search bar");
  }
});