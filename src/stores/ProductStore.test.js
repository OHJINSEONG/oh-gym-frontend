const { default: ProductStore } = require('./ProductStore.js');

const context = describe;

describe('productStore', () => {
  let productStore;

  beforeEach(() => {
    productStore = new ProductStore();
  });

  describe('fetchProducts', () => {
    it('fetchProducts', async () => {
      await productStore.fetchProducts();

      expect(productStore.products.length).toEqual(2);
    });
  });

  // describe('findProduct', () => {
  //   it('findProduct', async () => {
  //     await productStore.findProduct(1);

  //     expect(productStore.product.title).toEqual('이용권');
  //   });
  // });
});
