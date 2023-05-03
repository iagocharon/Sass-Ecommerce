import { User } from "./user.js";
const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (isUser(e.target.email.value)) {
    alert("Ya hay un usuario registrado con ese mail.");
    return;
  } else {
    let userList = JSON.parse(localStorage.getItem("users")) || [];
    let newUser = new User(
      e.target.name.value,
      e.target.email.value,
      e.target.password.value,
      "user"
    );
    userList.push(newUser);
    localStorage.setItem("users", JSON.stringify(userList));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    alert("Usuario registrado correctamente.");
    window.location.href = "index.html";
  }
});

function isUser(email) {
  let userList = JSON.parse(localStorage.getItem("users")) || [];

  for (let i = 0; i < userList.length; i++) {
    if (userList[i].email === email) {
      return true;
    }
  }
  return false;
}

function registerAdmin(user) {
  let userList = JSON.parse(localStorage.getItem("users")) || [];
  userList.push(user);
  localStorage.setItem("users", JSON.stringify(userList));
}

//comentar lo de abajo una vez usado
let admin = new User("admin", "admin@admin.com", "admin", "admin");
registerAdmin(admin);
