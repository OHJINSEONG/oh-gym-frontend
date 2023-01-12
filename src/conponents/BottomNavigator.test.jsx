const { render } = require('@testing-library/react');
const { default: BottomNavigator } = require('./BottomNavigator');

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  // eslint-disable-next-line react/prop-types
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
  useNavigate: () => navigate,
}));

describe('header', () => {
  it('render home', () => {
    render(<BottomNavigator />);
  });
});
