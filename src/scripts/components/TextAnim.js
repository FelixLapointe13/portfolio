import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText.js';

export default class TextAnim {
  constructor(element) {
    gsap.registerPlugin(SplitText);
    this.element = element;
    this.options = {
      repeat: false,
    };

    document.fonts.ready.then(this.init.bind(this));
  }

  init() {
    this.setOptions();
    this.split = SplitText.create(this.element, {
      mask: 'chars',
      type: 'chars, words',
      autoSplit: true,
    });
    this.initAnim();
    this.initObserver();
  }

  initObserver() {
    const observer = new IntersectionObserver(this.watch.bind(this), {
      rootMargin: '0px 0px 0px 0px',
    });
    observer.observe(this.element);
  }

  watch(entries, observer) {
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const target = entry.target;

      if (entry.isIntersecting) {
        this.anim(true);
        if (!this.options.repeat) {
          observer.unobserve(target);
        }
      } else {
        this.anim(false);
      }
    }
  }

  initAnim() {
    gsap.set(this.split.chars, {
      yPercent: 100,
      autoAlpha: 0,
    });
  }

  anim(isAnimIn) {
    const alpha = isAnimIn ? 1 : 0;
    const y = isAnimIn ? 0 : 100;
    gsap.to(this.split.chars, {
      duration: 0.2,
      yPercent: y,
      autoAlpha: alpha,
      delay: 0.25,
      stagger: 0.05,
      ease: 'expo.inOut',
    });
  }

  setOptions() {
    if ('repeat' in this.element.dataset) {
      this.options.repeat = true;
    }
  }
}
