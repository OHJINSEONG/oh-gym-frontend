import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

const code = new URL(window.location.href).searchParams.get('code');

export default function Kakao() {
  const [, setAccessToken] = useLocalStorage('accessToken', '');
  const [, setKakaoAccessToken] = useLocalStorage('kakaoAccessToken', '');

  const userStore = useUserStore();

  const navigate = useNavigate();

  const getAccessToken = async () => {
    const { kakaoAccessToken, accessToken } = await userStore.kakaoLogin(code);

    setKakaoAccessToken(kakaoAccessToken);

    console.log(accessToken);

    if (accessToken) {
      setAccessToken(accessToken);

      navigate('/');

      return;
    }

    navigate('/register');
  };

  useEffect(() => {
    getAccessToken();
  }, []);

  return (
    <Container>
      로그인 중이 다리다리다리다리 다금바리
    </Container>
  );
}
