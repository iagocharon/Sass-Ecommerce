let products = JSON.parse(localStorage.getItem("products"));

const productsContainer = document.getElementById("product-container");
const mainTitle = document.getElementById("main-name");
let addButtons = document.getElementsByClassName("add-product");
const cartCounter = document.getElementById("cart-counter");

//Descomentar esto para cargar los productos en el archivo productData.json por primera vez, despues descomentarlo ya que queda en localstorage.
//PS: Es recomendado cargar imagenes cuadradas (mismo ancho que alto) para la mejor visualizacion de los productos.
// fetch("./productData.json")
//   .then((response) => response.json())
//   .then((data) => {
//     products = data;
//     loadProducts(products);
//   });

loadProducts(products);

function loadProducts(chosenProducts) {
  console.log(chosenProducts);
  productsContainer.innerHTML = "";

  chosenProducts.forEach((product) => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
            <img class="product-image" src="${product.image}" alt="${product.name}">
            <div class="product-details">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="bottom-wrapper">                
                    <p class="product-price">$${product.price}</p>
                    <button class="add-product" id="${product.id}">Agregar</button>
                </div>
            </div>
        `;

    productsContainer.append(div);
  });

  updateAddButtons();
}

function updateAddButtons() {
  addButtons = document.getElementsByClassName("add-product");

  for (let i = 0; i < addButtons.length; i++) {
    addButtons[i].addEventListener("click", addToCart);
  }
}

let cartProducts;

let cartProductsLS = localStorage.getItem("cart");

if (cartProductsLS) {
  cartProducts = JSON.parse(cartProductsLS);
  updateCounter();
} else {
  cartProducts = [];
}

function addToCart(e) {
  if (localStorage.getItem("currentUser") != null) {
    alert("Producto agregado al carrito");

    const buttonId = parseInt(e.currentTarget.id);
    let addedProduct;
    for (let i = 0; i < products.length; i++) {
      if (products[i].id == buttonId) {
        addedProduct = products[i];
      }
    }

    if (cartProducts.some((product) => product.id === buttonId)) {
      const index = cartProducts.findIndex(
        (product) => product.id === buttonId
      );
      cartProducts[index].quantity++;
    } else {
      addedProduct.quantity = 1;
      cartProducts.push(addedProduct);
    }

    updateCounter();

    localStorage.setItem("cart", JSON.stringify(cartProducts));
  } else alert("Debe iniciar sesión para agregar productos al carrito");
}

function updateCounter() {
  let newCounter = cartProducts.reduce(
    (acc, product) => acc + product.quantity,
    0
  );
  cartCounter.innerText = newCounter;
}

const search = document.getElementById("search");

search.addEventListener("keyup", (e) => {
  products = JSON.parse(localStorage.getItem("products"));
  if (e.target.value != "") {
    products = products.filter((product) => {
      console.log(product.name + " " + e.target.value);
      if (product.name.toLowerCase().includes(e.target.value.toLowerCase())) {
        return product;
      }
    });
  }
  loadProducts(products);
});
