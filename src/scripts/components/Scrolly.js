export default class Scrolly {
  constructor(element) {
    this.element = element;

    this.options = {
      rootMargin: '0px',
    };

    this.init();
  }

  init() {
    const observer = new IntersectionObserver(
      this.watch.bind(this),
      this.options,
    );

    const items = this.element.querySelectorAll('[data-scrolly]');
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      //console.log(item);
      observer.observe(item);
    }
  }

  watch(entries) {
    //console.log('Watch me going');
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const target = entry.target;
      //console.log(target);

      if (entry.isIntersecting) {
        //console.log('oui');
        target.classList.add('is-active');
      } else {
        //console.log('nope');
        if (!target.hasAttribute('data-no-repeat')) {
          target.classList.remove('is-active');
        }
      }
    }
  }
}
