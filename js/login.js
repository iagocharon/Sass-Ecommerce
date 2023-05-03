import { User } from "./user.js";
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let user = new User("", e.target.email.value, e.target.password.value, "");

  if (login(user) === 0) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    alert("Bienvenido");
    window.location.href = "index.html";
  } else if (login(user) === 1) {
    alert("Contraseña incorrecta");
  } else {
    alert("El usuario no existe");
  }
});

function login(user) {
  let userList = JSON.parse(localStorage.getItem("users")) || [];

  for (let i = 0; i < userList.length; i++) {
    if (userList[i].email === user.email) {
      if (userList[i].password === user.password) {
        user.name = userList[i].name;
        user.role = userList[i].role;
        return 0;
      } else return 1;
    }
  }
  return 2;
}
