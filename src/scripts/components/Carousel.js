import Swiper from 'swiper/bundle';

export default class Carousel {
  constructor(element) {
    this.element = element;

    this.options = {
      slidesPerView: 1,
      spaceBetween: 50,
      loop: true,

      pagination: {
        el: this.element.querySelector('.swiper-pagination'),
        clickable: true,
      },

      navigation: {
        nextEl: this.element.querySelector('.swiper-button-next'),
        prevEl: this.element.querySelector('.swiper-button-prev'),
      },
    };

    this.init();
  }

  init() {
    this.swiper = new Swiper(this.element, this.options);
  }
}
