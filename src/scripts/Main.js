import ComponentFactory from './ComponentFactory.js';
import Icons from './utils/Icons.js';

class Main {
  constructor() {
    this.init();
  }

  init() {
    document.documentElement.classList.add('has-js');

    Icons.load();

    // Allez ajouter vos composantes
    new ComponentFactory();
  }
}
new Main();
