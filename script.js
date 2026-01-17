// Переменные
const searchInput = document.querySelector("#search-input");
const mainTag = document.querySelector("main.main");
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
    listContainer.innerHTML = "";
    data.forEach(element => {
        listContainer.insertAdjacentHTML("beforeend", `<div class="input-block-element" data-id="${element.id}">
            <input type="text" placeholder="Введите иероглиф(ы)" class="hyierogliph" value="${element.chinese}" disabled>
            <input type="text" placeholder="Введите пиньинь" class="pinyin" value="${element.pinyin}" disabled>
            <input type="text" placeholder="Введите перевод" class="translation" value="${element.russian}" disabled>
            <button class="edit" data-id="${element.id}">Изменить</button>
            <button class="save-changes">Сохранить изменения</button>
            <button class="delete-element" data-id="${element.id}">Удалить</button>
        </div>`);
    })
}
// Вся дата
let data = JSON.parse(localStorage.getItem("objects")) || [];
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
    if (data.length > 0) {
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
    let HTMLCode = `<div class="input-block-element" data-id="${data.length}">
            <input type="text" placeholder="Введите иероглиф(ы)" class="hyierogliph" value="${hyierogliphValue}" disabled>
            <input type="text" placeholder="Введите пиньинь" class="pinyin" value="${pinyinValue}" disabled>
            <input type="text" placeholder="Введите перевод" class="translation" value="${translationValue}" disabled>
            <button class="edit" data-id="${data.length}">Изменить</button>
            <button class="save-changes">Сохранить изменения</button>
            <button class="delete-element" data-id="${data.length}">Удалить</button>
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
// Изменение контента
listContainer.addEventListener("click", changeFunction);
// Слушатель событий для вызова функции удаления элемента
listContainer.addEventListener("click", deleteFunction);
function changeFunction(event) {
    const pressedBtn = event.target.closest(".edit");
    if (!pressedBtn) return;
    const pressedBtnContainer = pressedBtn.parentElement;
    const pressedBtnContainerInputs = Array.from(pressedBtnContainer.querySelectorAll("input"));
    pressedBtnContainerInputs.forEach(element => {
        if (element.hasAttribute("disabled")) {
            element.disabled = false;
        }
    })
    pressedBtnContainer.classList.add("red-border");
    const saveChangesBtn = pressedBtnContainer.querySelector(".save-changes");
    saveChangesBtn.classList.add("visible");
    saveChangesBtn.addEventListener("click", (e) => {
        e.preventDefault();
        pressedBtnContainerInputs.forEach((element) => {
            element.disabled = true;
            if (element.value == "") {
                element.value = "Ты здесь не заполнил."
            };
        })
        saveChangesBtn.classList.remove("visible");
        pressedBtnContainer.classList.remove("red-border");
        const dataId = parseInt(pressedBtnContainer.getAttribute("data-id"));
        const index = data.findIndex(item => item.id === dataId);
        if (index !== -1) {
            data[index] = {
                id: dataId,
                chinese: pressedBtnContainer.querySelector(".hyierogliph").value,
                pinyin: pressedBtnContainer.querySelector(".pinyin").value,
                russian: pressedBtnContainer.querySelector(".translation").value,
            };
        localStorage.setItem("objects", JSON.stringify(data));
        }
    });
};
function deleteFunction(event) {
    const deleteBtn = event.target.closest(".delete-element");
    if(!deleteBtn) return;
    const elementId = parseInt(deleteBtn.getAttribute("data-id"));
    const elementToDelete = deleteBtn.closest(".input-block-element");
    if (confirm("Ты хочешь удалить это слово навсегда?")) {
        elementToDelete.remove();
        const index = data.findIndex(item => item.id === elementId);
        if(index !== -1) {
            data.splice(index, 1);
            data.forEach((item, idx) => {
                item.id = idx;
            })
            localStorage.setItem("objects", JSON.stringify(data));
            showAllFirst();
        }
    }
}
// Поиск
searchInput.oninput = () => {
    const searchTerm = searchInput.value.toLowerCase();
    const elements = listContainer.querySelectorAll(".input-block-element");
    elements.forEach(element => {
        const inputs = element.querySelectorAll("input");
        let found = false;
        inputs.forEach(input => {
            if (input.value.toLowerCase().includes(searchTerm)) {
                found = true;
            }
        });
        element.style.display = found ? "flex" : "none";
    });
};