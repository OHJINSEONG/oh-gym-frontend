const { render, waitFor, screen } = require('@testing-library/react');

const { default: ProductInformationPage } = require('./ProductInformationPage');

const navigator = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigator,
  useParams: () => ({
    productId: 1,
  }),
}));

test('ProductInformationPage', async () => {
  render(<ProductInformationPage />);

  await waitFor(() => {
    screen.getByText('피티');
  });
});
