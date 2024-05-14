const parametri = new URLSearchParams(location.search);
const id = parametri.get("id")
const url = "https://striveschool-api.herokuapp.com/api/product/"+ id;
const container = document.querySelector("#container")

fetch (url, { headers: 
    {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhMDhlOTBiM2IyNTAwMTUxYjU0MjMiLCJpYXQiOjE3MTUwNzk0MDEsImV4cCI6MTcxNjI4OTAwMX0.iqn4atP9ZiKIYnK2AlZ4ujVFKB-PwQ_njyZ9OTGAW-c"}
  })
.then(response => response.json())
.then (data => {
  const dettagli = data;
  container.innerHTML= `
  <div class="card m-5 p-2" style="max-width: 600px;">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${dettagli.imageUrl}" class="img-fluid rounded-start" alt="img ${dettagli.name}">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${dettagli.name}</h5>
          <p class="card-text">${dettagli.description}</p>
          <div class="d-flex justify-content-between m-2  align-items-baseline">
            <h4>${dettagli.brand}</h4>
            <p>${dettagli.price}€</p>
            <button class="btn btn-primary" type="button"><i class="bi bi-cart3"></i> +</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
})
.catch((error) => {console.error("Errore:", error), alert("errore")});
