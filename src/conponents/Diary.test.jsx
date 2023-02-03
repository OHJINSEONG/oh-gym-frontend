const { render, screen, waitFor } = require('@testing-library/react');
const { default: Diary } = require('./Diary');

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));

describe('Diary', () => {
  it('no diary', async () => {
    const date = '2022-12-25';

    render(<Diary date={date} />);

    await waitFor(() => {
      screen.getByText('12.25 운동');
    });
  });

  it('with diary', async () => {
    const date = '2023-01-02';

    render(<Diary date={date} />);

    await waitFor(() => {
      screen.getByText('해당 날짜에 운동일지가 없습니다.');
    });
  });
});
