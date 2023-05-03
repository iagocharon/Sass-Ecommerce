const inputs = document.getElementsByTagName("input");
const formGrups = document.getElementsByClassName("form-group");

for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("focus", function () {
    formGrups[i].classList.add("active");
  });
  inputs[i].addEventListener("focusout", function () {
    if (inputs[i].value == "") {
      formGrups[i].classList.remove("active");
    }
  });
}
