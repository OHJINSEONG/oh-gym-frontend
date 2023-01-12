const { render } = require('@testing-library/react');
const { default: DiarysPage } = require('./DiarysPage');

jest.mock('react-calendar/dist/Calendar.css', () => null);

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));

test('diaryPage', () => {
  render(<DiarysPage />);
});
