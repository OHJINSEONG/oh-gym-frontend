const { render, screen, waitFor } = require('@testing-library/react');
const { lectureStore } = require('../stores/LectureStore');
const { default: LectureCalender } = require('./LectureCalender');

jest.mock('react-calendar/dist/Calendar.css', () => null);

test('lectureCalendar', async () => {
  await lectureStore.fetchTrainerSchedule(1, '2022-12-08');
  await lectureStore.makeUserSchedule(1, '2022-12-08');

  render(<LectureCalender />);

  screen.getByText('Mon');
});
