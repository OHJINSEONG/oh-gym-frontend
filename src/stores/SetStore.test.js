const { default: SetStore } = require('./SetStore');

const context = describe;

describe('productStore', () => {
  let setStore;

  beforeEach(() => {
    setStore = new SetStore();
  });

  describe('completeSet', () => {
    it('completeSet', async () => {
      await setStore.completeSet(1);

      expect(setStore.set.status).toEqual('COMPLETE');
    });
  });
});
