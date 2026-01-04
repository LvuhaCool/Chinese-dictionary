let word = "hello";
const btnTrigger = document.querySelector(".add");
const inputBlock = document.querySelector(".input-block");
const addConfirmedBtn = document.querySelector(".add-confirmed");
const removeTemplateBtn = document.querySelector(".remove");
const listContainer = document.querySelector(".list-container");
btnTrigger.addEventListener("click", showInputBlockFun);
function showInputBlockFun() {
    inputBlock.classList.add("input-block-visible");
};
removeTemplateBtn.addEventListener("click", hideInputBlockFun);
function hideInputBlockFun() {
    inputBlock.classList.remove("input-block-visible");
};
addConfirmedBtn.addEventListener("click", addValueToListFun);
function addValueToListFun() {
    let HTMLCode = `<div class="input-block-element">
            <input type="text" placeholder="Введите иероглиф(ы)" class="hyierogliph">
            <input type="text" placeholder="Введите пиньинь" class="pinyin">
            <input type="text" placeholder="Введите перевод" class="translation">
            <button class="edit">Изменить</button>
        </div>`;
    listContainer.insertAdjacentHTML("beforeend", HTMLCode);
    hideInputBlockFun();
}