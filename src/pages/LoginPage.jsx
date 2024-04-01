import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import config from '../config';
import useUserStore from '../hooks/useUserStore';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 400px;
    height: 800px;
    background-color: white;
    padding-top: 200px;

    input {
        width: 280px;
        height: 50px;
        margin-top: 10px;
        padding-left: 15px;
        color: #d1d1d1;
        border: 1px solid #d1d1d1;
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
        background-color: #fee500;

        p {
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

    h1 {
        color: #d1d1d1;
        font-size: 12px;

        margin-right: 10px;
    }

    h2 {
        font-size: 12px;
    }
`;

const Button1 = styled.button`
    width: 100%;
    margin-top: 10px;
    height: 50px;
    color: white;
    font-weight: 600;
    border-radius: 5px;
    background-color: black;
`;

const Button2 = styled.button`
    width: 100%;
    margin-top: 10px;
    height: 50px;
    color: white;
    font-weight: 600;
    border-radius: 5px;
    background-color: #ef781a;
`;

const { kakaoAuthUrl } = config;

export default function LoginPage() {
    const [, setAccessToken] = useLocalStorage('accessToken', '');
    const userStore = useUserStore();

    const handleChange = () => {
        console.log('sd');
    };

    const testLogin = async () => {
        const accessToken = await userStore.testLogin();

        await setAccessToken(accessToken);
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
                <Button2 type="button" onClick={testLogin}>
                    테스트 계정으로 바로 로그인
                </Button2>
                <Button1 type="button">로그인</Button1>
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
