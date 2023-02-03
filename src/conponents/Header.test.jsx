const { render, waitFor, screen } = require('@testing-library/react');
const { default: Header } = require('./Header');

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useLocation: () => ({
    pathname: '',
  }),
  useNavigate: () => navigate,
  // eslint-disable-next-line react/prop-types
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
}));

describe('Header', () => {
  it('render', async () => {
    render(<Header />);

    await waitFor(() => {
      screen.getByAltText('title');
    });
  });
});
