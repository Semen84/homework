document.addEventListener("DOMContentLoaded", function () {
  //                                                                 Логика бургера
  const burger = document.querySelector(".burger");
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".modal-overlay");
  const closeBtn = document.querySelector(".modal__close");
  const body = document.body;

  burger.addEventListener("click", () => {
    modal.classList.add("active");
    overlay.style.display = "block";
    body.classList.add("modal-open");
    burger.classList.add("active");
  });

  function closeModal() {
    modal.classList.remove("active");
    overlay.style.display = "none";
    body.classList.remove("modal-open");
    burger.classList.remove("active");
  }

  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);
  document.addEventListener(
    "keydown",
    (e) => e.key === "Escape" && closeModal()
  );

 burger.style.position = "absolute"; // Устанавливаем position: absolute
  burger.style.top = "65px"; // Позиционируем сверху
  burger.style.right = "5%"; // Позиционируем справа
  burger.style.left = "auto"; // Сбрасываем left

  //                                                                Логика слайдеров
  const sliders = {};
  let activeHallId = null;

  // Инициализация слайдера для конкретного зала
  function initSlider(hallId) {
    const sliderContainer = document.querySelector(
      `.hall-slider[data-hall="${hallId}"]`
    );
    if (!sliderContainer || sliders[hallId]) return;

    const mainSlider = sliderContainer.querySelector(".main-slider");
    const thumbsSlider = sliderContainer.querySelector(".thumbs-slider");

    // Инициализация миниатюр
    const thumbs = new Swiper(thumbsSlider, {
      slidesPerView: "auto",
      spaceBetween: 0,
      freeMode: true,
      watchSlidesProgress: true,
      breakpoints: {
        320: { slidesPerView: 5 },
        768: { slidesPerView: 5 },
        1024: { slidesPerView: 5 },
      },
    });

    // Инициализация основного слайдера
    sliders[hallId] = new Swiper(mainSlider, {
      effect: "slide",
      navigation: {
        nextEl: ".slider-next",
        prevEl: ".slider-prev",
      },
      thumbs: {
        swiper: thumbs,
      },
      on: {
        init: function () {
          updatePagination(this);
        },
        slideChange: function () {
          updatePagination(this);
        },
      },
    });
  }

  // Обработка переключения табов
  document.querySelectorAll(".hall-tab").forEach((tab) => {
    tab.addEventListener("click", function (e) {
      e.preventDefault();
      const hallId = this.dataset.hall;

      // Пропускаем если уже активен
      if (activeHallId === hallId) return;

      // Обновляем активный таб
      document
        .querySelectorAll(".hall-tab")
        .forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      // Скрываем все слайдеры
      document.querySelectorAll(".hall-slider").forEach((s) => {
        s.style.display = "none";
      });

      // Показываем текущий слайдер
      const currentSlider = document.querySelector(
        `.hall-slider[data-hall="${hallId}"]`
      );
      currentSlider.style.display = "block";

      // Инициализируем слайдер если еще не инициализирован
      if (!sliders[hallId]) {
        initSlider(hallId);
      }

      // Обновляем слайдер
      setTimeout(() => {
        sliders[hallId].update();
        sliders[hallId].slideTo(0);
        updateHallInfo(this);
        activeHallId = hallId;
      }, 50);
    });
  });

  // Обновление информации о зале
  function updateHallInfo(tab) {
    document.querySelector(
      ".capacity-info_quantity span"
    ).textContent = `№ ${tab.dataset.number}`;
    document.querySelector(
      ".capacity-info_quadrature span"
    ).innerHTML = `${tab.dataset.square} м<sup>2</sup>`;
    document.querySelector(
      ".capacity-info_capacity span"
    ).textContent = `до ${tab.dataset.capacity}-ти человек`;
  }

  // Обновление пагинации
  function updatePagination(swiper) {
    document.querySelector(".current-slide").textContent =
      swiper.activeIndex + 1;
    document.querySelector(".total-slides").textContent = swiper.slides.length;
  }

  // Инициализация первого слайдера
  const firstTab = document.querySelector(".hall-tab.active");
  if (firstTab) {
    const firstHallId = firstTab.dataset.hall;
    initSlider(firstHallId);
    activeHallId = firstHallId;
    updateHallInfo(firstTab);
  }

  // Функция для перемещения слайдеров под hall-tabs при уменьшении экрана
  function moveSliders() {
    const mediaQuery = window.matchMedia("(max-width: 1300px)");
    document.querySelectorAll(".hall-slider").forEach((slider) => {
      const hallTabs = slider
        .closest(".slider-container_1")
        ?.querySelector(".hall-tabs");
      const sliderContainer = slider.closest(".slider-container_1");

      if (mediaQuery.matches) {
        // Перемещаем слайдер после hall-tabs
        if (hallTabs && sliderContainer) {
          hallTabs.parentNode.insertBefore(slider, hallTabs.nextElementSibling);
        }
      } else {
        // Возвращаем слайдер в исходный контейнер
        if (sliderContainer) {
          sliderContainer.insertBefore(
            slider,
            sliderContainer.querySelector(".halls-info")?.nextSibling
          );
        }
      }
    });
  }

  // Вызов при загрузке
  moveSliders();

  // Вызов при изменении размера экрана
  window.addEventListener("resize", moveSliders);

  // Вызов при переключении залов
  document.querySelectorAll(".hall-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      moveSliders();
    });
  });
});

