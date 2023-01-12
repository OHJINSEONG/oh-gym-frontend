const { render } = require('@testing-library/react');
const { default: TicketsPage } = require('./TicketsPage');

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));

test('TicketsPage', () => {
  render(<TicketsPage />);
});
