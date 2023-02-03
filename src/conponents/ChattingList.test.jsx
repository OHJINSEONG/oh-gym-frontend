const { render, screen, waitFor } = require('@testing-library/react');
const { default: ChattingList } = require('./ChattingList');

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));

describe('ChattingList', () => {
  it('render', async () => {
    const chattingRooms = [{ chattingRoom: { id: 1, message: '하이', trainerName: '오진성' }, count: 1 }];

    render(<ChattingList
      chattingRooms={chattingRooms}
    />);

    await waitFor(() => {
      screen.getByText('오진성');
      screen.getByText('하이');
    });
  });
});
