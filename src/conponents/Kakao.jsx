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

  @keyframes spinCircle {
    from {
        transform:translate(-50%, -50%) rotate(0);
    }
    to {
        transform:translate(-50%, -50%) rotate(360deg);
    }
}

  .loadingBox .dim {position:fixed; left:0; top:0; width:100%; height:100%; background:white;}
  .loadingBox .circle {position:fixed; left:50%; top:50%; transform:translate(-50%, -50%); width:40px; height:40px; border:10px solid #EF781A; border-top:10px solid white; border-radius:50em;
    animation-name:spinCircle;
    animation-duration:.8s;
    animation-iteration-count:infinite;}
 
  
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

      navigate('/myPage');

      return;
    }

    navigate('/register');
  };

  useEffect(() => {
    getAccessToken();
  }, []);

  return (
    <Container>
      <div className="loadingBox">
        <div className="dim" />
        <div className="circle" />
      </div>
    </Container>
  );
}
