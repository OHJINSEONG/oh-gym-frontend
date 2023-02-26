import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';

import useUserStore from '../hooks/useUserStore';

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 40px 0;
  background-color: white;
  border-bottom: 1px solid #D9D9D9;
  
  h2{
    font-size: 23px;
    font-weight: bold;
    width: 85%;
    border-bottom: 1px solid #D9D9D9;
    padding-bottom: 5px;
    margin-bottom: 20px;
  }
`;

const MyProfile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 85%;
`;

const ProfilePhoto = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  margin-bottom: 15px;

  img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    box-shadow: 0px 3px 3px 0px gray;
  }
`;

const ProfileInformation = styled.div`
  display: flex;
  width: auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
  height: 100%;

  h3{
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 5px;
  }

  p{
    font-weight: 700;
    font-size: 16px;
  }

  div{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 4px 0;
  }

  button{
    width: 80px;
    height: 30px;
    color: white;
    border-radius: 5px;
    margin-top: 10px;
    background-color: #EF781A;
  }
`;

export default function Profile() {
  const navigator = useNavigate();
  const [, setAccessToken] = useLocalStorage('accessToken', '');
  const [kakaoAccessToken, setKakaoAccessToken] = useLocalStorage('kakaoAccessToken', '');

  const userStore = useUserStore();

  const { user } = userStore;

  const handleClickLogout = async () => {
    await userStore.kakaoLogout(kakaoAccessToken);
    setKakaoAccessToken('');
    setAccessToken('');
    navigator('/');
  };

  return (
    <ProfileWrapper>
      <MyProfile>
        <ProfilePhoto>
          <img
            src="https://user-images.githubusercontent.com/107606892/212606864-ed6c45a0-fe04-4fa5-baf0-4d9ded37b6fe.png"
          />
        </ProfilePhoto>
        <ProfileInformation>
          <div>
            <h3>
              {user.userName}
            </h3>
          </div>
          <div>
            <p>
              {user.email}
            </p>
          </div>
          <button type="button" onClick={handleClickLogout}>로그아웃</button>
        </ProfileInformation>
      </MyProfile>
    </ProfileWrapper>
  );
}
