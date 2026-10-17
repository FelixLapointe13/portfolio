import Swiper from 'swiper/bundle';

export default class Carousel {
  constructor(element) {
    this.element = element;

    this.options = {
      slidesPerView: 1,
      spaceBetween: 100,
      loop: true,

      pagination: {
        el: this.element.querySelector('.swiper-pagination'),
        clickable: true,
      },
    };

    this.init();
  }

  init() {
    this.swiper = new Swiper(this.element, this.options);
  }
}
