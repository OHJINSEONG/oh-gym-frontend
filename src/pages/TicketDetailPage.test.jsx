const { render } = require('@testing-library/react');
const { default: TicketDetailPage } = require('./TicketDetailPage');

test('TicketDetailPage', () => {
  render(<TicketDetailPage />);
});
