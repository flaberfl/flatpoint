// Подключение функционала "Чертоги Фрилансера"
import {
  isMobile
} from "./functions.js";
// Подключение списка активных модулей
import {
  flsModules
} from "./modules.js";
window.addEventListener("load", function () {
  document.body.classList.remove("load");
});


// Проверяем наличие элемента .header

const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 40) {
      header.classList.add('_fixed');
    } else {
      header.classList.remove('_fixed');
    }
  });
}


// function rearrangeSlidesForMobile() {
//   // Проверяем, находимся ли мы на главной странице (по классу 'main' у body)
//   if (!document.body.classList.contains('main')) {
//     // Если класс 'main' отсутствует, прекращаем выполнение функции
//     return;
//   }

//   const mobileList = document.querySelector('.mobile-list');

//   // Проверяем ширину экрана
//   if (window.innerWidth <= 767) {
//     // Очищаем мобильный список
//     mobileList.innerHTML = '';

//     // Находим .swiper-slide только из нужных слайдеров
//     const allSlides = document.querySelectorAll(
//       '.reviews__slider1 .swiper-slide, .reviews__slider2 .swiper-slide, .reviews__slider3 .swiper-slide'
//     );

//     // Клонируем каждый слайд и добавляем в мобильный список
//     allSlides.forEach(slide => {
//       const clonedSlide = slide.cloneNode(true);
//       mobileList.appendChild(clonedSlide);
//     });
//   } else {
//     // Опционально: если ширина > 767px, можно очистить mobileList или вернуть слайды обратно
//     // В зависимости от желаемого поведения
//     // mobileList.innerHTML = '';
//   }
// }

// // Запускаем при загрузке
// document.addEventListener('DOMContentLoaded', rearrangeSlidesForMobile);

// // И при изменении размера окна
// window.addEventListener('resize', rearrangeSlidesForMobile);


document.addEventListener('DOMContentLoaded', function () {


  if (window.innerWidth <= 767) {
    return; // Прекращаем выполнение, если ширина 767px или меньше
  }

  function initMarquee(selector, options = {}) {
    const {
      speed = 0.5,
        reverse = false,
        pauseOnHover = true
    } = options;

    const container = document.querySelector(selector);
    if (!container) return;

    const wrapper = container.querySelector('.reviews__wrapper1, .reviews__wrapper2, .reviews__wrapper3');
    const slides = wrapper.querySelectorAll('.reviews__slide1, .reviews__slide2, .reviews__slide3');

    // Клонируем слайды для бесконечной прокрутки
    slides.forEach(slide => {
      const clone = slide.cloneNode(true);
      wrapper.appendChild(clone);
    });

    // Устанавливаем начальные стили
    wrapper.style.display = 'flex';
    wrapper.style.whiteSpace = 'nowrap';
    wrapper.style.transition = 'none';

    // Получаем ширину оригинального контента (не клонированного)
    const originalContentWidth = wrapper.scrollWidth / 2;
    let position = reverse ? -originalContentWidth : 0; // Начальная позиция для обратного направления
    let animationId;
    let isPaused = false;

    function animate() {
      if (isPaused) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      if (reverse) {
        // Движение справа налево (увеличиваем позицию)
        position += speed;
        if (position >= 0) {
          position = -originalContentWidth;
        }
      } else {
        // Движение слева направо (уменьшаем позицию)
        position -= speed;
        if (position <= -originalContentWidth) {
          position = 0;
        }
      }

      wrapper.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    }

    // Запускаем анимацию
    animate();

    // Опционально: пауза при наведении
    if (pauseOnHover) {
      container.addEventListener('mouseenter', () => {
        isPaused = true;
      });

      container.addEventListener('mouseleave', () => {
        isPaused = false;
      });
    }
  }

  // Инициализация бегущих строк
  initMarquee('.reviews__slider1', {
    speed: 0.5,
    reverse: false
  });

  initMarquee('.reviews__slider2', {
    speed: 0.5,
    reverse: true // Движение справа налево
  });

  initMarquee('.reviews__slider3', {
    speed: 0.5,
    reverse: false
  });



});