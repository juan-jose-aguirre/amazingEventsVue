let tbodyUpcoming = document.getElementById("tbodyUpcoming");
let tbodyPast = document.getElementById("tbodyPast");

fetch("https://aulamindhub.github.io/amazing-api/events.json")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    let eventoMayorAsistencia = eventoMayorPorcentajeAsistencia(data.events);
    let eventoMenorAsistencia = eventoMenorPorcentajeAsistencia(data.events);
    let eventoConMayorCapacidad = eventoMayorCapacidad(data.events);

    // console.log(eventoMayorAsistencia);
    // console.log(eventoMenorAsistencia);
    // console.log(eventoConMayorCapacidad);

    pintarEventoMayorasistencia(data.events, eventoMayorAsistencia);
    pintarEventoMenorAsistencia(data.events, eventoMenorAsistencia);
    pintarEventoConMayorCapacidad(data.events, eventoConMayorCapacidad);

    //Arreglo para los eventos futuros
    let arregloEventosUpcoming = [];
    //Arreglo para los eventos pasados
    let arregloEventosPast = [];
    for (let i = 0; i < data.events.length; i++) {
        //si la fecha del evento es mayor a la fecha actual, es proximo
        if (data.events[i].date > data.currentDate) {
            arregloEventosUpcoming.push(data.events[i]);
        }
        //si la fecha del evento es menor a la fecha actual, es pasado
        if (data.events[i].date < data.currentDate) {
            arregloEventosPast.push(data.events[i]);
        }
    }

    let objetoUpcoming = calcularEstadisticas(arregloEventosUpcoming);
    pintarEstadisticas(objetoUpcoming.categorias,tbodyUpcoming);
    let objetoPast = calcularEstadisticas(arregloEventosPast);
    pintarEstadisticas(objetoPast.categorias,tbodyPast);
  })
  .catch();

function eventoMayorPorcentajeAsistencia(eventos) {
  let eventosConAsistencia = [];
  for (let evento of eventos) {
    //recorremos el arreglo de eventos, buscando los que tengan la propiedad asistencia, y estos se guardaran en un arreglo
    if (evento.assistance != undefined) {
      eventosConAsistencia.push(evento);
    }
  }
  let eventoMayorAsistencias = {
    _id: 0,
    porcentajeAsistencia: 0,
  };
  eventosConAsistencia.forEach((evento) => {
    let porcentaje = (evento.assistance * 100) / evento.capacity;
    if (porcentaje > eventoMayorAsistencias.porcentajeAsistencia) {
      eventoMayorAsistencias = {
        _id: evento._id,
        porcentajeAsistencia: porcentaje,
      };
    }
    return eventoMayorAsistencias;
  });
  return eventoMayorAsistencias;
}

function eventoMenorPorcentajeAsistencia(eventos) {
  let eventosConAsistencia = [];
  for (let evento of eventos) {
    if (evento.assistance != undefined) {
      eventosConAsistencia.push(evento);
    }
  }
  let eventoMenorAsistencia = {
    _id: 0,
    porcentajeAsistencia: 101,
  };
  eventosConAsistencia.forEach((evento) => {
    let porcentaje = (evento.assistance * 100) / evento.capacity;
    if (porcentaje < eventoMenorAsistencia.porcentajeAsistencia) {
      eventoMenorAsistencia = {
        _id: evento._id,
        porcentajeAsistencia: porcentaje,
      };
    }
    return eventoMenorAsistencia;
  });
  return eventoMenorAsistencia;
}

function eventoMayorCapacidad(eventos) {
  let mayor = { _id: 0, capacity: 0 };
  for (let evento of eventos) {
    if (evento.capacity > mayor.capacity) {
      mayor = {
        _id: evento._id,
        capacity: evento.capacity,
      };
    }
  }
  return mayor;
}

function pintarEventoMayorasistencia(listaEventos, eventoSeleccionado) {
  let eventoConMayorAsistencia = document.getElementById(
    "eventoConMayorAsistencia"
  );
  for (let evento of listaEventos) {
    if (evento._id == eventoSeleccionado._id) {
      eventoConMayorAsistencia.innerText = `${evento.name}`;
    }
  }
}

function pintarEventoMenorAsistencia(listaEventos, eventoSeleccionado) {
  let eventoConMenorAsistencia = document.getElementById(
    "eventoConMenorAsistencia"
  );
  for (let evento of listaEventos) {
    if (evento._id == eventoSeleccionado._id) {
      eventoConMenorAsistencia.innerText = `${evento.name}`;
    }
  }
}

function pintarEventoConMayorCapacidad(listaEventos, eventoSeleccionado) {
  let eventoConMayorCapacidad = document.getElementById(
    "eventoConMayorCapacidad"
  );
  for (let evento of listaEventos) {
    if (evento._id == eventoSeleccionado._id) {
      eventoConMayorCapacidad.innerText = `${evento.name}`;
    }
  }
}

function calcularEstadisticas(listaEventos) {
    let listaCategoria = [];
    for(let evento of listaEventos){
        if(!listaCategoria.includes(evento.category)){
            listaCategoria.push(evento.category)
        }
    }
    let objetoDeCategorias = {
        categorias:[]
    }
    for(let categoria of listaCategoria){
        let ingresos = 0;
        let asistencia = 0;
        let capacidad = 0;
        for(let evento of listaEventos){
            if(evento.category == categoria){
                if(evento.assistance == undefined){
                    ingresos += evento.price * evento.estimate;
                    asistencia += evento.estimate;
                }else{
                    ingresos += evento.price * evento.assistance
                    asistencia += evento.assistance
                }
                capacidad += evento.capacity
            }
        }
        objetoDeCategorias.categorias.push({name:categoria,ingresos:ingresos,porcentajeAsistencia:(asistencia*100)/capacidad});
    }
    return objetoDeCategorias;
}

function pintarEstadisticas(listaCategoria, lugar){
    for(let categoria of listaCategoria){
        lugar.innerHTML += `
        <tr>
            <td>${categoria.name}</td>
            <td>$ ${categoria.ingresos} =</td>
            <td>${categoria.porcentajeAsistencia.toFixed(2)}%</td>
        </tr>
        `;
    }
}