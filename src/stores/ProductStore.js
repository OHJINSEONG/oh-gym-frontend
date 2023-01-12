import { apiService } from '../services/ApiService';
import Store from './Store';

export default class ProductStore extends Store {
  constructor() {
    super();
    this.products = [];
    this.productInformation = {};
  }

  async fetchProducts() {
    const products = await apiService.fetchProducts();

    this.products = products;

    this.publish();
  }

  async findProduct(productId) {
    const productInformation = await apiService.findProduct(productId);

    this.productInformation = productInformation;

    this.publish();
  }
}

export const productStore = new ProductStore();
