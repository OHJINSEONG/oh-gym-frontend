const { render, screen, waitFor } = require('@testing-library/react');
const { default: ExerciseBottomNavigator } = require('./ExerciseBottomNavigator');

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));

describe('Exercise', () => {
  it('render', async () => {
    const exerciseId = 1;

    render(<ExerciseBottomNavigator exerciseId={exerciseId} />);

    await waitFor(() => {
      screen.getByText('이전');
      screen.getByText('1세트 완료');
      screen.getByText('다음');
    });
  });
});
