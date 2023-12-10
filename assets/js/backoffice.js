const productId = new URLSearchParams(window.location.search).get("productId");

const URL = productId
  ? "https://striveschool-api.herokuapp.com/api/product/" + productId
  : "https://striveschool-api.herokuapp.com/api/product/";

const method = productId ? "PUT" : "POST";

window.addEventListener("DOMContentLoaded", () => {
  const divBtns = document.getElementById("btns");
  const divBtnsLeft = document.createElement("div");

  const btnReset = document.createElement("button");
  btnReset.className = "btn btn-outline-dark";
  btnReset.setAttribute("data-bs-toggle", "modal");
  btnReset.setAttribute("data-bs-target", "#resetModal");
  btnReset.type = "button";
  btnReset.innerText = "Reset";

  const resetModal = document.getElementById("resetBtn");
  resetModal.addEventListener("click", resetForm);

  const deleteModal = document.getElementById("deleteBtn");
  deleteModal.addEventListener("click", deleteProduct);

  if (productId) {
    const btnMod = document.createElement("button");
    btnMod.className = "btn btn-outline-success me-2";
    btnMod.type = "submit";
    btnMod.innerText = "Edit product";

    const btnDel = document.createElement("button");
    btnDel.className = "btn btn-outline-danger";
    btnDel.setAttribute("data-bs-toggle", "modal");
    btnDel.setAttribute("data-bs-target", "#deleteModal");
    btnDel.type = "button";
    btnDel.innerText = "Delete";

    divBtnsLeft.appendChild(btnMod);
    divBtnsLeft.appendChild(btnReset);

    divBtns.appendChild(divBtnsLeft);
    divBtns.appendChild(btnDel);

    document.getElementById("subtitle").innerText = "- EDIT";
  } else {
    const btnAdd = document.createElement("button");
    btnAdd.className = "btn btn-outline-primary me-2";
    btnAdd.type = "submit";
    btnAdd.innerText = "Add product";

    divBtnsLeft.appendChild(btnAdd);
    divBtnsLeft.appendChild(btnReset);

    divBtns.appendChild(divBtnsLeft);
  }

  handleBackoffice();
  handleSubmit();
});

function handleBackoffice() {
  const name = document.getElementById("name");
  const brand = document.getElementById("brand");
  const description = document.getElementById("description");
  const price = document.getElementById("price");
  const imageUrl = document.getElementById("imageUrl");

  if (productId) {
    isLoading(true);
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
        name.value = product.name;
        brand.value = product.brand;
        description.value = product.description;
        price.value = product.price;
        imageUrl.value = product.imageUrl;
      })
      .catch((err) => console.log(err))
      .finally(() => isLoading(false));
  }
}

function handleSubmit() {
  const form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const newProduct = {
      name: document.getElementById("name").value,
      brand: document.getElementById("brand").value,
      description: document.getElementById("description").value,
      price: document.getElementById("price").value,
      imageUrl: document.getElementById("imageUrl").value,
    };

    fetch(URL, {
      method,
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json",
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
      .then((product) => {
        if (productId) showResponse(`Product {id: ${product["_id"]}} modified successfully!`, "success");
        else showResponse(`Product {id: ${product["_id"]}} added successfully!`);
      })
      .catch((err) => console.log(err));
  });
}

function resetForm() {
  const form = document.querySelector("form");
  form.reset();
}

function deleteProduct() {
  fetch(URL, {
    method: "DELETE",
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

      disableButtons();

      setTimeout(() => window.location.assign("./index.html"), 2000);
    })
    .catch((err) => console.log(err));
}

function showResponse(message, color = "primary") {
  const alertResponse = document.getElementById("response");
  alertResponse.className = `alert alert-${color} p-3 mb-3`;
  alertResponse.innerHTML = message;
  disableButtons();

  setTimeout(() => window.location.assign("./index.html"), 2000);
}

function disableButtons() {
  const btns = document.getElementById("btns");
  btns.querySelectorAll("button").forEach((button) => {
    button.classList.add("disabled");
  });
}

function isLoading(boolean) {
  if (boolean) {
    document.getElementById("spinner").classList.remove("d-none");
    document.getElementById("spinner").classList.add("d-flex");
  } else {
    document.getElementById("spinner").classList.remove("d-flex");
    document.getElementById("spinner").classList.add("d-none");
  }
}
