const { default: TrainerStore } = require('./TrainerStore.js');

const context = describe;

describe('trainerStore', () => {
  let trainerStore;

  beforeEach(() => {
    trainerStore = new TrainerStore();
  });

  describe('find', () => {
    it('find', async () => {
      await trainerStore.find(1);

      expect(trainerStore.trainer.name).toEqual('오진욱');
    });
  });
});
