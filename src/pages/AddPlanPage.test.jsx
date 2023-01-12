const { render, screen } = require('@testing-library/react');
const { default: AddPlanPage } = require('./AddPlanPage');

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: { sets: '' },
  }),
  useNavigate: () => navigate,
  useParams: () => ({
    exerciseId: 1,
  }),
}));

test('addPlanPage', () => {
  render(<AddPlanPage />);

  screen.getByText('풀업');
});