//                                                                          advantages-slider
// Инициализация слайдера бронирования
document.addEventListener("DOMContentLoaded", function () {
  const bookingSlider = new Swiper(".booking-main-slider", {
    loop: true,
    loopAdditionalSlides: 1,
    slidesPerView: 5,
    spaceBetween: 15,
    initialSlide: 2,
    centeredSlides: true,
    navigation: {
      nextEl: ".booking-slider-next",
      prevEl: ".booking-slider-prev",
    },

    breakpoints: {
      // При ширине экрана ≤ 1880px
      1880: {
        slidesPerView: 5,
        spaceBetween: 10,
      },
      1500: {
        slidesPerView: 5,
        spaceBetween: 8,
      },
      // При ширине экрана ≤ 1300px
      1100: {
        slidesPerView: 4,
        spaceBetween: 8,
      },
      // При мобильных устройствах
      950: {
        slidesPerView: 3.5,
        spaceBetween: 4,
      },
      900: {
        slidesPerView: 3.5,
        spaceBetween: 2,
      },

      770: {
        slidesPerView: 3,
        spaceBetween: 2,
      },
      650: {
        slidesPerView: 2.5,
        spaceBetween: 2,
      },
      550: {
        slidesPerView: 2,
        spaceBetween: 0,
      },
      480: {
        slidesPerView: 1.8,
        spaceBetween: 0,
      },
      420: {
        slidesPerView: 1.5,
        spaceBetween: 0,
      },
      370: {
        slidesPerView: 1.3,
        spaceBetween: 0,
      },
      310: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
    },

    on: {
      init: function (swiper) {
        updateBookingPagination(swiper);
        updateSlideNumber(swiper);
      },
      slideChange: function (swiper) {
        updateBookingPagination(swiper);
        updateSlideNumber(swiper);
      },
      click: function (swiper) {
        if (swiper.clickedSlide) {
          const clickedSlideIndex = swiper.clickedSlide.getAttribute(
            "data-swiper-slide-index"
          );
          if (clickedSlideIndex !== null) {
            const originalIndex = parseInt(clickedSlideIndex);
            swiper.slideToLoop(originalIndex, 300, false);
          }
        }
      },
    },
  });

  function updateBookingPagination(swiper) {
    const realIndex = swiper.realIndex + 1;
    document.querySelector(".booking-current-slide").textContent = realIndex;
    document.querySelector(".booking-total-slides").textContent =
      swiper.slides.length;
  }

  function updateSlideNumber(swiper) {
    document
      .querySelectorAll(".slide-number")
      .forEach((el) => (el.style.display = "none"));
    const activeSlide = swiper.slides[swiper.activeIndex];
    if (activeSlide && activeSlide.querySelector(".slide-number")) {
      const originalIndex = parseInt(activeSlide.dataset.swiperSlideIndex);
      activeSlide.querySelector(".slide-number").textContent =
        originalIndex + 1;
    }

    document.querySelectorAll(".swiper-slide").forEach((slide) => {
      slide.classList.remove("swiper-slide-prev-custom");
    });

    const prevSlide = swiper.slides[swiper.activeIndex - 1];
    if (prevSlide) {
      prevSlide.classList.add("swiper-slide-prev-custom");
    }
  }

  const controls = document.querySelector(".booking-slider-controls");
  const originalParent = controls.parentElement;
  const originalNextSibling = controls.nextElementSibling;

  // Функция для восстановления оригинальной позиции
  function restoreOriginalPosition() {
    if (originalParent && originalNextSibling) {
      originalParent.insertBefore(controls, originalNextSibling);
    } else if (originalParent) {
      originalParent.appendChild(controls); // Если нет следующего соседа
    }
  }

  // Перемещение элемента при изменении размера экрана
  function handleResize() {
    const swipercontrols = document.querySelector(".booking-slider-container");

    if (window.innerWidth <= 1000) {
      if (swipercontrols && controls) {
        // Перемещаем навигацию внутрь swiperWrapper
        swipercontrols.appendChild(controls);
      }
    } else {
      // Возвращаем навигацию на исходную позицию
      restoreOriginalPosition();
    }
  }

  // Дебаунс для оптимизации
  function debounce(func, delay) {
    let timeout;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(func, delay);
    };
  }

  // Инициализация и отслеживание изменений
  window.addEventListener("resize", debounce(handleResize, 200));
  handleResize(); // Проверка при загрузке страницы
});

