const { default: MessageStore } = require('./MessageStore');

const context = describe;

describe('MessageStore', () => {
  let messageStore;

  beforeEach(() => {
    messageStore = new MessageStore();
  });

  describe('fetchTrainerLectures', () => {
    it('fetchTrainerLectures', async () => {
      const requestData = {
        senderId: 1,
        receiverId: 1,
        type: 'requestPt',
        context: '2022-12-11T11:00',
        senderName: '오진성',
      };

      await messageStore.sendRequest(requestData);

      expect(messageStore.request.message).toEqual('오진성님 2022년 12월 11일 11시에 피티 등록 요청.');
      expect(messageStore.request.status).toEqual('CREATED');
    });
  });
});
