const { render, screen } = require('@testing-library/react');
const { default: PlanerPage } = require('./PlanerPage');

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: { sets: '' },
  }),
  useNavigate: () => navigate,
}));

test('planerPage', () => {
  render(<PlanerPage />);

  screen.getByText('운동일지 만들기');
});
