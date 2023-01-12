const { render, screen, waitFor } = require('@testing-library/react');
const { default: LoginPage } = require('./LoginPage');

test('loginPage', async () => {
  render(<LoginPage />);

  await waitFor(() => {
    screen.getByText('카카오로 로그인하기');
  });
});
