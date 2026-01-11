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
  }
}

// Запускаем при загрузке
document.addEventListener('DOMContentLoaded', rearrangeSlidesForMobile);

// И при изменении размера окна
window.addEventListener('resize', rearrangeSlidesForMobile);
