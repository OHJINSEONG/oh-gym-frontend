const { default: LectureStore } = require('./LectureStore');

const context = describe;

describe('lectureStore', () => {
  let lectureStore;

  beforeEach(() => {
    lectureStore = new LectureStore();
  });

  describe('fetchLectures', () => {
    it('fetchLectures', async () => {
      await lectureStore.fetchLectures();

      expect(lectureStore.lectures.length).toEqual(2);
    });
  });

  describe('register', () => {
    it('register', async () => {
      await lectureStore.register({ trainer: '오진욱' }, { id: 1 });

      expect(lectureStore.lectures.length).toEqual(2);
      expect(lectureStore.lectures[0].trainer).toEqual('오진욱');
      expect(lectureStore.lectures[1].trainer).toEqual('오진욱');
    });
  });
});
