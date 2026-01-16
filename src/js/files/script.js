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

// document.addEventListener('DOMContentLoaded', () => {
//     // Находим все строки
//     const rows = document.querySelectorAll('.row');

//     rows.forEach(row => {
//         // Клонируем элементы, чтобы создать бесконечный эффект
//         const originalBlocks = Array.from(row.children);
//         const clones = originalBlocks.map(block => block.cloneNode(true));

//         // Добавляем клонированные блоки в конец
//         clones.forEach(clone => row.appendChild(clone));

//         // Определяем направление движения
//         const isLeft = row.classList.contains('row--left');
//         let offset = 0;

//         // Функция анимации
//         function animate() {
//             if (isLeft) {
//                 offset -= 0.5; // Двигаем влево
//             } else {
//                 offset += 0.5; // Двигаем вправо
//             }

//             // Применяем трансформацию
//             row.style.transform = `translateX(${offset}px)`;

//             // Если первый элемент ушел за пределы экрана — перемещаем его в конец
//             const containerWidth = row.parentElement.offsetWidth;
//             const totalWidth = row.scrollWidth / 2; // Половина от общей ширины (т.к. дублируем)

//             if (isLeft && offset < -totalWidth) {
//                 offset = 0;
//             } else if (!isLeft && offset > totalWidth) {
//                 offset = 0;
//             }

//             requestAnimationFrame(animate);
//         }

//         animate(); // Запускаем анимацию
//     });
// });


// document.addEventListener('DOMContentLoaded', () => {
//   const rows = document.querySelectorAll('.row');

//   rows.forEach(row => {
//     // Клонируем оригинальные блоки
//     const originalBlocks = Array.from(row.children);
//     const clones = originalBlocks.map(block => block.cloneNode(true));

//     // Добавляем клонированные блоки в конец
//     clones.forEach(clone => row.appendChild(clone));

//     // Направление
//     const isLeft = row.classList.contains('row--left');
//     let offset = 0;

//     // Ширина одного блока
//     const blockWidth = originalBlocks[0].offsetWidth;

//     function animate() {
//       if (isLeft) {
//         offset -= 0.5; // Влево
//       } else {
//         offset += 0.5; // Вправо
//       }

//       row.style.transform = `translateX(${offset}px)`;

//       if (isLeft) {
//         // Если первый ушёл — в конец
//         if (offset <= -blockWidth) {
//           const first = row.firstElementChild;
//           row.appendChild(first);
//           offset = 0;
//         }
//       } else {
//         // Для правого ряда — перемещаем **первый из клонов** в конец
//         if (offset >= blockWidth) {
//           // Находим первый элемент, который является клоном (начиная с originalBlocks.length)
//           const cloneStartIndex = originalBlocks.length;
//           const firstClone = row.children[cloneStartIndex];

//           // Перемещаем его в конец
//           row.appendChild(firstClone);

//           // Сбрасываем сдвиг
//           offset = 0;
//         }
//       }

//       requestAnimationFrame(animate);
//     }

//     animate();
//   });
// });




function rearrangeSlidesForMobile() {
  // Проверяем, находимся ли мы на главной странице (по классу 'main' у body)
  if (!document.body.classList.contains('main')) {
    // Если класс 'main' отсутствует, прекращаем выполнение функции
    return;
  }

  const mobileList = document.querySelector('.mobile-list');

  // Проверяем ширину экрана
  if (window.innerWidth <= 767) {
    // Очищаем мобильный список
    mobileList.innerHTML = '';

    // Находим .swiper-slide только из нужных слайдеров
    const allSlides = document.querySelectorAll(
      '.reviews__slider1 .swiper-slide, .reviews__slider2 .swiper-slide, .reviews__slider3 .swiper-slide'
    );

    // Клонируем каждый слайд и добавляем в мобильный список
    allSlides.forEach(slide => {
      const clonedSlide = slide.cloneNode(true);
      mobileList.appendChild(clonedSlide);
    });
  } else {
    // Опционально: если ширина > 767px, можно очистить mobileList или вернуть слайды обратно
    // В зависимости от желаемого поведения
    // mobileList.innerHTML = '';
  }
}

// Запускаем при загрузке
document.addEventListener('DOMContentLoaded', rearrangeSlidesForMobile);

// И при изменении размера окна
window.addEventListener('resize', rearrangeSlidesForMobile);


document.addEventListener('DOMContentLoaded', function () {
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
    reverse: true   // Движение справа налево
  });

  initMarquee('.reviews__slider3', {
    speed: 0.5,
    reverse: false
  });



});


// document.addEventListener('DOMContentLoaded', function () {
//   const items = document.querySelectorAll('.values__item');

//   if (items.length === 0) return;

//   let ticking = false;

//   // Функция для обновления позиций элементов при скролле
//   function updateItemsPosition() {
//     const scrollTop = window.pageYOffset;
//     const windowHeight = window.innerHeight;

//     items.forEach((item, index) => {
//       const rect = item.getBoundingClientRect();
//       const itemTop = rect.top + scrollTop;
//       const itemBottom = rect.bottom + scrollTop;

//       // Рассчитываем положение элемента относительно области просмотра
//       const elementCenter = (itemTop + itemBottom) / 2;
//       const viewportCenter = scrollTop + windowHeight / 2;

//       // Расстояние от центра элемента до центра экрана
//       const distance = elementCenter - viewportCenter;
//       const normalizedDistance = Math.abs(distance) / (windowHeight / 2);

//       // Определяем, насколько элемент близок к центру экрана (0 - в центре, 1 - на краю)
//       const visibility = Math.max(0, 1 - normalizedDistance);

//       // Рассчитываем масштаб и смещение
//       const scale = 0.7 + (visibility * 0.3); // От 0.7 до 1.0
//       const translateY = -distance * 0.1; // Небольшое смещение по Y

//       // Рассчитываем z-index в зависимости от близости к центру
//       const zIndex = 100 - Math.abs(index * 10 - Math.floor(visibility * 100));

//       // Применяем стили
//       item.style.transform = `scale(${scale}) translateY(${translateY}px)`;
//       item.style.zIndex = zIndex.toString();
//       item.style.opacity = String(0.6 + (visibility * 0.4));

//       // Добавляем класс активности для центрального элемента
//       if (visibility > 0.8) {
//         item.classList.add('values__item--active');
//       } else {
//         item.classList.remove('values__item--active');
//       }
//     });

//     ticking = false;
//   }

//   function requestTick() {
//     if (!ticking) {
//       requestAnimationFrame(updateItemsPosition);
//       ticking = true;
//     }
//   }

//   // Добавляем обработчик скролла
//   window.addEventListener('scroll', requestTick);

//   // Также добавляем обработчик resize для перерасчета при изменении размера окна
//   window.addEventListener('resize', requestTick);

//   // Вызываем сразу для начальной позиции
//   updateItemsPosition();
// });