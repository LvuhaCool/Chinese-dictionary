// Переменные
const mainTag = document.querySelector("main.main")
const modalWindow = document.querySelector(".modal-window__container");
const modalWindowSubmitBtn = document.querySelector(".modal-window__submit-btn");
const modalWindowContentContainer = document.querySelector(".modal-window__content");
const hyierogliph = document.querySelector(".hyierogliph");
const pinyin = document.querySelector(".pinyin");
const translation = document.querySelector(".translation");
const inputsArray = [hyierogliph, pinyin, translation];
const btnTrigger = document.querySelector(".add");
const inputBlock = document.querySelector(".input-block");
const addConfirmedBtn = document.querySelector(".add-confirmed");
const removeTemplateBtn = document.querySelector(".remove");
const listContainer = document.querySelector(".list-container");
// Показать макет заполнения
btnTrigger.addEventListener("click", showInputBlockFun);
function showInputBlockFun() {
    inputsArray.forEach(element => {
        element.value = "";
    });
    inputBlock.classList.add("input-block-visible");
};
// Скрыть макет заполнения
removeTemplateBtn.addEventListener("click", hideInputBlockFun);
function hideInputBlockFun() {
    inputBlock.classList.remove("input-block-visible");
};
// Добавить слово в список
addConfirmedBtn.addEventListener("click", addValueToListFun);
function addValueToListFun() {
    let hyierogliphValue = hyierogliph.value;
    let pinyinValue = pinyin.value;
    let translationValue = translation.value;
    let HTMLCode = `<div class="input-block-element">
            <input type="text" placeholder="Введите иероглиф(ы)" class="hyierogliph" value="${hyierogliphValue}" disabled>
            <input type="text" placeholder="Введите пиньинь" class="pinyin" value="${pinyinValue}" disabled>
            <input type="text" placeholder="Введите перевод" class="translation" value="${translationValue}" disabled>
            <button class="edit">Изменить</button>
        </div>`;
    inputsArray.forEach(element => {
        if (element.value == "") {
            // Вызов функции кастомного модального окна
            ShowModalWindowFun("Заполни все поля пж");
        }
        else {
            listContainer.insertAdjacentHTML("beforeend", HTMLCode);
            hideInputBlockFun();
        }
    });
}
// Показ модального окна
function ShowModalWindowFun(content) {
    modalWindow.classList.add("modal-window__container_visible");
    modalWindowContentContainer.textContent = content;
}
// Функция, прячущая модальное окно
modalWindowSubmitBtn.addEventListener("click", HideModalWindowFun)
function HideModalWindowFun() {
    modalWindow.classList.remove("modal-window__container_visible");
}