const { default: DiaryStore } = require('./DiaryStore');

const context = describe;

describe('diaryStore', () => {
  let diaryStore;

  beforeEach(() => {
    diaryStore = new DiaryStore();
  });

  describe('findDiary', () => {
    it('findDiary', async () => {
      await diaryStore.findDiary(1, '2022-12-25');

      expect(diaryStore.diary.diary.date).toEqual('2022-12-25');
    });
  });

  describe('create', () => {
    it('create', async () => {
      await diaryStore.create({ date: '2022-12-25', exerciseInformations: [] });

      expect(diaryStore.diary.diary.date).toEqual('2022-12-25');
    });
  });
});
