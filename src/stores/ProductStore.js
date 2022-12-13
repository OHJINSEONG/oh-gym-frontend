import { apiService } from '../services/ApiService';
import Store from './Store';

export default class ProductStore extends Store {
  constructor() {
    super();
    this.products = [];
    this.product = {};
  }

  async fetchProducts() {
    const products = await apiService.fetchProducts();

    this.products = products;

    this.publish();
  }

  async findProduct(productId) {
    const product = await apiService.findProduct(productId);

    this.product = product;

    this.publish();
  }
}

export const productStore = new ProductStore();
