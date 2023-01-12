import Store from './Store';

export default class ProductFormStore extends Store {
  constructor() {
    super();
    this.selectedOption = {};
  }

  selectOption(options, selectedOptionId) {
    this.selectedOption = options.find((e) => e.id === Number(selectedOptionId));

    this.publish();
  }
}

export const productFormStore = new ProductFormStore();
