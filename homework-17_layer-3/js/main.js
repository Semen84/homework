(function () {
  document.addEventListener("click", burgerInit);

  function burgerInit(e) {
    const burgerIcon = e.target.closest(".burger-icon");
    const burgerNavLink = e.target.closest(".nav__link");

    if (!burgerIcon && !burgerNavLink) return;
    if (document.documentElement.clientWidth > 900) return;

    if (!document.body.classList.contains("body--opened-menu")) {
      document.body.classList.add("body--opened-menu");
    } else {
      document.body.classList.remove("body--opened-menu");
    }
  }
})();




// Модальное окно
const modal = document.querySelector('.modal');
const openModalButton = document.querySelector('.about__img-button');
const closeModalButton = document.querySelector('.modal__cancel');

// Функции управления модалкой
function openModal() {
  document.body.classList.add('body--opened-modal');
}

function closeModal() {
  document.body.classList.remove('body--opened-modal');
}

// Открытие по клику на кнопку
openModalButton.addEventListener('click', (e) => {
  e.preventDefault();
  openModal();
});

// Закрытие по клику на крестик
closeModalButton.addEventListener('click', (e) => {
  e.preventDefault();
  closeModal();
});

// Закрытие по клику вне модалки
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Закрытие по ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.body.classList.contains('body--opened-modal')) {
    closeModal();
  }
});