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

      expect(orderStore.orders.length).toEqual(1);
    });
  });

  describe('create', () => {
    it('create', async () => {
      const kakaoUrl = await orderStore.create({
        productId: 1,
      });

      expect(kakaoUrl).toEqual('카카오');
    });
  });

  describe('findOrder', () => {
    it('findOrder', async () => {
      await orderStore.findOrder(1);

      expect(orderStore.order.productId).toEqual(1);
    });
  });

  describe('fetchPayResult', () => {
    it('fetchPayResult', async () => {
      await orderStore.fetchPayResult('토큰');

      expect(orderStore.paymentResult.item_name).toEqual('PT');
      expect(orderStore.paymentResult.amount.total).toEqual(100000);
    });
  });
});
