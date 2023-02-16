const { render, screen, waitFor } = require('@testing-library/react');
const { default: DiaryRegister } = require('./DiaryRegister');

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));

jest.mock('./Progress', () => () => null);

jest.mock('../hooks/useDiaryStore', () => () => ({
  diary: null,
  findDiary: jest.fn(),
}));

describe('DiaryRegister', () => {
  it('render', async () => {
    render(<DiaryRegister />);

    await waitFor(() => {
      screen.getByText('운동 완료를 축하합니다!');
      screen.getByText('00:00:00');
    });
  });
});
