import styled from 'styled-components';
import config from '../../config';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 800px;
  background-color: white;
  padding-top: 200px;


  input{
    width: 280px;
    height: 50px;
    margin-top: 10px;
    padding-left: 15px;
    color: #D1D1D1;
    border: 1px solid #D1D1D1;
  }
  
  button {
    width: 100%;
    margin-top: 10px;
    height: 50px;
    background-color: black;
    color:white;
    font-weight: 600;
    border-radius: 5px;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    margin-top: 10px;
    font-size: 14px;
    border-radius: 5px;
    background-color: #FEE500 ;
    
    p{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }  

    img {
      margin-right: 10px;
      width: 25px;
      height: 20px;
    }
  }
`;

const FrameImage = styled.img`
   width: 150px;
    margin-bottom: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
`;

const Register = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 15px;
  
  h1{
    color: #D1D1D1;
    font-size: 12px;

    margin-right: 10px;
  }

  h2{
    font-size: 12px;
  }
`;

const { kakaoAuthUrl } = config;

export default function LoginPage() {
  const handleChange = () => {
    console.log('sd');
  };

  return (
    <Container>
      <Wrapper>
        <FrameImage src="assets/images/Frame.png" />
        <div>
          <input value="이메일" onChange={handleChange} />
        </div>
        <div>
          <input value="비밀번호" onChange={handleChange} />
        </div>
        <button type="button">로그인</button>
        <a href={kakaoAuthUrl}>
          <p>
            <img src="assets/images/kakaoTalk.png" />
          </p>
          <p>카카오계정으로 로그인</p>
        </a>
        <Register>
          <h1>아직 회원이 아니신가요?</h1>
          <h2>회원가입</h2>
        </Register>
      </Wrapper>
    </Container>
  );
}
