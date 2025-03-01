const btn = document.querySelector(".btn-open");
const modal = document.querySelector(".modal");
const body = document.body;

const closeModal = () => {
  modal.classList.remove("modal--open");
  body.classList.remove("body--fixed");
}; //Функция закрытия окна

const openModal = () => {
  modal.classList.add("modal--open");
  body.classList.add("body--fixed");
}; //Функция открытия окна

btn.addEventListener("click", openModal);

/*modal.addEventListener('click', ()=> {
    modal.classList.remove('modal--open')
})*/
//Теперь кликая по подложке окно закрывается, однако оно закрывается и при клике на всплывающее окно(всплытие событий). Исправим это изменив код:
/*modal.addEventListener('click', event => {
const target = event.target
if (target && target.classList.contains('modal')) {
modal.classList.remove('modal--open')
}
})*/

//Теперь реализуем закрытие окна при нажатии на крестик. Вот измененный код:
modal.addEventListener("click", (event) => {
  const target = event.target;
  if (
    (target && target.classList.contains("modal")) ||
    target.classList.contains("modal__close-btn")
  ) {
    closeModal();
  }
});
//Теперь можем добавить клавишу клавиатуры для закрытия окна:

document.addEventListener("keydown", (event) => {
  if (event.code === "Escape" && closeModal()) {
    closeModal();
  }
});

//Так как мы часто используем modal-open, лучше создадим фунцию: const closeModal = () => {
//  modal.classList.remove("modal--open");
//};
// И создадим функцию для открытия окна: const openModal = () => {
//   modal.classList.add("modal--open");
//}

//Осталось убрать scroll. Создадим класс body для body)
