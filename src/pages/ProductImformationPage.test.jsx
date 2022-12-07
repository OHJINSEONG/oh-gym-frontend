const { render, waitFor, screen } = require('@testing-library/react');
const { default: ProductImformationPage } = require('./ProductImformationPage');

const navigator = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigator,
  useParams: () => ({
    productId: 1,
  }),
}));

test('ProductImformationPage', async () => {
  render(<ProductImformationPage />);

  await waitFor(() => {
    screen.getByText('결제하기');
  });
});
