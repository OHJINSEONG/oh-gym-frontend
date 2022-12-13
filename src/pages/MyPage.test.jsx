const { render, screen, waitFor } = require('@testing-library/react');
const { lectureStore } = require('../stores/LectureStore');
const { trainerStore } = require('../stores/TrainerStore');
const { userStore } = require('../stores/UserStore');
const { default: CalenderPage } = require('./MyPage');

const navigate = jest.fn();

jest.mock('react-calendar/dist/Calendar.css', () => null);

jest.mock('react-datepicker/dist/react-datepicker.css', () => null);

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));

test('CalenderPage', async () => {
  render(<CalenderPage />);

  await waitFor(() => {
    screen.getByText('Pt시간표');
  });
});
