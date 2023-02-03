const { default: OrderFormStore } = require('./OrderFormStore.js');

const context = describe;

describe('orderFormStore', () => {
  let orderFormStore;

  beforeEach(() => {
    orderFormStore = new OrderFormStore();
  });

  describe('onChangeName', () => {
    it('onChangeName', async () => {
      expect(orderFormStore.name).toEqual('');

      orderFormStore.onChangeName('오진성');

      expect(orderFormStore.name).toEqual('오진성');
    });
  });

  describe('onChangeAge', () => {
    it('onChangeAge', async () => {
      expect(orderFormStore.age).toEqual('');

      orderFormStore.onChangeAge('20');

      expect(orderFormStore.age).toEqual('20');
    });
  });

  describe('onChangeBirthDate', () => {
    it('onChangeBirthDate', async () => {
      expect(orderFormStore.birthDate).toEqual('');

      orderFormStore.onChangeBirthDate('950828');

      expect(orderFormStore.birthDate).toEqual('950828');
    });
  });

  describe('onChangePhoneNumber', () => {
    it('onChangePhoneNumber', async () => {
      expect(orderFormStore.phoneNumber).toEqual('');

      orderFormStore.onChangePhoneNumber('010-5239-8955');

      expect(orderFormStore.phoneNumber).toEqual('010-5239-8955');
    });
  });
});
