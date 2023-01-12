import styled from 'styled-components';
import config from '../../config';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 800px;

  h1{
    margin-bottom: 30px;
  }

  input{
    margin-top: 10px;
  }
  
  button {
    margin-top: 10px;
    padding: 10px;
    border: 1px solid black
  }

  a {
    margin-top: 10px;
    padding: 10px;
    border: 1px solid black
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const { kakaoAuthUrl } = config;

export default function LoginPage() {
  return (
    <Container>
      <Wrapper>
        <h1>OhGym</h1>
        <div>
          <input />
        </div>
        <div>
          <input />
        </div>
        <button type="button">로그인하기</button>
        <button type="button">회원가입</button>
        <a href={kakaoAuthUrl}>카카오으로 로그인</a>
      </Wrapper>
    </Container>
  );
}
