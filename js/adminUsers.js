let users = JSON.parse(localStorage.getItem("users")) || [];

const usersTable = document.getElementById("users-table");

loadUsers(users);

function loadUsers(users) {
  usersTable.innerHTML = `
          <tr class="head">
          <th>Nombre</th>
          <th>Email</th>
          <th>Rol</th>
          <th>Acciones</th>
        </tr>
  `;

  users.forEach((user) => {
    const tr = document.createElement("tr");
    tr.classList.add("line");
    tr.innerHTML = `
          <td class="name"><input type="text" class="input-name readonly" value="${user.name}" disabled="disabled"> </td>
          <td class="email">${user.email}</td>
          <td class="role"><input type="text" class="input-role readonly" value="${user.role}" disabled="disabled"> </td>
          <td class="actions">
            <button class="edit-user"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg></button>  
            <button class="delete-user"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></button>
          </td>`;

    usersTable.append(tr);
  });

  updateDeleteButtons();
  updateEditButtons();
}

function updateDeleteButtons() {
  deleteButtons = document.getElementsByClassName("delete-user");

  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", deleteUser);
  }
}

function deleteUser(e) {
  const email =
    e.currentTarget.parentElement.parentElement.children[1].innerHTML;

  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      users.splice(i, 1);
      localStorage.setItem("users", JSON.stringify(users));
      loadUsers(users);
      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser.email === email) {
        localStorage.removeItem("currentUser");
        window.location.href = "login.html";
      }
      alert("Usuario eliminado correctamente.");
      break;
    }
  }
}

function updateEditButtons() {
  editButtons = document.getElementsByClassName("edit-user");

  for (let i = 0; i < editButtons.length; i++) {
    editButtons[i].addEventListener("click", editUser);
  }
}

function editUser(e) {
  const name =
    e.currentTarget.parentElement.parentElement.children[0].children[0];
  const email =
    e.currentTarget.parentElement.parentElement.children[1].innerHTML;
  const role =
    e.currentTarget.parentElement.parentElement.children[2].children[0];

  if (name.classList.contains("readonly")) {
    name.classList.remove("readonly");
    role.classList.remove("readonly");
    name.disabled = false;
    role.disabled = false;
  } else {
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        console.log("found");
        users[i].name = name.value;
        users[i].role = role.value;
        localStorage.setItem("users", JSON.stringify(users));
        console.log(users);
        loadUsers(users);
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser.email === email) {
          currentUser.name = name.value;
          currentUser.role = role.value;
          localStorage.setItem("currentUser", JSON.stringify(currentUser));
        }
        alert("Usuario modificado correctamente.");
        break;
      }
    }
    name.classList.add("readonly");
    name.disabled = true;
    role.classList.add("readonly");
    role.disabled = true;
  }
}
