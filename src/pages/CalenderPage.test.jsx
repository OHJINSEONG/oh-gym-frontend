const { render, screen, waitFor } = require('@testing-library/react');
const { default: CalenderPage } = require('./CalenderPage');

test('CalenderPage', async () => {
  render(<CalenderPage />);

  await waitFor(() => {
    screen.getByText('시간표');
  });
});
