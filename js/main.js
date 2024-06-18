const urlApi = "https://aulamindhub.github.io/amazing-api/events.json";
const { createApp } = Vue
const app = createApp({
  data(){
    return {
      listaEventosBK:[],
      listaEventos:[],
      categorias:[],
      textoBuscar:"",
      categoriasSeleccionada:[],
      favoritos:[]
    }
  },
  created(){
    this.getProductos(urlApi);
  },
  methods:{
    getProductos(url){
      fetch(url).then(res => res.json()).then(data => {
        console.log(data);
        if(window.location.href == "http://127.0.0.1:5500/index.html"){
          this.listaEventosBK = [...data.events];
          this.categorias = Array.from(new Set(this.listaEventosBK.map(producto => producto.category)));
        }else if(window.location.href == "http://127.0.0.1:5500/pages/pastEvents.html"){
          this.listaEventosBK = [...data.events].filter(evento => evento.date < data.currentDate);
          this.categorias = Array.from(new Set(this.listaEventosBK.map(producto => producto.category)));
        }else if(window.location.href == "http://127.0.0.1:5500/pages/upcomingEvents.html"){
          this.listaEventosBK = [...data.events].filter(evento => evento.date > data.currentDate);
          this.categorias = Array.from(new Set(this.listaEventosBK.map(producto => producto.category)));
        }
      })
    }
  },
  computed:{
    superFiltro(){
      if(this.textoBuscar.trim() == "" && this.categoriasSeleccionada.length == 0){
        this.listaEventos = [...this.listaEventosBK]
      }else if(this.textoBuscar.trim() == "" && this.categoriasSeleccionada.length != 0){
        let filtroCategorias = this.listaEventosBK.filter(evento => this.categoriasSeleccionada.includes(evento.category))
        this.listaEventos = filtroCategorias;
      }else if(this.textoBuscar.trim() != "" && this.categoriasSeleccionada.length == 0){
        let filtroTexto = this.listaEventosBK.filter(evento => evento.name.toLowerCase().includes(this.textoBuscar.trim().toLowerCase()) || evento.description.toLowerCase().includes(this.textoBuscar.trim().toLowerCase()))
        this.listaEventos = filtroTexto;
      }else if(this.textoBuscar.trim() != "" && this.categoriasSeleccionada.length != 0){
        let filtroCategorias = this.listaEventosBK.filter(evento => this.categoriasSeleccionada.includes(evento.category))
        let filtroTexto = filtroCategorias.filter(evento => evento.name.toLowerCase().includes(this.textoBuscar.trim().toLowerCase()) || evento.description.toLowerCase().includes(this.textoBuscar.trim().toLowerCase()))
        this.listaEventos = filtroTexto;
      }
    }
  }
}).mount("#app");
// //Importación de las funciones de modules
// import { pintarTarjetas, pintarCheckbox, filtar } from "./modules.js";

// //Obtener las variables del HTML
// let lugar = document.getElementById("tarjetasHome");
// let padreCheckbox = document.querySelector(".padreCheckbox");
// let inputSearch = document.querySelector(".inputSearch");
// let form = document.querySelector("form");


// //fetch de consulta a la API y trabajo dentro, cuando obtengo la data
// fetch("https://aulamindhub.github.io/amazing-api/events.json")
// .then(res => res.json())
// .then(data =>{
//   //iniciamos la pagina mostrando las tarjetas
//   pintarTarjetas(data.events, lugar);
  
//   let arregloCategorias = [];
//   //recorremos los eventos, si la categoria no existe, la agregamos
//   for (let evento of data.events) {
//     if (!arregloCategorias.includes(evento.category)){
//       arregloCategorias.push(evento.category);
//     }
//   }
//   //funcion que crea los checkbox, envia el arreglo y donde pintarlos
//   pintarCheckbox(arregloCategorias,padreCheckbox);
  
//   //escuchadores, de cambios, activan la misma funcion, y se envia lo que halla en la barra de texto, se envia el objeto data del fetch y donde pintar las tarjetas
//   padreCheckbox.addEventListener("change", (e) => filtar(inputSearch.value,data,lugar));
//   inputSearch.addEventListener("input", (e) => filtar(inputSearch.value,data,lugar));
  
// })
// .catch();



// //escuchador del boton de busqueda, para simular que funciona
// form.addEventListener("submit",(e)=>{
//   e.preventDefault();
//   if(inputSearch.value == ""){
//     alert("Please enter something in the search bar");
//   }
  
// });