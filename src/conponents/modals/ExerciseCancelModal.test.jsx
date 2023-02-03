const { render, screen } = require('@testing-library/react');
const { default: ExerciseCancelModal } = require('./ExerciseCancelModal');

describe('modal', () => {
  it('render modal', () => {
    render(<ExerciseCancelModal />);

    screen.getByText('진행중인 운동을 종료하시겠습니까?');
  });
});