//                                                                              FAQ

document.addEventListener("DOMContentLoaded", function () {
  const mediaQuery = window.matchMedia("(max-width: 1000px)");
  let isAnimating = false; // Флаг для отслеживания анимации

  function initAccordion() {
    const accordionItems = document.querySelectorAll(".accordion-item");

    accordionItems.forEach((item) => {
      const question = item.querySelector(".accordion-question");
      const answer = item.querySelector(".accordion-answer");

      // Инициализация состояний
      answer.style.maxHeight = "0";
      answer.style.overflow = "hidden";

      question.addEventListener("click", () => {
        if (isAnimating) return;
        toggleAccordion(question, answer);
      });
    });
  }

  async function toggleAccordion(clickedQuestion, clickedAnswer) {
    isAnimating = true;

    if (clickedQuestion.classList.contains("active")) {
      await closeAccordion(clickedQuestion, clickedAnswer);
    } else {
      await closeAllOthers(clickedQuestion.parentNode);
      await openAccordion(clickedQuestion, clickedAnswer);
    }

    isAnimating = false;
  }

  function openAccordion(question, answer) {
    return new Promise((resolve) => {
      question.classList.add("active");

      // Рассчитываем полную высоту
      const contentHeight = answer.scrollHeight;

      // Сбрасываем стили перед анимацией
      answer.style.maxHeight = "0";
      answer.style.opacity = "0";
      answer.style.transform = "translateY(20px)";
      answer.style.overflow = "hidden";

      let startTime = null;
      const duration = 500;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);

        const ease = easeOutCubic(percentage);
        const height = ease * contentHeight;
        const opacity = ease;
        const translateY = 20 * (1 - ease);

        answer.style.maxHeight = `${height}px`;
        answer.style.opacity = `${opacity}`;
        answer.style.transform = `translateY(${translateY}px)`;

        if (percentage < 1) {
          requestAnimationFrame(animate);
        } else {
          answer.style.maxHeight = "none";
          answer.style.opacity = "1";
          answer.style.transform = "none";
          answer.style.overflow = "visible";
          resolve();

          if (mediaQuery.matches) updateFaqBackground();
        }
      };

      requestAnimationFrame(animate);
    });
  }

  function closeAccordion(question, answer) {
    return new Promise((resolve) => {
      const startHeight = answer.scrollHeight;
      question.classList.remove("active");

      let startTime = null;
      const duration = 400;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);

        // Плавная кривая анимации для закрытия
        const ease = 1 - easeOutCubic(percentage);
        const height = ease * startHeight;

        answer.style.maxHeight = `${height}px`;

        if (percentage < 1) {
          requestAnimationFrame(animate);
        } else {
          answer.style.maxHeight = "0";
          answer.style.overflow = "hidden";
          resolve();

          // Обновляем фон после анимации
          if (mediaQuery.matches) updateFaqBackground();
        }
      };

      requestAnimationFrame(animate);
    });
  }

  async function closeAllOthers(container) {
    const activeQuestions = container.parentNode.querySelectorAll(
      ".accordion-question.active"
    );
    const promises = [];

    activeQuestions.forEach((question) => {
      if (!container.contains(question)) {
        const answer = question.nextElementSibling;
        promises.push(closeAccordion(question, answer));
      }
    });

    await Promise.all(promises);
  }

  // Функция для плавной анимации
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function updateFaqBackground() {
    const activeQuestion = document.querySelector(".accordion-question.active");
    if (!activeQuestion) return;

    const faqContainer = document.querySelector(".faq-container");
    const answer = activeQuestion.nextElementSibling;

    const shiftValue = Math.min(
      activeQuestion.offsetTop + answer.offsetHeight / 2,
      window.innerHeight - 200
    );

    faqContainer.style.setProperty("--shift", `${shiftValue}px`);
  }

  // Инициализация и обработчики
  initAccordion();
  window.addEventListener("resize", () => {
    if (mediaQuery.matches) updateFaqBackground();
  });
});

/*==========Плавная прокрутка к якорю===========*/
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: "smooth",
      });
    }
  });
});