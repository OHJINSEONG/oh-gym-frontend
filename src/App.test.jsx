const { render, screen } = require('@testing-library/react');
const { MemoryRouter } = require('react-router');
const { default: App } = require('./App');

jest.mock('react-calendar/dist/Calendar.css', () => null);

test('App', () => {
  render((
    <div>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </div>));

  screen.getByText(/Home/);
});
