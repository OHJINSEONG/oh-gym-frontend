const { render, screen } = require('@testing-library/react');
const { MemoryRouter } = require('react-router');
const { default: App } = require('./App');

test('App', () => {
  render((
    <div>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </div>));

  screen.getByText(/Hello/);
});
