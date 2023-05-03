let cartProducts = localStorage.getItem("cart");
cartProducts = JSON.parse(cartProducts);

const emptyCartContainer = document.getElementById("empty-cart");
const cartProductsContainer = document.getElementById("cart-products");
const cartActionsContainer = document.getElementById("cart-actions");
const cartBoughtContainer = document.getElementById("cart-bought");
let deleteButtons = document.getElementsByClassName("cart-product-delete");
const emptyButton = document.getElementById("cart-actions-empty");
const totalContainer = document.getElementById("total");
const buyButton = document.getElementById("cart-actions-buy");

function loadCartProducts() {
  if (cartProducts && cartProducts.length > 0) {
    emptyCartContainer.classList.add("disabled");
    cartProductsContainer.classList.remove("disabled");
    cartActionsContainer.classList.remove("disabled");
    cartBoughtContainer.classList.add("disabled");

    cartProductsContainer.innerHTML = "";

    cartProducts.forEach((product) => {
      const div = document.createElement("div");
      div.classList.add("cart-product");
      div.innerHTML = `
                <img class="cart-product-image" src="${product.image}" alt="${
        product.name
      }">
                <div class="cart-product-name">
                    <small>Título</small>
                    <h3>${product.name}</h3>
                </div>
                <div class="cart-product-quantity">
                    <small>Cantidad</small>
                    <p>${product.quantity}</p>
                </div>
                <div class="cart-product-price">
                    <small>Precio</small>
                    <p>$${product.price}</p>
                </div>
                <div class="cart-product-subtotal">
                    <small>Subtotal</small>
                    <p>$${product.price * product.quantity}</p>
                </div>
                <button class="cart-product-delete" id="${product.id}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></button>
            `;

      cartProductsContainer.append(div);
    });

    updateDeleteButtons();
    updateTotal();
  } else {
    emptyCartContainer.classList.remove("disabled");
    cartProductsContainer.classList.add("disabled");
    cartActionsContainer.classList.add("disabled");
    cartBoughtContainer.classList.add("disabled");
  }
}

loadCartProducts();

function updateDeleteButtons() {
  deleteButtons = document.getElementsByClassName("cart-product-delete");

  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", deleteFromCart);
  }
}

function deleteFromCart(e) {
  alert("Producto eliminado del carrito");

  const buttonId = e.currentTarget.id;
  const index = cartProducts.findIndex((product) => product.id === buttonId);

  cartProducts.splice(index, 1);
  loadCartProducts();

  localStorage.setItem("cart", JSON.stringify(cartProducts));
  window.location.reload();
}

emptyButton.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
  alert("Carrito vaciado");
  cartProducts.length = 0;
  localStorage.setItem("cart", JSON.stringify(cartProducts));
  loadCartProducts();
  window.location.reload();
}

function updateTotal() {
  const totalCalc = cartProducts.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  total.innerText = `$${totalCalc}`;
}

buyButton.addEventListener("click", buyCart);
function buyCart() {
  cartProducts.length = 0;
  localStorage.setItem("cart", JSON.stringify(cartProducts));

  emptyCartContainer.classList.add("disabled");
  cartProductsContainer.classList.add("disabled");
  cartActionsContainer.classList.add("disabled");
  cartBoughtContainer.classList.remove("disabled");

  updateCartCounter();
}

const cartCounter = document.getElementById("cart-counter");

function updateCartCounter() {
  let cartProducts = localStorage.getItem("cart");
  cartProducts = JSON.parse(cartProducts);

  if (cartProducts && cartProducts.length > 0) {
    cartCounter.innerText = cartProducts.length;
  } else {
    cartCounter.innerText = 0;
  }
}

updateCartCounter();
