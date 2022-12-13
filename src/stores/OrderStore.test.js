const { default: OrderStore } = require('./OrderStore.js');

const context = describe;

describe('orderStore', () => {
  let orderStore;

  beforeEach(() => {
    orderStore = new OrderStore();
  });

  describe('fetchOrders', () => {
    it('fetchOrders', async () => {
      await orderStore.fetchOrders();

      // expect(orderStore.orders.length).toEqual(2);
    });
  });

  describe('create', () => {
    it('create', async () => {
      await orderStore.create(1);

      expect(orderStore.order.productId).toEqual(1);
    });
  });

  describe('findOrder', () => {
    it('findOrder', async () => {
      await orderStore.findOrder(1);

      expect(orderStore.order.productId).toEqual(1);
    });
  });
});
