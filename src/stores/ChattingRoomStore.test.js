const { default: ChattingRoomStore } = require('./ChattingRoomStore');

describe('chattingRoomStore', () => {
  let chattingRoomStore;

  beforeEach(() => {
    chattingRoomStore = new ChattingRoomStore();
  });

  describe('create', () => {
    it('create', async () => {
      await chattingRoomStore.create(1);

      expect(chattingRoomStore.chattingRoom.userName).toEqual('오진성');
    });
  });
});
