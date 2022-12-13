import { apiService } from '../services/ApiService';
import Store from './Store';

export default class ProductStore extends Store {
  constructor() {
    super();
    this.products = [];
    this.productImformation = {};
  }

  async fetchProducts() {
    const products = await apiService.fetchProducts();

    this.products = products;

    this.publish();
  }

  async findProduct(productId) {
    const productImformation = await apiService.findProduct(productId);

    this.productImformation = productImformation;

    this.publish();
  }
}

export const productStore = new ProductStore();
