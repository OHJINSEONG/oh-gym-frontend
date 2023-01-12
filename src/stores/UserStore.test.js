const { default: UserStore } = require('./UserStore.js');

const context = describe;

describe('userStore', () => {
  let userStore;

  beforeEach(() => {
    userStore = new UserStore();
  });

  describe('find', () => {
    it('find', async () => {
      await userStore.find(1);

      expect(userStore.user.name).toEqual('오진성');
    });
  });
});
