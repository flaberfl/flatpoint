import Swiper from 'swiper';
import {
	Navigation,
	EffectFade,
	Autoplay,
	Pagination
} from 'swiper/modules';
/*
Основные модули слайдера:
Navigation, Pagination, Autoplay,
EffectFade, Lazy, Manipulation
*/

//Стили Swiper
//Базовые стили
import "../../scss/base/swiper.scss";
//Полный набор стилей с scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
//Полный набор стилей с node_modules
// import 'swiper/css';

//Инициализация слайдеров
function initSliders() {
	//Список слайдеров
	//Проверяем, есть ли слайдер на странице

	if (document.querySelector('.activities__slider')) { //Указываем класс нужного слайдера
		//Создаем слайдер
		new Swiper('.activities__slider', { //Указываем класс нужного слайдера
			//Подключаем модули слайдера
			//для конкретного случая
			observer: true,
			observeParents: true,
			slidesPerView: 4,
			spaceBetween: 0,
			// lazy: true,


			// slidesPerView: 1, // Показываем 3 слайда
			// slidesPerGroup: 1,

			// loopAdditionalSlides: 3,
			autoHeight: true,
			speed: 800,

			// // Брейкпоинты
			breakpoints: {
				0: {
					slidesPerView: 1,

				},
				320: {
					slidesPerView: 1.5,

				},
				480: {
					slidesPerView: 2,

				},
				600: {
					slidesPerView: 2.5,

				},

				768: {

					slidesPerView: 3,
				},
				992: {
					slidesPerView: 3.5,
				},

				1366: {
					slidesPerView: 4,
				},

				1920: {
					slidesPerView: 4,
				},
			},

			// События
			on: {

			}
		});
	}

	if (document.querySelector('.reviews__slider')) { //Указываем класс нужного слайдера
		//Создаем слайдер
		new Swiper('.reviews__slider', { //Указываем класс нужного слайдера

			modules: [Navigation],
			observer: true,
			observeParents: true,
			slidesPerView: 2,
			spaceBetween: 10,
			autoHeight: 'true',

			// slidesPerView: 1, // Показываем 3 слайда
			// slidesPerGroup: 1,

			// loopAdditionalSlides: 3,
			// lazy: true,
			autoHeight: true,
			speed: 800,

			navigation: {
				prevEl: '.swiper-button-prev',
				nextEl: '.swiper-button-next',
			},

			// // Брейкпоинты
			breakpoints: {
				0: {
					slidesPerView: 1,

				},
				320: {
					slidesPerView: 1,

				},
				480: {
					slidesPerView: 1.5,

				},
				620: {
					slidesPerView: 2,

				},

				768: {

					slidesPerView: 2,
				},
				992: {
					slidesPerView: 2,
				},

				1366: {
					slidesPerView: 2,
				},

				1920: {
					slidesPerView: 2,
				},
			},

			// События
			on: {

			}
		});
	}

}


window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	//Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});



// function updatePaginationVisibility() {
// 	const slidesPerView = 3;
// 	const totalSlides = this.slides.length;
// 	const groupsCount = Math.ceil(totalSlides / slidesPerView);

// 	const bullets = this.pagination.bullets;

// 	// Скрываем/показываем точки
// 	bullets.forEach((bullet, index) => {
// 		if (index % slidesPerView === 0 && index < groupsCount * slidesPerView) {
// 			bullet.style.display = 'inline-block';
// 			bullet.classList.add('visible-bullet');
// 		} else {
// 			bullet.style.display = 'none';
// 			bullet.classList.remove('visible-bullet');
// 		}

// 		// Убираем активный класс у всех
// 		bullet.classList.remove('swiper-pagination-bullet-active');
// 	});

// 	// Находим индекс активной "группы" по текущему слайду
// 	const currentIndex = this.activeIndex;
// 	const currentGroupIndex = Math.floor(currentIndex / slidesPerView);

// 	// Находим все **видимые** точки
// 	const visibleBullets = Array.from(bullets).filter(bullet => bullet.classList.contains('visible-bullet'));

// 	// Находим нужную **видимую** точку по индексу группы
// 	const activeVisibleBullet = visibleBullets[currentGroupIndex];

// 	if (activeVisibleBullet) {
// 		activeVisibleBullet.classList.add('swiper-pagination-bullet-active');
// 	}
// }