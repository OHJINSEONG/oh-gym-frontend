const { render, screen, waitFor } = require('@testing-library/react');

const { default: ExerciseList } = require('./ExerciseList');

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));

describe('ExerciseList', () => {
  it('render', async () => {
    render(<ExerciseList />);

    await waitFor(() => {
      screen.getByText('풀업');
    });
  });
});
