const { render, screen } = require('@testing-library/react');

const { default: PlanList } = require('./PlanList');

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));

test('addPlanPage', async () => {
  const date = '2022-12-20';

  render(<PlanList date={date} />);

  screen.getByText('운동계획');
});
