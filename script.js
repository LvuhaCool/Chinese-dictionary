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
const btnClearAll = document.querySelector(".clear-list");
const inputBlock = document.querySelector(".input-block");
const addConfirmedBtn = document.querySelector(".add-confirmed");
const removeTemplateBtn = document.querySelector(".remove");
const listContainer = document.querySelector(".list-container");
// Показ даты при загрузке страницы
document.addEventListener("DOMContentLoaded", showAllFirst);
function showAllFirst() {
    let storedData = localStorage.getItem("objects");
    dataShowFirstArr = JSON.parse(storedData);
    dataShowFirstArr.forEach(element => {
        listContainer.insertAdjacentHTML("beforeend", `<div class="input-block-element">
            <input type="text" placeholder="Введите иероглиф(ы)" class="hyierogliph" value="${element.chinese}" disabled>
            <input type="text" placeholder="Введите пиньинь" class="pinyin" value="${element.pinyin}" disabled>
            <input type="text" placeholder="Введите перевод" class="translation" value="${element.russian}" disabled>
            <button class="edit">Изменить</button>
        </div>`);
    })
}
// Вся дата
let data = [];
// Очистить лист с задачами
// Показать макет заполнения
btnTrigger.addEventListener("click", showInputBlockFun);
function showInputBlockFun() {
    inputsArray.forEach(element => {
        element.value = "";
    });
    inputBlock.classList.add("input-block-visible");
};
btnClearAll.addEventListener("click", clearAll);
function clearAll() {
    if (localStorage.length > 0) {
        if (confirm("Это уберет все элементы. Точно хочешь все удалить?")) {
        localStorage.clear();
        window.location.reload();
        };
    }
    else {
        alert("Чел, у тебя ничего нет, тут нечего удалять!");
    };
};
// Скрыть макет заполнения
removeTemplateBtn.addEventListener("click", hideInputBlockFun);
function hideInputBlockFun() {
    inputBlock.classList.remove("input-block-visible");
    hideModalWindowFun();
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
    if (inputsArray[0].value == "" || inputsArray[1].value == "" || inputsArray[2].value == "") {
        // Вызов функции кастомного модального окна
        ShowModalWindowFun("Заполни все поля пж");
    }
    else {
        listContainer.insertAdjacentHTML("beforeend", HTMLCode);
        hideInputBlockFun();
        hideModalWindowFun();
        data.push({
            id: data.length,
            chinese: hyierogliphValue,
            pinyin: pinyinValue,
            russian: translationValue,
        });
        localStorage.setItem("objects", JSON.stringify(data));
        console.log(localStorage);
    };
}
// Показ модального окна
function ShowModalWindowFun(content) {
    modalWindow.classList.add("modal-window__container_visible");
    modalWindowContentContainer.textContent = content;
}
// Функция, прячущая модальное окно
modalWindowSubmitBtn.addEventListener("click", hideModalWindowFun)
function hideModalWindowFun() {
    modalWindow.classList.remove("modal-window__container_visible");
};