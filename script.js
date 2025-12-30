const btn = document.querySelector("button");
const input = document.getElementById("textInput");
const container = document.querySelector(".container");
btn.addEventListener("click", localStorageTestFun);
function localStorageTestFun() {
    let inputValue = input.value;
    localStorage.setItem("all", inputValue);
    container.innerHTML = localStorage.getItem("all");
}
window.onload = () => {
    container.innerHTML = localStorage.getItem("all");
}



// Ну типа я в шоке так легко
// Но только надо еще научиться складывать несколько вещей в один ключ или хотя бы в несколько