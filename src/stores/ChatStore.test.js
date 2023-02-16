const { default: ChatStore } = require('./ChatStore');

describe('chatStore', () => {
  let chatStore;

  beforeEach(() => {
    chatStore = new ChatStore();
  });

  describe('setChats', () => {
    it('setChats', async () => {
      const chatmessages = [{ id: 1, writer: '오진성', time: '2023-01-02' }];

      await chatStore.setChats(chatmessages, '오진성');

      expect(chatStore.chats[0].user).toEqual('myChat');
    });
  });

  describe('compareTime', () => {
    it('compareTime', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(chatStore.compareTime(
        new Date('2023-01-02T11:12:02'),
        new Date('2023-01-02T11:12:12'),
      )).toBeTruthy;
    });
  });

  describe('setKoTime', () => {
    it('am', async () => {
      const koTime = await chatStore.setKoTime(new Date('2023-01-02T11:12:02'));

      expect(koTime).toEqual('오전 11:12');
    });

    it('pm', async () => {
      const koTime = await chatStore.setKoTime(new Date('2023-01-02T14:12:02'));

      expect(koTime).toEqual('오후 2:12');
    });
  });
});
