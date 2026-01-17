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




	// if (document.querySelector('.activities__slider')) { //Указываем класс нужного слайдера
	// 	//Создаем слайдер
	// 	const swiper = new Swiper('.activities__slider', { //Указываем класс нужного слайдера
	// 		//Подключаем модули слайдера
	// 		//для конкретного случая
	// 		observer: true,
	// 		observeParents: true,
	// 		slidesPerView: 4,
	// 		spaceBetween: 0,
	// 		// lazy: true,

	// 		freeMode: false, // Изменили на false для корректной работы isEnd/isBeginning
	// 		allowTouchMove: true,
	// 		mousewheel: {
	// 			forceToAxis: true,
	// 			releaseOnEdges: true,
	// 		},
	// 		keyboard: {
	// 			enabled: true,
	// 		},

	// 		// slidesPerView: 1, // Показываем 3 слайда
	// 		// slidesPerGroup: 1,

	// 		// loopAdditionalSlides: 3,
	// 		autoHeight: true,
	// 		speed: 800,

	// 		// // Брейкпоинты
	// 		breakpoints: {
	// 			0: {
	// 				slidesPerView: 1,
	// 			},
	// 			320: {
	// 				slidesPerView: 1.5,
	// 			},
	// 			480: {
	// 				slidesPerView: 2,
	// 			},
	// 			600: {
	// 				slidesPerView: 2.5,
	// 			},
	// 			768: {
	// 				slidesPerView: 3,
	// 			},
	// 			992: {
	// 				slidesPerView: 3.5,
	// 			},
	// 			1366: {
	// 				slidesPerView: 4,
	// 			},
	// 			1920: {
	// 				slidesPerView: 4,
	// 			},
	// 		},

	// 		// События
	// 		on: {
	// 			reachBeginning: function () {

	// 				// Когда достигли начала, разрешаем скролл страницы
	// 				document.body.style.removeProperty('overflow');
	// 			},
	// 			reachEnd: function () {
	// 				// Когда достигли конца, разрешаем скролл страницы
	// 				document.body.style.removeProperty('overflow');
	// 			},
	// 			slideChangeTransitionStart: function () {
	// 				// Блокируем скролл страницы при начале перехода слайдера
	// 				document.body.style.overflow = 'hidden';
	// 			},
	// 			slideChangeTransitionEnd: function () {
	// 				// Проверяем, достигли ли мы начала или конца
	// 				if (this.isBeginning || this.isEnd) {
	// 					// Если достигли начала или конца, разрешаем скролл страницы
	// 					document.body.style.removeProperty('overflow');
	// 				}
	// 			}
	// 		}
	// 	});

	// 	// Добавляем обработчик скролла для элемента слайдера
	// 	const sliderElement = document.querySelector('.activities__slider');
	// 	let lastScrollTime = 0;
	// 	let isSliderScrolling = false;

	// 	if (sliderElement) {
	// 		sliderElement.addEventListener('wheel', function (e) {
	// 			const now = Date.now();
	// 			if (now - lastScrollTime < 150) return; // Анти-дёргание
	// 			lastScrollTime = now;

	// 			// Проверяем, где находится слайдер
	// 			const isAtEnd = swiper.isEnd;
	// 			const isAtBeginning = swiper.isBeginning;

	// 			if ((e.deltaY > 0 && isAtEnd) || (e.deltaY < 0 && isAtBeginning)) {
	// 				// Если достигли конца/начала, позволяем скроллить страницу
	// 				// Но сначала убедимся, что мы не блокируем скролл
	// 				document.body.style.removeProperty('overflow');
	// 				isSliderScrolling = false;
	// 				return;
	// 			} else {
	// 				// Если можно скроллить слайдер, предотвращаем скролл страницы
	// 				e.preventDefault();
	// 				e.stopPropagation();

	// 				// Блокируем скролл страницы
	// 				document.body.style.overflow = 'hidden';
	// 				isSliderScrolling = true;

	// 				if (e.deltaY > 0) {
	// 					swiper.slideNext();
	// 				} else {
	// 					swiper.slidePrev();
	// 				}

	// 				// Устанавливаем таймер для разблокировки скролла страницы
	// 				setTimeout(() => {
	// 					if (isSliderScrolling && (swiper.isBeginning || swiper.isEnd)) {
	// 						document.body.style.removeProperty('overflow');
	// 						isSliderScrolling = false;
	// 					}
	// 				}, 300);
	// 			}
	// 		});
	// 	}
	// }

	if (document.querySelector('.activities__slider')) { //Указываем класс нужного слайдера
	// Проверяем ширину экрана
	const isMobile = window.innerWidth < 992;

	// Определяем параметры Swiper в зависимости от ширины
	const swiperParams = {
		//Подключаем модули слайдера
		//для конкретного случая
		observer: true,
		observeParents: true,
		slidesPerView: 4,
		spaceBetween: 0,
		// lazy: true,

		freeMode: false, // Изменили на false для корректной работы isEnd/isBeginning
		allowTouchMove: true,
		// --- УСЛОВНОЕ ВКЛЮЧЕНИЕ MOUSEWHEEL ---
		mousewheel: isMobile ? false : { // <-- Отключаем mousewheel на мобильных
			forceToAxis: true,
			releaseOnEdges: true,
		},
		// --- КОНЕЦ УСЛОВИЯ ---
		keyboard: {
			enabled: true,
		},

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

		// --- УСЛОВНАЯ ЛОГИКА СОБЫТИЙ (блокировка скролла) ---
		on: {}
	};

	// Добавляем события, влияющие на скролл страницы, ТОЛЬКО если это НЕ мобильная версия
	if (!isMobile) {
		swiperParams.on.reachBeginning = function () {
			// Когда достигли начала, разрешаем скролл страницы
			document.body.style.removeProperty('overflow');
		};
		swiperParams.on.reachEnd = function () {
			// Когда достигли конца, разрешаем скролл страницы
			document.body.style.removeProperty('overflow');
		};
		swiperParams.on.slideChangeTransitionStart = function () {
			// Блокируем скролл страницы при начале перехода слайдера
			document.body.style.overflow = 'hidden';
		};
		swiperParams.on.slideChangeTransitionEnd = function () {
			// Проверяем, достигли ли мы начала или конца
			if (this.isBeginning || this.isEnd) {
				// Если достигли начала или конца, разрешаем скролл страницы
				document.body.style.removeProperty('overflow');
			}
		};
	}
	// --- КОНЕЦ УСЛОВНОЙ ЛОГИКИ ---

	//Создаем слайдер
	const swiper = new Swiper('.activities__slider', swiperParams);

	// --- УСЛОВНОЕ ДОБАВЛЕНИЕ ОБРАБОТЧИКА WHEEL ---
	if (!isMobile) { // Только на desktop
		const sliderElement = document.querySelector('.activities__slider');
		let lastScrollTime = 0;
		let isSliderScrolling = false;

		if (sliderElement) {
			sliderElement.addEventListener('wheel', function (e) {
				const now = Date.now();
				if (now - lastScrollTime < 150) return; // Анти-дёргание
				lastScrollTime = now;

				// Проверяем, где находится слайдер
				const isAtEnd = swiper.isEnd;
				const isAtBeginning = swiper.isBeginning;

				if ((e.deltaY > 0 && isAtEnd) || (e.deltaY < 0 && isAtBeginning)) {
					// Если достигли конца/начала, позволяем скроллить страницу
					// Но сначала убедимся, что мы не блокируем скролл
					document.body.style.removeProperty('overflow');
					isSliderScrolling = false;
					return;
				} else {
					// Если можно скроллить слайдер, предотвращаем скролл страницы
					e.preventDefault();
					e.stopPropagation();

					// Блокируем скролл страницы
					document.body.style.overflow = 'hidden';
					isSliderScrolling = true;

					if (e.deltaY > 0) {
						swiper.slideNext();
					} else {
						swiper.slidePrev();
					}

					// Устанавливаем таймер для разблокировки скролла страницы
					setTimeout(() => {
						if (isSliderScrolling && (swiper.isBeginning || swiper.isEnd)) {
							document.body.style.removeProperty('overflow');
							isSliderScrolling = false;
						}
					}, 300);
				}
			});
		}
	}
	// --- КОНЕЦ УСЛОВНОГО ОБРАБОТЧИКА ---
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
			loop: true,

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
					slidesPerView: 1.2,

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


	// if (document.querySelector('.reviews__slider1')) { //Указываем класс нужного слайдера
	// 	//Создаем слайдер
	// 	new Swiper('.reviews__slider1', { //Указываем класс нужного слайдера
	// 		//Подключаем модули слайдера
	// 		//для конкретного случая
	// 		modules: [Autoplay],
	// 		observer: true,
	// 		observeParents: true,
	// 		// slidesPerView: "auto",
	// 		spaceBetween: 8,
	// 		lazy: true,
	// 		// loop: true,

	// 		autoplay: {
	// 		delay: 0,
	// 		// reverseDirection: true,
	// 		disableOnInteraction: false,
	// 	},

	// 		autoHeight: true,
	// 		speed: 11500,

	// 		// // Брейкпоинты
	// 		breakpoints: {
	// 			0: {
	// 				slidesPerView: "auto",

	// 			},

	// 			1920: {
	// 				slidesPerView: "auto",
	// 			},
	// 		},

	// 		// События
	// 		on: {

	// 		}
	// 	});
	// }
	// if (document.querySelector('.reviews__slider2')) { //Указываем класс нужного слайдера
	// 	//Создаем слайдер
	// 	new Swiper('.reviews__slider2', { //Указываем класс нужного слайдера
	// 		//Подключаем модули слайдера
	// 		//для конкретного случая
	// 		modules: [Autoplay],
	// 		observer: true,
	// 		observeParents: true,
	// 		slidesPerView: "auto",
	// 		spaceBetween: 8,
	// 		lazy: true,
	// 		// loop: true,

	// 		autoplay: {
	// 		delay: 0,
	// 		reverseDirection: true,
	// 		disableOnInteraction: false,
	// 	},

	// 		autoHeight: true,
	// 		speed: 11500,

	// 		// // Брейкпоинты
	// 		breakpoints: {
	// 			0: {
	// 				slidesPerView: "auto",

	// 			},

	// 			1920: {
	// 				slidesPerView: "auto",
	// 			},
	// 		},

	// 		// События
	// 		on: {

	// 		}
	// 	});
	// }
	// if (document.querySelector('.reviews__slider3')) { //Указываем класс нужного слайдера
	// 	//Создаем слайдер
	// 	new Swiper('.reviews__slider3', { //Указываем класс нужного слайдера
	// 		//Подключаем модули слайдера
	// 		//для конкретного случая
	// 		modules: [Autoplay],
	// 		observer: true,
	// 		observeParents: true,
	// 		// slidesPerView: "auto",
	// 		spaceBetween: 8,
	// 		lazy: true,
	// 		// loop: true,

	// 		autoplay: {
	// 		delay: 0,
	// 		// reverseDirection: true,
	// 		disableOnInteraction: false,
	// 	},

	// 		autoHeight: true,
	// 		speed: 12500,

	// 		// // Брейкпоинты
	// 		breakpoints: {
	// 			0: {
	// 				slidesPerView: "auto",

	// 			},

	// 			1920: {
	// 				slidesPerView: "auto",
	// 			},
	// 		},

	// 		// События
	// 		on: {

	// 		}
	// 	});
	// }


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