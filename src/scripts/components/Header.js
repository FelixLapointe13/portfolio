export default class Header {
  constructor(element) {
    this.element = element;
    this.options = {};
    this.html = document.documentElement;
    this.init();
    this.initNavMobile();
  }

  init() {
    this.setOptions();
  }

  setOptions() {}

  initNavMobile() {
    const toggle = this.element.querySelector('.js-toggle');
    toggle.addEventListener('click', this.onToggleNav.bind(this));
  }

  onToggleNav() {
    document.documentElement.classList.toggle('nav-is-active');
  }
}
