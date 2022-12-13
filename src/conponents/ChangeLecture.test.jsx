const { render, screen, waitFor } = require('@testing-library/react');
const { default: ChangeLecture } = require('./ChangeLecture');

test('schedule', async () => {
  const todayDate = '2022-12-08T11:00';

  render(<ChangeLecture todayDate={todayDate} />);

  await waitFor(() => {
    screen.getByText('추가');
  });
});
