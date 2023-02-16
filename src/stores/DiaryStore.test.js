const { default: DiaryStore } = require('./DiaryStore');

const context = describe;

describe('diaryStore', () => {
  let diaryStore;

  beforeEach(() => {
    diaryStore = new DiaryStore();
  });

  describe('fetchDiarys', () => {
    it('fetchDiarys', async () => {
      await diaryStore.fetchDiarys();

      expect(diaryStore.diarys[0].diary.date).toEqual('2023-01-02');
    });
  });

  describe('findDiary', () => {
    it('findDiary', async () => {
      await diaryStore.findDiary('2022-12-25');

      expect(diaryStore.diary.diary.date).toEqual('2022-12-25');
    });
  });

  describe('findById', () => {
    it('findById', async () => {
      await diaryStore.findById(1);

      expect(diaryStore.diary.diary.date).toEqual('2023-01-02');
    });
  });

  describe('complete', () => {
    it('complete', async () => {
      await diaryStore.complete(1, { memo: '오운완', time: '00:30:00' });

      expect(diaryStore.diary.diary.status).toEqual('COMPLETE');
      expect(diaryStore.diary.diary.memo).toEqual('오운완');
      expect(diaryStore.diary.diary.time).toEqual('00:30:00');
    });
  });

  describe('create', () => {
    it('create', async () => {
      await diaryStore.create('2022-12-25');

      expect(diaryStore.diary.diary.date).toEqual('2022-12-25');
    });
  });
});
