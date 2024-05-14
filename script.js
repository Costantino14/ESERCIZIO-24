/*PREMESSA: Ho utilizzato lo stile promise e quello Async/Await per esercitarmi. Mi sono anche soffermato 
su un controllo chiaro e semplice degli errori, cercando di implementare anche la users experience. 
Per quanto riguarda i CSS ho creato due pagine diverse per gestire i bottoni modifica e cancella. 
Ho utilizzato principalmente Bootstrap cercando di non cambiare troppe configurazioni in modo da avere 
poche linee di codice e comunque un design pulito e minimale.

*/




// Inizializzo alcune costanti e puntatori

const url = "https://striveschool-api.herokuapp.com/api/product/";
const form = document.getElementById("product-form");
const containerFront = document.getElementById("container-front"); 
const containerBack = document.getElementById("container-back");


//QUANDO SUL BACKOFFICE SCHIACCIO IL PULSANTE AGGIUNGI PARTE LA FUNZIONE PER AGGIUNGERE IL PRODOTTO
const createProduct = (event) => {
  event.preventDefault();

  // Creo un oggetto con i dati ottenuti dal form
  const product = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("imageUrl").value,
    price: document.getElementById("price").value
  };
  
  // Post con la chiamata fetch 
  fetch(url, {
    method: "POST",
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhMDhlOTBiM2IyNTAwMTUxYjU0MjMiLCJpYXQiOjE3MTUwNzk0MDEsImV4cCI6MTcxNjI4OTAwMX0.iqn4atP9ZiKIYnK2AlZ4ujVFKB-PwQ_njyZ9OTGAW-c",
      "Content-Type": "application/json", 
    },
    body: JSON.stringify(product),
  })
  .then((response) => response.json()) // Converto la risposta in JSON
  .then((prodotto) => {aggiungiCard(prodotto) // Funzione per creare la card
  showMessage("Prodotto aggiunto!") // Funzione per mostrare un messaggio
  })

  .catch((error) => {
    showMessage("Ops...qualcosa è andanto storto!")
    console.error("Errore:", error)
  });

  

  form.reset();
    
}; //fine funzione



// AL CARICAMENTO DELLA PAGINA FA CHIAMATO API E STAMPA PRODOTTI 
window.onload = () => {
  showProduct(); 
};

//FUNZIONE PER OTTENERE I DATI DALL'END-POINT

const showProduct = () => {

  containerBack.innerHTML= "";
 fetch(url, { headers: 
    {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhMDhlOTBiM2IyNTAwMTUxYjU0MjMiLCJpYXQiOjE3MTUwNzk0MDEsImV4cCI6MTcxNjI4OTAwMX0.iqn4atP9ZiKIYnK2AlZ4ujVFKB-PwQ_njyZ9OTGAW-c"}
  })
  .then((response) => response.json()) // Converto la risposta in JSON
  .then((prodotti) => {
    // forEach per ciascun prodotto e aggiungo una scheda ad ogniuno
    prodotti.forEach((prodotto) => aggiungiCard(prodotto));
  })
  // Gestione errori
  .catch((error) => {
    showMessage("Ops...qualcosa è andato storto!")
    console.error("Errore:", error)
  });
}

// FUNZIONE PER AGGIUNGERE UNA NUOVA CARD PRODOTTO
function aggiungiCard(product) {
 
  // Creo un nuovo div per la card 
  const card = document.createElement("div");
  card.className = "col"; // Applico CSS

  card.innerHTML= `
    <div class="card mb-3 d-flex flex-column justify-content-between" style="width: 15rem;">
      <img src="${product.imageUrl}" class="card-img-top" alt="img ${product.name}" style="max-width: 15rem; max-height: 20rem;>
      <div class="card-body ">
        <h5 class="card-title m-2">${product.name}</h5>
        <p class="card-text m-2">${product.description}</p>
        <div class="d-flex justify-content-between m-2  align-items-baseline">
          <b class="card-text">${product.brand}</b>
          <p class="card-text">${product.price}€</p>
          <a href="./productDetail.html?id=${product._id}" class="btn btn-primary m-1">Details</a>
        </div>
        <div class="btn-group" role="group" aria-label="Basic outlined example">
          <a type="button" class="btn btn-outline-primary" href="./backoffice.html?id=${product._id}"><i class="bi bi-pencil-square"></i></a>
          <button type="button" class="btn btn-outline-primary" onclick="deleteProduct('${product._id}')"><i class="bi bi-trash"></i></button>
        </div>
      </div>
    </div>
      
  `;
  
  // Aggiungo la card al contenitore delle schede nella pagina index
  if (containerFront) {
    containerFront.appendChild(card);
  }

  // Aggiungo la card al contenitore delle schede nella pagina backoffice
  if (containerBack) {
    containerBack.appendChild(card);
  }

}


      /* FUNZIONI PER MODIFICARE E CANCELLARE I PRODOTTI NEL BACKOFFICE */

//FUNZIONE PER CANCELLARE IL PRODOTTO RICHIAMATA CON ONCLICK
const deleteProduct = (id) => {
  if (confirm("Vuoi eliminare il prodotto?")) {
    fetch(url + id, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhMDhlOTBiM2IyNTAwMTUxYjU0MjMiLCJpYXQiOjE3MTUwNzk0MDEsImV4cCI6MTcxNjI4OTAwMX0.iqn4atP9ZiKIYnK2AlZ4ujVFKB-PwQ_njyZ9OTGAW-c",
        "Content-Type": "application/json", 
      }
    }) 
    
  .then (showProduct()) //Aggiorno la pagina
        // Gestione errori
    .catch((error) => {
      showMessage("Ops...qualcosa è andato storto!")
      console.error("Errore:", error)
    }); 
  };
};


