const { render, screen } = require('@testing-library/react');
const { default: DiaryDetailPage } = require('./DiaryDetailPage');

jest.mock('react-calendar/dist/Calendar.css', () => null);

test('DiaryDetailPage', () => {
  render(<DiaryDetailPage />);

  screen.getByText('완료');
});
