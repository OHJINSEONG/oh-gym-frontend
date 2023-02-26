import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useUserStore from '../hooks/useUserStore';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 800px;
  background-color: white;

  h2{
    font-size: 20px;
    font-weight: bold;

    margin-bottom: 30px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: white;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 85%;
  
  button{
    height: 40px;
    width: 150px;
    border-radius: 20px;
    color: white;
    box-shadow: 0px 3px 3px 0px gray;
    background-color: #EF781A;
  }
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
      <Wrapper>
        <h2>OH GYM에 가입 하시겠습니까?</h2>
        <ButtonWrapper>
          <button type="button" onClick={handleClickRegister}>확인</button>
          <button type="button" onClick={() => navigate('/')}>취소</button>
        </ButtonWrapper>
      </Wrapper>
    </Container>
  );
}
