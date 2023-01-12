const { default: ProductFormStore } = require('./ProductFormStore.js');

const context = describe;

describe('productFormStore', () => {
  let productFormStore;

  beforeEach(() => {
    productFormStore = new ProductFormStore();
  });

  describe('fetchOrders', () => {
    it('fetchOrders', async () => {
      await productFormStore.selectOption([{ id: 1, price: 360000 }, { id: 2, price: 170000 }], 1);

      expect(productFormStore.selectedOption.price).toEqual(360000);
    });
  });
});
