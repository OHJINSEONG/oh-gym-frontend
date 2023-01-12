import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useUserStore from '../hooks/useUserStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;
`;

export default function Register() {
  const userStore = useUserStore();
  const [, setAccessToken] = useLocalStorage('accessToken', '');
  const [kakaoAccessToken] = useLocalStorage('kakaoAccessToken', '');
  const navigate = useNavigate();

  const handleClickRegister = async () => {
    const accessToken = await userStore.register(kakaoAccessToken);
    console.log(accessToken);
    setAccessToken(accessToken);

    navigate('/');
  };

  return (
    <Container>
      <h2>가입 하기</h2>
      <button type="button" onClick={handleClickRegister}>확인</button>
      <button type="button" onClick={() => navigate('/')}>취소</button>
    </Container>
  );
}
