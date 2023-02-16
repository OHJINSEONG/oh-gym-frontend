const { default: LectureStore } = require('./LectureStore');

const context = describe;

describe('lectureStore', () => {
  let lectureStore;

  beforeEach(() => {
    lectureStore = new LectureStore();
  });

  describe('fetchTrainerSchedule', () => {
    it('fetchTrainerSchedule', async () => {
      await lectureStore.fetchTrainerSchedule(1, '2022-12-09');

      expect(lectureStore.dailyEmptySchedule.length).toEqual(3);
    });
  });

  describe('fetchTrainerSchedules', () => {
    it('fetchTrainerSchedules', async () => {
      await lectureStore.fetchTrainerSchedules(1);

      expect(lectureStore.emptySchedules[0].trainerSchedules.length).toEqual(3);
    });
  });

  describe('fetchUserLectures', () => {
    it('fetchUserLectures', async () => {
      await lectureStore.fetchUserLectures();

      expect(lectureStore.userLectures.length).toEqual(2);
    });
  });

  describe('makeUserSchedule', () => {
    it('makeUserSchedule', async () => {
      await lectureStore.makeUserSchedule('2022-12-08');

      expect(lectureStore.dailyUserLecture.userName).toEqual('오진성');
    });
  });
});
