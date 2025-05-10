document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelector(".burger");
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".modal-overlay");
  const closeBtn = document.querySelector(".modal__close");
  const body = document.body;

  burger.addEventListener("click", () => {
    modal.classList.add("active");
    overlay.style.display = "block";
    body.classList.add("modal-open");
    burger.classList.add("active"); // Скрываем бургер
  });

  function closeModal() {
    modal.classList.remove("active");
    overlay.style.display = "none";
    body.classList.remove("modal-open");
    burger.classList.remove("active"); // Показываем бургер
  }

  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});

/*==============Swiper=============*/

const initSliders = () => {
  const thumbsSlider = new Swiper(".thumbs-slider", {
    direction: 'horizontal',
    spaceBetween: 0,
    slidesPerView: 5,
    freeMode: {
      enabled: true,
      sticky: true,
      momentumBounce: false
    },
    watchSlidesProgress: true,
    slideToClickedSlide: true,
    centeredSlides: false,
    /*breakpoints: {
      320: {
        slidesPerView: 3,
        spaceBetween: 10
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 15
      },
      1200: {
        slidesPerView: 5,
        spaceBetween: 20
      }
    }*/
  });

  const mainSlider = new Swiper(".main-slider", {
    loop: false,
    spaceBetween: 0,
    observer: true,
    observeParents: true,
    navigation: {
      nextEl: ".slider-next",
      prevEl: ".slider-prev",
    },
    thumbs: {
      swiper: thumbsSlider,
    },
    on: {
      init: function() {
        document.querySelector(".total-slides").textContent = this.slides.length;
        thumbsSlider.update();
      },
      slideChange: function() {
        document.querySelector(".current-slide").textContent = this.realIndex + 1;
        
        // Автоматическая прокрутка миниатюр
        if(thumbsSlider && !thumbsSlider.destroyed) {
          const activeIndex = this.realIndex;
          const numThumbs = thumbsSlider.params.slidesPerView;
          const centerOffset = Math.floor(numThumbs/2);
          
          thumbsSlider.slideTo(
            Math.max(0, activeIndex - centerOffset),
            500
          );
        }
      }
    }
  });


  
  // Включение drag-прокрутки для миниатюр
  let isDragging = false;
  thumbsSlider.el.addEventListener('mousedown', () => isDragging = true);
  thumbsSlider.el.addEventListener('mousemove', () => isDragging && thumbsSlider.update());
  thumbsSlider.el.addEventListener('mouseup', () => isDragging = false);

  // Адаптация при ресайзе
  window.addEventListener('resize', () => {
    thumbsSlider.update();
    mainSlider.update();
    mainSlider.slideTo(mainSlider.activeIndex);
  });
};

document.addEventListener("DOMContentLoaded", initSliders);

/*=============*/

document.querySelectorAll(".hall-tab").forEach((tab) => {
  tab.addEventListener("click", function () {
    // Удаляем активный класс у всех вкладок
    document
      .querySelectorAll(".hall-tab")
      .forEach((t) => t.classList.remove("active"));

    // Добавляем активный класс текущей вкладке
    this.classList.add("active");

    // Здесь можно добавить логику загрузки данных для выбранного зала
    const hallNumber = this.textContent.replace("Hall №", "");
    loadHallData(hallNumber);
  });
});

document.addEventListener("DOMContentLoaded", function() {
  console.log('DOM loaded. Main slider exists:', !!document.querySelector('.main-slider'));
  initSliders();
});