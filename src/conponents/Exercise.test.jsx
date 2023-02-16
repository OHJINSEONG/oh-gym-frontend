const { render, screen, waitFor } = require('@testing-library/react');
const { default: Exercise } = require('./Exercise');

describe('Exercise', () => {
  it('render', async () => {
    const exerciseId = 1;

    render(<Exercise exerciseId={exerciseId} />);

    await waitFor(() => {
      screen.getByText('풀업');
      screen.getByText('세트 추가');
      screen.getByText('세트 제거');
    });
  });
});
