const { render, screen } = require('@testing-library/react');
const { default: Coupons } = require('./Coupons');

describe('Coupons', () => {
  it('render', async () => {
    render(<Coupons />);

    screen.getByText('포인트');
  });
});
