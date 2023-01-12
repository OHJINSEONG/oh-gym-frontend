const { render, screen, waitFor } = require('@testing-library/react');
const { default: MyPage } = require('./MyPage');

const navigate = jest.fn();

jest.mock('react-calendar/dist/Calendar.css', () => null);

jest.mock('react-datepicker/dist/react-datepicker.css', () => null);

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));

test('CalenderPage', async () => {
  render(<MyPage />);

  await waitFor(() => {
    screen.getByText('Pt시간표');
  });
});
