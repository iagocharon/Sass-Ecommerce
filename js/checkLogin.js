const register = document.getElementById("register-button");
const login = document.getElementById("login-button");
const logout = document.getElementById("logout-button");
const username = document.getElementById("user-name");
const cart = document.getElementById("cart");
const adminUsers = document.getElementById("admin-users");
const adminProducts = document.getElementById("admin-products");

if (localStorage.getItem("currentUser")) {
  username.innerHTML = JSON.parse(localStorage.getItem("currentUser")).name;
  register.style.display = "none";
  login.style.display = "none";
  if (!localStorage.getItem("currentUser").role === "admin") {
    adminUsers.style.display = "none";
    adminProducts.style.display = "none";
  }
} else {
  logout.style.display = "none";
  username.style.display = "none";
  cart.style.display = "none";
  adminUsers.style.display = "none";
  adminProducts.style.display = "none";
}

logout.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
});
