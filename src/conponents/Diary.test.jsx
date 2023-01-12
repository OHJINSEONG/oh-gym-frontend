const { render, screen, waitFor } = require('@testing-library/react');
const { default: Diary } = require('./Diary');

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
  useParams: () => ({
    exerciseId: 1,
  }),
}));

test('addPlanPage', async () => {
  const date = '2022-12-25';

  render(<Diary date={date} />);

  await waitFor(() => {
    screen.getByText('2022-12-25운동일지');
  });
});
