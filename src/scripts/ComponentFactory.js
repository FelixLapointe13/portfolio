// importer vos composantes ici
import YouTube from './components/YouTube.js';
import Carousel from './components/Carousel.js';
import Header from './components/Header.js';
import Scrolly from './components/Scrolly.js';

export default class ComponentFactory {
  constructor() {
    this.componentInstances = [];
    this.componentList = {
      // Mettez votre liste de composantes ici
      YouTube,
      Carousel,
      Header,
      Scrolly,
    };
    this.init();
  }

  init() {
    const components = document.querySelectorAll('[data-component]');

    for (let i = 0; i < components.length; i++) {
      const element = components[i];
      const componentName = element.dataset.component;

      if (this.componentList[componentName]) {
        const instance = new this.componentList[componentName](element);
        this.componentInstances.push(instance);
      } else {
        console.log(`La composante ${componentName} n'existe pas`);
      }
    }
  }
}
