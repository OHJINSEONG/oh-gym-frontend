const { render, screen, waitFor } = require('@testing-library/react');
const { default: OrdersPage } = require('./OrdersPage');

test('OrdersPage', async () => {
  render(<OrdersPage />);

  await waitFor(() => {
    screen.getByText('주문내역입니다.');
  });
});
