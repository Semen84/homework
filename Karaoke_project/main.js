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
  document.querySelectorAll('.hall-slider').forEach(sliderEl => {
    const hallId = sliderEl.dataset.hall;
    
    const thumbs = new Swiper(sliderEl.querySelector('.thumbs-slider'), {
      slidesPerView: 5,
      freeMode: true,
      watchSlidesProgress: true,
      observer: true,
      observeParents: true,
      breakpoints: {
        320: { slidesPerView: 3 },
        1300: { slidesPerView: 4 },
        1500: { slidesPerView: 5 }
      }
    });

    sliders[hallId] = new Swiper(sliderEl.querySelector('.main-slider'), {
      navigation: {
        nextEl: ".slider-next",
        prevEl: ".slider-prev",
      },
      thumbs: { swiper: thumbs },
      observer: true,
      observeParents: true,
      on: {
        init: function() {
          document.querySelector(".total-slides").textContent = this.slides.length;
        },
        slideChange: function() {
          document.querySelector(".current-slide").textContent = this.realIndex + 1;
        }
      }
    });
  });
};
const sliders = {}; // Хранилище экземпляров Swiper
document.addEventListener("DOMContentLoaded", initSliders);

/*=============*/

document.querySelectorAll(".hall-tab").forEach(tab => {
  tab.addEventListener('click', function() {
    // Удаляем активный класс у всех кнопок и добавляем текущей
    document.querySelectorAll('.hall-tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');

    const hallId = this.dataset.hall;
    
    // Скрываем все слайдеры
    document.querySelectorAll('.hall-slider').forEach(s => s.style.display = 'none');
    
    // Показываем выбранный слайдер
    const activeSlider = document.querySelector(`.hall-slider[data-hall="${hallId}"]`);
    activeSlider.style.display = 'block';
    
    // Обновляем информацию о зале
    document.querySelector('.capacity-info_quantity span').textContent = `№ ${hallId}`;
    document.querySelector('.capacity-info_quadrature span').innerHTML = 
      `${this.dataset.square} м<sup>2</sup>`;
    document.querySelector('.capacity-info_capacity span').textContent = 
      `до ${this.dataset.capacity}-ти человек`;
    
    // Получаем экземпляр Swiper и обновляем его
    const swiperInstance = sliders[hallId];
    swiperInstance.update();
    swiperInstance.slideTo(0); // Сбрасываем к первому слайду
    
    // Обновляем пагинацию
    document.querySelector(".total-slides").textContent = swiperInstance.slides.length;
    document.querySelector(".current-slide").textContent = swiperInstance.realIndex + 1;
    
    // Обновляем навигацию
    swiperInstance.navigation.update();
  });
});

