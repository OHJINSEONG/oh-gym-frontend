const { default: MessageStore } = require('./MessageStore');

const context = describe;

describe('messageStore', () => {
  let messageStore;

  beforeEach(() => {
    messageStore = new MessageStore();
  });

  describe('sendRequest', () => {
    it('sendRequest', async () => {
      await messageStore.sendRequest({
        senderId: 1,
        receiverId: 1,
        type: 'requestPt',
        context: '2022-12-25',
        senderName: '오진욱',
      });

      expect(messageStore.request.message).toEqual('오진욱님 2022년 12월 25일 9시에 피티 등록 요청.');
    });
  });
});
