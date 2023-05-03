let products = JSON.parse(localStorage.getItem("products")) || [];

const productsTable = document.getElementById("products-table");

loadProducts(products);

function loadProducts(products) {
  productsTable.innerHTML = `
        <tr class="head">
          <th>Imagen</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
  `;

  products.forEach((product) => {
    const tr = document.createElement("tr");
    tr.classList.add("line");
    tr.id = product.id;
    tr.innerHTML = `
          <td class="image"><img src="${product.image}"</td>
          <td class="name"><input type="text" class="input-name readonly" value="${product.name}" disabled="disabled"> </td>
          <td class="description"><input type="text" class="input-description readonly" value="${product.description}" disabled="disabled"> </td>
          <td class="price"><input type="text" class="input-price readonly" value="${product.price}" disabled="disabled"> </td>
          <td class="actions">
            <button class="edit-product"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg></button>  
            <button class="delete-product"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></button>
          </td>`;

    productsTable.append(tr);
  });

  updateDeleteButtons();
  updateEditButtons();
}

function updateDeleteButtons() {
  deleteButtons = document.getElementsByClassName("delete-product");

  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", deleteProduct);
  }
}

function deleteProduct(e) {
  const id = e.currentTarget.parentElement.parentElement.id;

  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      products.splice(i, 1);
      localStorage.setItem("products", JSON.stringify(products));
      loadProducts(products);
      alert("Producto eliminado correctamente.");
      break;
    }
  }
}

function updateEditButtons() {
  editButtons = document.getElementsByClassName("edit-product");

  for (let i = 0; i < editButtons.length; i++) {
    editButtons[i].addEventListener("click", editProduct);
  }
}

function editProduct(e) {
  const id = parseInt(e.currentTarget.parentElement.parentElement.id);
  const image = e.currentTarget.parentElement.parentElement.children[0];
  const name =
    e.currentTarget.parentElement.parentElement.children[1].children[0];
  const description =
    e.currentTarget.parentElement.parentElement.children[2].children[0];
  const price =
    e.currentTarget.parentElement.parentElement.children[3].children[0];

  if (name.classList.contains("readonly")) {
    name.classList.remove("readonly");
    description.classList.remove("readonly");
    price.classList.remove("readonly");
    name.disabled = false;
    price.disabled = false;
    description.disabled = false;
  } else {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        products[i].name = name.value;
        products[i].description = description.value;
        products[i].price = price.value;
        localStorage.setItem("products", JSON.stringify(products));
        loadProducts(products);
        alert("Producto modificado correctamente.");
        break;
      }
    }
    name.classList.add("readonly");
    name.disabled = true;
    description.classList.add("readonly");
    description.disabled = true;
    price.classList.add("readonly");
    price.disabled = true;
  }
}