/*IMPOSTAZIONI PER MODIFICARE I PRODOTTI*/

const parametri = new URLSearchParams(location.search);
const id = parametri.get("id")
// metto questo if per gestire questi comandi solo quando vado nelle impostazioni di modifica
if (id) { 

  const modifica = document.getElementById("modifica");
  const aggiungi = document.getElementById("aggiungi");
  modifica.classList.add("d-block"); // faccio visualizzare il bottone modifica.
  aggiungi.className = "d-none"; // rimuovo la visualizzazione del bottone aggiungi.

  fetch(url + id, { headers: 
    {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhMDhlOTBiM2IyNTAwMTUxYjU0MjMiLCJpYXQiOjE3MTUwNzk0MDEsImV4cCI6MTcxNjI4OTAwMX0.iqn4atP9ZiKIYnK2AlZ4ujVFKB-PwQ_njyZ9OTGAW-c"}
    })
    .then((response) => response.json()) // Converto la risposta in JSON
    .then((prodotto) => {
    let product = prodotto;

    document.getElementById("name").value = product.name;
    document.getElementById("description").value = product.description;
    document.getElementById("brand").value = product.brand;
    document.getElementById("imageUrl").value = product.imageUrl;
    document.getElementById("price").value = product.price;

  })
  // Gestione errori
  .catch((error) => {
    showMessage("Ops...qualcosa è andato storto!")
    console.error("Errore:", error)
  });
}


//FUNZIONE PER AGGIORNARE UN PRODOTTO RICHIAMATA CON ONCLICK
const updateProduct = async (event) => {
  event.preventDefault();

  // Creo un oggetto con i dati MODIFICATI nel form
  const product = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("imageUrl").value,
    price: document.getElementById("price").value
  };
  
  // Put con la chiamata fetch 
  let response = await fetch(url+id, {
    method: "PUT",
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhMDhlOTBiM2IyNTAwMTUxYjU0MjMiLCJpYXQiOjE3MTUwNzk0MDEsImV4cCI6MTcxNjI4OTAwMX0.iqn4atP9ZiKIYnK2AlZ4ujVFKB-PwQ_njyZ9OTGAW-c",
      "Content-Type": "application/json", 
    },
    body: JSON.stringify(product),
  })

  if (response.ok) {
    showMessage("Modificato con successo!");
  } else {
    showMessage("Ops....qualcosa è andato storto!");
    console.error("Errore:", error);
  }
  /*Reinderizzo la pagina al backoffice originale (dove posso aggiungere nuovi prodotti), 
  così da aggiornare le modifiche e resettare automaticamente il form.
  Inserisco un setTimeout per far mostrare il messaggio. */
  
  setTimeout(() => { //scompare dopo 3 secondi
    window.location = "./backoffice.html";
  }, 3000); 
}; 


//FUNZIONE PER VISUALIZZARE MESSAGGIO PER L'UTENTE
const showMessage = (messaggio) => {
  const message= document.getElementById("box-message"); //Punto il box-message nel backoffice
  message.innerText = messaggio;
  message.style.display= "block"; //Imposto in display block 

  setTimeout(() => { //scompare dopo 3 secondi
    message.style.display= "none";
  }, 3000);

}