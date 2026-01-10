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





function positionTextOnPolaroid(imgId, textId) {
    console.log(`[CanvasLog] Инициализация для ${imgId} и ${textId}`);

    const img = document.getElementById(imgId);
    const text = document.getElementById(textId);

    if (!img) {
        console.error(`[CanvasLog] Изображение с ID ${imgId} не найдено`);
        return;
    }

    if (!text) {
        console.error(`[CanvasLog] Текст с ID ${textId} не найден`);
        return;
    }

    // Проверяем, загружено ли изображение
    if (img.complete && img.naturalWidth !== 0) {
        console.log(`[CanvasLog] Изображение ${imgId} уже загружено. Запускаем анализ.`);
        analyzeImageAndPositionText(img, text);
    } else {
        img.addEventListener('load', () => {
            console.log(`[CanvasLog] Изображение ${imgId} загружено. Размеры: ${img.naturalWidth}x${img.naturalHeight}`);
            analyzeImageAndPositionText(img, text);
        });

        img.addEventListener('error', () => {
            console.error(`[CanvasLog] Ошибка загрузки изображения ${imgId}`);
        });
    }
}

function analyzeImageAndPositionText(img, text) {
    console.log(`[CanvasLog] Запуск анализа изображения: ${img.src}`);

    // Создаем canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        console.error('[CanvasLog] Не удалось получить 2D контекст canvas');
        return;
    }

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    console.log(`[CanvasLog] Canvas создан: ${canvas.width}x${canvas.height}`);

    // Рисуем изображение
    ctx.drawImage(img, 0, 0);
    console.log('[CanvasLog] Изображение нарисовано на canvas');

    // Получаем данные пикселей
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    console.log('[CanvasLog] Данные пикселей получены');

    // Ищем границу между изображением и белой рамкой
    let whiteLineY = -1;
    const scanHeight = 100; // Сканируем 100 пикселей снизу
    const threshold = 210; // Уменьшили порог — подходит для #e0e0e0
    const tolerancePercent = 0.8; // Проверяем 80% пикселей в строке

    console.log(`[CanvasLog] Сканируем последние ${scanHeight} пикселей по высоте. Порог: ${threshold}, допуск: ${tolerancePercent * 100}%`);

    // Сканируем снизу вверх
    for (let y = canvas.height - 1; y >= canvas.height - scanHeight; y--) {
        let lightPixelsCount = 0;
        const pixelsToCheck = Math.floor(canvas.width * tolerancePercent);
        const startX = Math.floor((canvas.width - pixelsToCheck) / 2); // Центральная часть строки

        for (let x = startX; x < startX + pixelsToCheck; x++) {
            const index = (y * canvas.width + x) * 4;
            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];

            // Проверяем, светлый ли пиксель
            if (r >= threshold && g >= threshold && b >= threshold) {
                lightPixelsCount++;
            }
        }

        // Проверяем, сколько % светлых пикселей
        const lightPixelRatio = lightPixelsCount / pixelsToCheck;

        if (lightPixelRatio >= tolerancePercent) {
            whiteLineY = y;
            console.log(`[CanvasLog] Найдена светлая строка на Y=${y}. Светлых пикселей: ${(lightPixelRatio * 100).toFixed(1)}%`);
            break;
        }
    }

    // Если нашли — позиционируем текст
    if (whiteLineY !== -1) {
        const textHeight = 20;
        const bottomOffset = 10;

        const newBottom = canvas.height - whiteLineY + bottomOffset;

        text.style.bottom = `${newBottom}px`;
        text.style.left = '10px';

        console.log(`[CanvasLog] Текст позиционирован: bottom=${newBottom}px, left=10px`);
    } else {
        console.warn(`[CanvasLog] Светлая строка не найдена для ${img.src}. Используем fallback.`);

        // Fallback
        text.style.bottom = '20px';
        text.style.left = '10px';
    }
}

// Инициализация для всех карточек
document.addEventListener('DOMContentLoaded', () => {
    console.log('[CanvasLog] DOM загружен. Ищем карточки...');

    document.querySelectorAll('.activities__item').forEach((item, index) => {
        const img = item.querySelector('img');
        const text = item.querySelector('.activities__value');

        if (img && text) {
            // Генерируем уникальные ID, если их нет
            if (!img.id) img.id = `img-${index}`;
            if (!text.id) text.id = `text-${index}`;

            console.log(`[CanvasLog] Найдена карточка ${index}: img=${img.id}, text=${text.id}`);

            positionTextOnPolaroid(img.id, text.id);
        } else {
            console.warn(`[CanvasLog] Карточка ${index} не содержит img или text`);
        }
    });
});