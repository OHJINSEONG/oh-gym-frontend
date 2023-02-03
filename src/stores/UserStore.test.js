const { default: UserStore } = require('./UserStore.js');

const context = describe;

describe('userStore', () => {
  let userStore;

  beforeEach(() => {
    userStore = new UserStore();
  });

  describe('fetchUser', () => {
    it('fetchUser', async () => {
      await userStore.fetchUser();

      expect(userStore.user.userName).toEqual('오진성');
    });
  });

  describe('register', () => {
    it('register', async () => {
      const accessToken = await userStore.register('카카오 토큰');

      expect(accessToken).toEqual('토큰');
    });
  });

  describe('kakaoLogin', () => {
    it('kakaoLogin', async () => {
      const { accessToken, kakaoAccessToken } = await userStore.kakaoLogin('카카오코드');

      expect(accessToken).toEqual('토큰');
      expect(kakaoAccessToken).toEqual('카카오 토큰');
    });
  });
});
