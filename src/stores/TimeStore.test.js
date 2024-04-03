const { default: TimeStore } = require('./TimeStore');

const context = describe;

describe('timeStore', () => {
  let timeStore;

  beforeEach(() => {
    timeStore = new TimeStore();
  });

  describe('tick', () => {
    it('tick', async () => {
      expect(timeStore.time).toEqual(0);

      await timeStore.tick();

      expect(timeStore.time).toEqual(1);
      expect(timeStore.seconds).toEqual('01');
    });
  });

  describe('start', () => {
    it('start', async () => {
      await timeStore.start();

      expect(timeStore.status).toEqual('start');
    });
  });

  describe('pause', () => {
    it('pause', async () => {
      await timeStore.pause();

      expect(timeStore.status).toEqual('pause');
    });
  });

  describe('stop', () => {
    it('stop', async () => {
      await timeStore.tick();
      await timeStore.stop();

      expect(timeStore.status).toEqual('stop');
      expect(timeStore.time).toEqual(0);
    });
  });

  describe('setTick', () => {
    it('setTick', async () => {
      expect(timeStore.setTime).toEqual(5);

      await timeStore.setTick();

      expect(timeStore.setTime).toEqual(4);
    });
  });

  describe('setStart', () => {
    it('setStart', async () => {
      await timeStore.setStart();

      expect(timeStore.setTimerStatus).toEqual('start');
    });
  });

  describe('setTimeReset', () => {
    it('setTimeReset', async () => {
      await timeStore.setTimeReset();

      expect(timeStore.setTime).toEqual(60);
      expect(timeStore.setTimerStatus).toEqual('stop');
    });
  });
});
