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





// function positionTextRelativeToImage(imgId, textId) {
//     console.log(`[PositionLog] Инициализация для ${imgId} и ${textId}`);

//     const img = document.getElementById(imgId);
//     const text = document.getElementById(textId);

//     if (!img) {
//         console.error(`[PositionLog] Изображение с ID ${imgId} не найдено`);
//         return;
//     }

//     if (!text) {
//         console.error(`[PositionLog] Текст с ID ${textId} не найден`);
//         return;
//     }

//     // Проверяем, загружено ли изображение
//     if (img.complete && img.naturalWidth !== 0) {
//         console.log(`[PositionLog] Изображение ${imgId} уже загружено. Запускаем позиционирование.`);
//         positionTextFixedToImage(img, text);
//     } else {
//         img.addEventListener('load', () => {
//             console.log(`[PositionLog] Изображение ${imgId} загружено. Запускаем позиционирование.`);
//             positionTextFixedToImage(img, text);
//         });

//         img.addEventListener('error', () => {
//             console.error(`[PositionLog] Ошибка загрузки изображения ${imgId}`);
//         });
//     }
// }

// function positionTextFixedToImage(img, text) {
//     console.log(`[PositionLog] Позиционируем текст относительно изображения: ${img.src}`);

//     // Получаем реальные координаты изображения
//     const imgRect = img.getBoundingClientRect();
//     const containerRect = img.parentElement.getBoundingClientRect();

//     console.log(`[PositionLog] Координаты изображения: top=${imgRect.top}, bottom=${imgRect.bottom}, left=${imgRect.left}, right=${imgRect.right}`);
//     console.log(`[PositionLog] Координаты контейнера: top=${containerRect.top}, bottom=${containerRect.bottom}`);

//     // Вычисляем позицию текста относительно контейнера
//     const textBottom = imgRect.bottom - containerRect.top + 210; // 15px от нижнего края изображения
//     const textLeft = imgRect.left - containerRect.left + 10; // 10px от левого края изображения

//     // Применяем стили
//     text.style.position = 'absolute';
//     text.style.bottom = `calc(100% - ${textBottom}px)`; // Относительно контейнера
//     text.style.left = `${textLeft}px`;

//     console.log(`[PositionLog] Текст позиционирован: bottom=calc(100% - ${textBottom}px), left=${textLeft}px`);

//     // Для отладки — покажем, где находится текст
//     console.log(`[PositionLog] Реальная позиция текста: top=${text.offsetTop}, left=${text.offsetLeft}`);
// }

// // Инициализация для всех карточек
// document.addEventListener('DOMContentLoaded', () => {
//     console.log('[PositionLog] DOM загружен. Ищем карточки...');

//     document.querySelectorAll('.activities__item').forEach((item, index) => {
//         const img = item.querySelector('img');
//         const text = item.querySelector('.activities__value');

//         if (img && text) {
//             // Генерируем уникальные ID, если их нет
//             if (!img.id) img.id = `img-${index}`;
//             if (!text.id) text.id = `text-${index}`;

//             console.log(`[PositionLog] Найдена карточка ${index}: img=${img.id}, text=${text.id}`);

//             positionTextRelativeToImage(img.id, text.id);
//         } else {
//             console.warn(`[PositionLog] Карточка ${index} не содержит img или text`);
//         }
//     });
// });