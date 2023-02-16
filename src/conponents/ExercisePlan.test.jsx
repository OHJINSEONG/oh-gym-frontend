const { render, screen, waitFor } = require('@testing-library/react');

const { default: ExercisePlan } = require('./ExercisePlan');

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));

describe('ExerciseList', () => {
  it('render', async () => {
    render(<ExercisePlan />);

    await waitFor(() => {
      screen.getByText('풀업');
    });
  });
});
