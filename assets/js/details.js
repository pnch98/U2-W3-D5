window.addEventListener("DOMContentLoaded", () => {
  const id = new URLSearchParams(window.location.search).get("productId");
  const URL = "https://striveschool-api.herokuapp.com/api/product/" + id;
  fetchedData(URL);
});

function fetchedData(URL) {
  fetch(URL, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZDkwOTBkOGEyMDAwMThhNDhhNjQiLCJpYXQiOjE3MDE5NTk5NDUsImV4cCI6MTcwMzE2OTU0NX0.iVHaKFZGGAPTt8GtISqU7ajg332iV2R8blvIG_7MKr8",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((product) => {
      const divImg = document.createElement("div");
      divImg.className = "d-flex justify-content-center border border-1 border-dark position-relative p-3";
      divImg.style = "height: 450px";

      const divBody = document.createElement("div");
      divBody.className = "d-flex flex-column justify-content-between h-100";

      const div1 = document.createElement("div");
      div1.className = "d-flex flex-column";

      const div2 = document.createElement("div");
      div2.className = "d-flex flex-column align-items-start";

      const img = document.createElement("img");
      img.src = product.imageUrl;
      img.className = "w-100";
      img.style = " object-fit: contain";

      const title = document.createElement("h2");
      title.innerText = product.name;

      const description = document.createElement("p");
      description.className = "mb-5";
      description.innerText = product.description;

      const price = document.createElement("span");
      price.className = "font-monospace mb-1";
      price.innerText = "Price: " + product.price.toFixed(2) + "$";

      const button = document.createElement("button");
      button.innerText = "Shop";
      button.style = "width: 130px";
      button.className = "btn btn-outline-dark";

      const modify = document.createElement("button");
      modify.className =
        "d-flex justify-content-center align-items-center btn btn-outline-success rounded-circle position-absolute top-0 end-0 mt-3 me-3 p-1";
      modify.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
    </svg>`;
      modify.addEventListener("click", () => window.location.assign("./backoffice.html?productId=" + product["_id"]));

      divImg.appendChild(img);
      divImg.appendChild(modify);

      div1.appendChild(title);
      div1.appendChild(description);

      div2.appendChild(price);
      div2.appendChild(button);

      divBody.appendChild(div1);
      divBody.appendChild(div2);

      document.getElementById("img").appendChild(divImg);
      document.getElementById("description").appendChild(divBody);
    });
}
