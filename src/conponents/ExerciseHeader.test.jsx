const { render, screen } = require('@testing-library/react');
const { default: ExerciseHeader } = require('./ExerciseHeader');

jest.mock('./Progress', () => () => null);

jest.mock('../hooks/useDiaryStore', () => () => ({
  diary: null,
  findDiary: jest.fn(),
}));

describe('ExerciseHeader', () => {
  it('render', async () => {
    render(<ExerciseHeader />);

    screen.getByText('00 : 00 : 00');
  });
});
