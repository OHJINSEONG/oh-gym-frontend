const { render, waitFor, screen } = require('@testing-library/react');
const { default: ProductsPage } = require('./ProductsPage');

jest.mock('react-router-dom', () => ({
  // eslint-disable-next-line react/prop-types
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
}));

test('ProductsPage', async () => {
  render(<ProductsPage />);

  await waitFor(() => {
    screen.getByText('피티');
  });
});
