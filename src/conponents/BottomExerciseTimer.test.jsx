const { render, screen, waitFor } = require('@testing-library/react');
const { default: BottmExerciseTimer } = require('./BottomExerciseTimer');

const navigate = jest.fn();

const context = describe;

jest.mock('react-router-dom', () => ({
  useLocation: () => ({
    pathname: '',
  }),
  useNavigate: () => navigate,
}));

describe('bottomExerciseTimer', () => {
  context('with workout', () => {
    beforeEach(() => {
      localStorage.setItem('workoutMode', true);
    });

    it('render timer', async () => {
      render(<BottmExerciseTimer />);

      await waitFor(() => {
        screen.getByText('X');
      });
    });
  });
});
