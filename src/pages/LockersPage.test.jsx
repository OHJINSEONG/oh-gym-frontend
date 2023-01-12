const { render, screen, waitFor } = require('@testing-library/react');
const { default: LockersPage } = require('./LockersPage');

test('HomePage', async () => {
  render(<LockersPage />);

  await waitFor(() => {
    screen.getByText('티켓 없음 사오셈');
  });
});
