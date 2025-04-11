//                       Бургер

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

//                   Модальное окно
const modal = document.querySelector(".modal");
const openModalButton = document.querySelector(".about__img-button");
const closeModalButton = document.querySelector(".modal__cancel");

// Функции управления модалкой
function openModal() {
  document.body.classList.add("body--opened-modal");
}

function closeModal() {
  document.body.classList.remove("body--opened-modal");
}

// Открытие по клику на кнопку
openModalButton.addEventListener("click", (e) => {
  e.preventDefault();
  openModal();
});

// Закрытие по клику на крестик
closeModalButton.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal();
});

// Закрытие по клику вне модалки
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Закрытие по ESC
document.addEventListener("keydown", (e) => {
  if (
    e.key === "Escape" &&
    document.body.classList.contains("body--opened-modal")
  ) {
    closeModal();
  }
});

//                  Табы

const tabControls = document.querySelector(".tab__controls");

tabControls.addEventListener("click", toggleTab);

function toggleTab(e) {
  const tabControl = e.target.closest(".tab__controls-link");

  if (!tabControl) return;
  e.preventDefault();

  if (tabControl.classList.contains("tab__controls-link--active")) return;

  // Удаляем активные классы
  document
    .querySelector(".tab__controls-link--active")
    ?.classList.remove("tab__controls-link--active");
  document
    .querySelector(".tab-content--show")
    ?.classList.remove("tab-content--show");

  // Добавляем активные классы
  const tabContentID = tabControl.getAttribute("href");
  tabControl.classList.add("tab__controls-link--active");
  document.querySelector(tabContentID).classList.add("tab-content--show");
}

//                  Аккардион

/*const accordionLists = document.querySelectorAll('.accordion-list');

accordionLists.forEach('click', (e) => {

  const accordionControl = e.target.closest('.accordion-list__control');
  if (!accordionControl) return
  const accordionItem = accordionControl.parentElement;
  const accordionContent = accordionControl.nextElementSibling;

  accordionItem.classList.toggle('accordion-list__item--opened');

if(accordionItem.classList.contains('accordion-list__item--opened')) {
  accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';} else {
    accordionContent.style.maxHeight = null;
  }
*/

/*
const accordionItems = document.querySelectorAll('.accordion-list__item');

accordionItems.forEach(item => {
  const control = item.querySelector('.accordion-list__control');
  
  control.addEventListener('click', () => {
    const content = item.querySelector('.accordion-list__content');
    const isOpened = item.classList.toggle('accordion-list__item--opened');
    
    if (isOpened) {
      content.style.maxHeight = content.scrollHeight + 'px';
    } else {
      content.style.maxHeight = null;
    }
  });
});*/

const accordionItems = document.querySelectorAll(".accordion-list__item");

accordionItems.forEach((item) => {
  const control = item.querySelector(".accordion-list__control");
  const content = item.querySelector(".accordion-list__content");

  // Инициализация первого открытого элемента
  if (item.classList.contains("accordion-list__item--opened")) {
    content.style.maxHeight = content.scrollHeight + "px";
  }

  control.addEventListener("click", () => {
    // Закрываем все аккордеоны
    accordionItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.classList.remove("accordion-list__item--opened");
        const otherContent = otherItem.querySelector(
          ".accordion-list__content"
        );
        otherContent.style.maxHeight = null;
      }
    });

    // Переключаем текущий аккордеон
    const isOpened = item.classList.toggle("accordion-list__item--opened");

    if (isOpened) {
      content.style.maxHeight = content.scrollHeight + "px";
    } else {
      content.style.maxHeight = null;
    }
  });
});

//                  Слайдер-Галерея

const swiper = new Swiper(".gallery__slider", {
  spaceBetween: 15,
  slidesPerView: 1.5,

  pagination: {
    el: ".gallery__paginations",
    type: "fraction",
  },

  navigation: {
    nextEl: ".gallery__next",
    prevEl: ".gallery__prev",
  },

  breakpoints: {
    601: {
      spaceBetween: 32,
      slidesPerView: 3,
    },
    801: {
      spaceBetween: 32,
    },
    1101: {
      slidesPerView: 4,
    },
  },
});

//                  Слайдер-Отзывы

const swiper2 = new Swiper(".testimonials__slider", {
  
  spaceBetween: 0,/*Расстояние между слайдами*/
  slidesPerView: 1,/*Количество слайдов на экране*/
  centeredSlides: true,/*Центрирует активный слайд*/

  navigation: {
    nextEl: ".testimonials__next",
    prevEl: ".testimonials__prev",
  },

  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },

  breakpoints: {
        901: {
      slidesPerView: 1.5,
    },
        1201: {
      slidesPerView: 2.1,
    },
  },





 


});


//===================Маска для телефона==================//

const telInputs = document.querySelectorAll('input[type="tel"]');
const im = new Inputmask('+7 (999) 999-99-99');
im.mask(telInputs);