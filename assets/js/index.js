const productsCarousel = [];
const indexCarousel = [];

window.addEventListener("DOMContentLoaded", () => {
  fetchedData();
});

function fetchedData() {
  isLoading(true);
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZDkwOTBkOGEyMDAwMThhNDhhNjQiLCJpYXQiOjE3MDE5NTk5NDUsImV4cCI6MTcwMzE2OTU0NX0.iVHaKFZGGAPTt8GtISqU7ajg332iV2R8blvIG_7MKr8",
    },
  })
    .then((response) => {
      if (response.status === 401) throw new Error("Unauthorized access to resource!");
      if (response.status === 404) throw new Error("Resource not found!");
      if (response.status >= 400 && response.status < 500) throw new Error("Client error");
      if (response.status >= 500 && response.status < 600) throw new Error("Server error");
      if (!response.ok) throw new Error("Unable to receive data!");

      return response.json();
    })
    .then((products) => {
      generateIndex(products.length);
      showCarousel(products, indexCarousel);

      products.forEach((product) => {
        generateCard(product);
      });
    })
    .catch((err) => console.log(err))
    .finally(() => isLoading(false));
}

function generateCard(product) {
  const col = document.createElement("col");
  col.classList.add("col");

  const card = document.createElement("div");
  card.classList.add("card");

  const divImg = document.createElement("div");
  divImg.className = "divImg border border-light border-2 border-top-0 border-end-0 border-start-0 p-3";
  divImg.addEventListener("click", () => redirect("details", product["_id"]));

  const img = document.createElement("img");
  img.src = product.imageUrl;
  img.classList.add("card-img-top");
  img.style = "height: 250px; object-fit: contain; mix-blend-mode: multiply";

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body", "d-flex", "flex-column", "justify-content-between");
  cardBody.style = "height: 200px";

  const divBody = document.createElement("div");

  const title = document.createElement("h5");
  title.classList.add("card-title", "mb-3");
  title.innerHTML = product.name;

  const p = document.createElement("p");
  p.classList.add("card-text", "font-monospace", "text-black-50");
  p.innerHTML = product.price.toFixed(2) + "$";

  const div = document.createElement("div");
  div.className = "d-flex justify-content-between align-items-end";

  const a = document.createElement("a");
  a.className = "link text-decoration-none";
  a.type = "button";
  a.innerHTML = "<small>See more</small>";
  a.addEventListener("click", () => redirect("details", product["_id"]));

  const modify = document.createElement("button");
  modify.className = "d-flex justify-content-center align-items-center btn btn-outline-success rounded-circle p-1";
  modify.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
</svg>`;
  modify.addEventListener("click", () => redirect("backoffice", product["_id"]));

  divBody.appendChild(title);
  divBody.appendChild(p);

  cardBody.appendChild(divBody);

  div.appendChild(a);
  div.appendChild(modify);

  cardBody.appendChild(div);

  divImg.appendChild(img);
  card.appendChild(divImg);
  card.appendChild(cardBody);

  col.appendChild(card);

  document.querySelector(".row").appendChild(col);
}

function isLoading(boolean) {
  if (!boolean) document.getElementById("spinner").classList.add("d-none");
  else document.getElementById("spinner").classList.remove("d-none");
}

function generateIndex(length) {
  if (indexCarousel.length == 4) {
    return 1;
  }

  const number = Math.floor(Math.random() * length);

  if (!indexCarousel.includes(number)) {
    indexCarousel.push(number);
  }
  generateIndex(length);
}

function showCarousel(products, index) {
  const carousel = document.querySelector(".carousel-inner");
  const imgs = carousel.querySelectorAll("img");
  const titles = carousel.querySelectorAll("h5");

  for (let i = 0; i < 4; i++) {
    imgs[i].src = products[index[i]].imageUrl;
    imgs[i].parentNode.style = "cursor: pointer";
    imgs[i].parentNode.addEventListener("click", () => redirect("details", products[index[i]]["_id"]));
    titles[i].innerHTML = products[index[i]].name;
  }
  document.getElementById("carouselAutoplaying").classList.remove("d-none");
  console.log("inside" + index);
  console.log(imgs);
}

function redirect(page, productId) {
  window.location.assign(`./${page}.html?productId=${productId}`);
}
