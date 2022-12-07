const { render } = require('@testing-library/react');
const { default: HomePage } = require('./HomePage');

test('HomePage', () => {
  render(<HomePage />);
});
