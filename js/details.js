fetch("https://aulamindhub.github.io/amazing-api/events.json")
.then(res => res.json())
.then(data => {
  console.log(data);
  let id = window.location.href;
  id = new URL(id).searchParams.get("id");
  let contenedor = document.getElementById("contenedorEvento");
  let tarjeta = document.createElement("div");
  tarjeta.className = "d-flex justify-content-center";
  for(let evento of data.events){
      if(evento._id == id){
          tarjeta.innerHTML = `
          <img class="cardDetails rounded-start border-end-0 w-50 object-fit-cover" src="${evento.image}" alt="${evento.name}">
            <div class="cardDetails rounded-end border-start-0 text-center p-2 bg-light d-flex flex-column justify-content-center">
              <h2>${evento.name}</h2>
              <p>Date: ${evento.date}</p>
              <p class="text-primary">${evento.description}</p>
              <p>Category: ${evento.category}</p>
              <p>Place: ${evento.place}</p>
              <p class="text-warning">Capacity: ${evento.capacity}</p>
              ${evento.assistance==undefined?`<p>Estimate: ${evento.estimate}</p>`:`<p>Assistance: ${evento.assistance}</p>`}
              <p class="text-info">Price: ${evento.price} USD</p>
            </div>`;
          contenedor.appendChild(tarjeta);
      }
  }
})
.catch();
