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


  // Tutorial - https://codyhouse.co/tutorials/how-stacking-cards
(function () {
  var StackCards = function (element) {
    this.element = element;
    this.items = this.element.getElementsByClassName('js-stack-cards__item');
    this.scrollingFn = false;
    this.scrolling = false;
    initStackCardsEffect(this);
    // initStackCardsResize(this); // <-- УБРАТЬ ЭТУ СТРОКУ
  };

  function initStackCardsEffect(element) {
    setStackCards(element);
    var observer = new IntersectionObserver(stackCardsCallback.bind(element), {
      threshold: [0, 1]
    });
    observer.observe(element.element);
  };

  // function initStackCardsResize(element) { ... } // <-- УБРАТЬ ЭТУ ФУНКЦИЮ

  function stackCardsCallback(entries) {
    if (entries[0].isIntersecting) {
      if (this.scrollingFn) return;
      stackCardsInitEvent(this);
    } else {
      if (!this.scrollingFn) return;
      window.removeEventListener('scroll', this.scrollingFn);
      this.scrollingFn = false;
    }
  };

  function stackCardsInitEvent(element) {
    element.scrollingFn = stackCardsScrolling.bind(element);
    window.addEventListener('scroll', element.scrollingFn);
  };

  function stackCardsScrolling() {
    if (this.scrolling) return;
    this.scrolling = true;
    window.requestAnimationFrame(animateStackCards.bind(this));
  };

  function setStackCards(element) {
    element.marginY = getComputedStyle(element.element).getPropertyValue('--stack-cards-gap');
    getIntegerFromProperty(element);
    element.elementHeight = element.element.offsetHeight;
    var cardStyle = getComputedStyle(element.items[0]);
    element.cardTop = Math.floor(parseFloat(cardStyle.getPropertyValue('top')));
    element.cardHeight = Math.floor(parseFloat(cardStyle.getPropertyValue('height')));
    element.windowHeight = window.innerHeight;

    if (isNaN(element.marginY)) {
      element.element.style.paddingBottom = '0px';
    } else {
      element.element.style.paddingBottom = (element.marginY * (element.items.length - 1)) + 'px';
    }

    for (var i = 0; i < element.items.length; i++) {
      if (isNaN(element.marginY)) {
        element.items[i].style.transform = 'none;';
      } else {
        element.items[i].style.transform = 'translateY(' + element.marginY * i + 'px)';
      }
    }
  };

  function getIntegerFromProperty(element) {
    var node = document.createElement('div');
    node.setAttribute('style', 'opacity:0; visbility: hidden;position: absolute; height:' + element.marginY);
    element.element.appendChild(node);
    element.marginY = parseInt(getComputedStyle(node).getPropertyValue('height'));
    element.element.removeChild(node);
  };

  function animateStackCards() {
    if (isNaN(this.marginY)) {
      this.scrolling = false;
      return;
    }

    var top = this.element.getBoundingClientRect().top;

    if (this.cardTop - top + this.element.windowHeight - this.elementHeight - this.cardHeight + this.marginY + this.marginY * this.items.length > 0) {
      this.scrolling = false;
      return;
    }

    for (var i = 0; i < this.items.length; i++) {
      var scrolling = this.cardTop - top - i * (this.cardHeight + this.marginY);
      if (scrolling > 0) {
        var scaling = i == this.items.length - 1 ? 1 : (this.cardHeight - scrolling * 0.08) / this.cardHeight;
        this.items[i].style.transform = 'translateY(' + this.marginY * i + 'px) scale(' + scaling + ')';
        // this.items[i].style.transform = 'translateY';
      } else {
        this.items[i].style.transform = 'translateY(' + this.marginY * i + 'px)';
      }
    }

    this.scrolling = false;
  };

  var stackCards = document.getElementsByClassName('js-stack-cards'),
    intersectionObserverSupported = ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype),
    reducedMotion = false; // Util.osHasReducedMotion(); // <-- ЗАМЕНЯЕМ НА false, ТАК КАК UTIL УДАЛЕН

  if (stackCards.length > 0 && intersectionObserverSupported && !reducedMotion) {
    var stackCardsArray = [];
    for (var i = 0; i < stackCards.length; i++) {
      (function (i) {
        stackCardsArray.push(new StackCards(stackCards[i]));
      })(i);
    }

    // УДАЛЯЕМ КОД С РЕЗАЙЗОМ
  }
}());



});