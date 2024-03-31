const { render, screen, waitFor } = require('@testing-library/react');
const { default: BottomNavigator } = require('./BottomNavigator');

const context = describe;

jest.mock('react-router-dom', () => ({
  useLocation: () => ({
    pathname: '',
  }),
  // eslint-disable-next-line react/prop-types
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
}));

describe('header', () => {
  context('no login', () => {
    beforeEach(() => {
      localStorage.removeItem('accessToken');
    });

    it('render home button', async () => {
      render(<BottomNavigator />);

      await waitFor(() => {
        screen.getByText('Home');
      });
    });
  });

  context('with login', () => {
    beforeEach(() => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESS.TOKEN'));
    });

    it('render myPage button', async () => {
      render(<BottomNavigator />);

      await waitFor(() => {
        screen.getByText('MyPage');
      });
    });
  });
});
