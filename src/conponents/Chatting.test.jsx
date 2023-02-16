const { render, screen, waitFor } = require('@testing-library/react');
const { default: Chatting } = require('./Chatting');

const navigate = jest.fn();

const scrollIntoViewMock = jest.fn();
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));

describe('Chatting', () => {
  it('render', async () => {
    const message = { id: 1, content: '하이' };
    const chatMessages = [{ id: 1, content: '하이' }, { id: 2, content: '안하이' }];
    const publishMessage = '하이';
    const chattingParticipants = '하이';
    const messageChange = '하이';

    render(<Chatting
      message={message}
      chatMessages={chatMessages}
      publishMessage={publishMessage}
      chattingParticipants={chattingParticipants}
      messageChange={messageChange}
    />);

    await waitFor(() => {
      screen.getByText('최근 톡');
    });
  });
});
