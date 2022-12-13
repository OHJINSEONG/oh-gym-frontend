const { render, screen, waitFor } = require('@testing-library/react');
const { lectureStore } = require('../stores/LectureStore');
const { default: MyLectures } = require('./MyLectures');

jest.mock('react-calendar/dist/Calendar.css', () => null);

test('myLecture', async () => {
  await lectureStore.makeUserSchedule(1, '2022-12-08');
  await lectureStore.fetchTrainerSchedule(1, '2022-12-08');

  render(<MyLectures />);

  screen.getByText('11:00');
});
