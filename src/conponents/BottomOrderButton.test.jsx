const { render, screen } = require('@testing-library/react');
const { default: BottomOrderButton } = require('./BottomOrderButton');

describe('BottomOrderButton', () => {
  it('render button', async () => {
    render(<BottomOrderButton />);

    screen.getByText('카카오 페이');
  });
});
