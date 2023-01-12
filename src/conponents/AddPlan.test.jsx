const { render, screen } = require('@testing-library/react');
const { default: AddPlan } = require('./AddPlan');

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
  useParams: () => ({
    exerciseId: 1,
  }),
}));

test('addPlanPage', () => {
  const location = { state: { sets: '' } };

  render(<AddPlan location={location} />);

  screen.getByText('풀업');
});
