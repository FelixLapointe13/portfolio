import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import { ScrollSmoother } from 'gsap/ScrollSmoother.js';

export default class Scroller {
  constructor(element) {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    this.options = {
      hasSkew: false,
      hasPinItems: false,
    };
    this.element = element;
    this.setOptions();
    this.init();
  }

  init() {
    const scroller = ScrollSmoother.create({
      smooth: 2,
      effects: true,
      smoothTouch: 0.1,
      onUpdate: this.onUpdateScroll.bind(this),
      onStop: this.onStopScroll.bind(this),
      ease: 'expo.out',
    });
  }

  //SKEW CONTROLS
  onUpdateScroll(self) {
    if (this.options.hasSkew) this.updateSkew(self);
  }

  onStopScroll(self) {
    if (this.options.hasSkew) this.stopSkew(self);
  }

  initSkew() {
    this.skewSetter = gsap.quickTo('img', 'skewY');
  }

  updateSkew(self) {
    const velocity = self.getVelocity();
    const force = 10;
    let skew = gsap.utils.mapRange(-1000, 1000, -force, force, velocity);
    skew = gsap.utils.clamp(-force, force, skew);
    this.skewSetter(skew);
  }

  stopSkew() {
    this.skewSetter(0);
  }

  // PIN CONTROLS
  initPins() {
    const pinnedItems = this.element.querySelectorAll('.js-pinned');
    for (let i = 0; i < pinnedItems.length; i++) {
      const pinnedItem = pinnedItems[i];

      ScrollTrigger.create({
        pin: pinnedItem,
        trigger: pinnedItem.parentElement,
        start: 'center center',
        end: '80% center',
      });
    }
  }

  // SECTION HORIZONTAL
  initHoriz() {
    const section = this.element.querySelector('.scroll__horizontal');
    const track = this.element.querySelector('.js-horiz');
    const panels = track.querySelectorAll('.js-panel');
    const nbPanels = panels.length - 1;

    // Distance totale à parcourir horizontalement (en px)
    const getDistance = () => track.scrollWidth - section.clientWidth;

    gsap.to(track, {
      x: () => -getDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => '+=' + getDistance(),
        invalidateOnRefresh: true, // recalcule au resize (important pour le responsive)
        anticipatePin: 1,
        snap: nbPanels > 0 ? 1 / nbPanels : false,
      },
    });
  }

  setOptions() {
    if ('skew' in this.element.dataset) {
      this.options.hasSkew = true;
      this.initSkew();
    }
    if ('pinItems' in this.element.dataset) {
      this.options.hasPinItems = true;
      this.initPins();
    }
    if (this.element.querySelector('.js-horiz')) {
      this.initHoriz();
    }
  }
}
