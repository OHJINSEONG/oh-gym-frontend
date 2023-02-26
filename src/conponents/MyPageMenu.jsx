import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

const MyMenuButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 290px;
  background-color: white;
  margin-top: 8px;
`;

const ButtonWrapper = styled.div`
  width: 90%;
  height: 90%;
  display: grid;
  grid-template : repeat(2,50%) / repeat(2,50%) ;

  .membership{
    border-right: .5px solid #D9D9D9;
    border-bottom: .5px solid #D9D9D9;
  }

  .diary{
    border-bottom: .5px solid #D9D9D9;
    border-left: .5px solid #D9D9D9;
  }

  .locker{
    border-top: .5px solid #D9D9D9;
    border-right: .5px solid #D9D9D9;
  }

  .chatting{
    border-left: .5px solid #D9D9D9;
    border-top: .5px solid #D9D9D9;
  }
`;

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    width: 100%;
    height: 100%;

    div{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      height: 55px;
    }
`;

export default function MyPageMenu() {
  const navigator = useNavigate();

  return (
    <MyMenuButtons>
      <ButtonWrapper>
        <Button type="button" className="membership" onClick={() => navigator('tickets')}>
          <div>
            <img src="/assets/images/membership.png" />
            <p>
              회원권
            </p>
          </div>
        </Button>
        <Button type="button" className="diary" onClick={() => navigator('orders')}>
          <div>
            <img src="/assets/images/diary.png" />
            <p>
              구매 내역
            </p>
          </div>
        </Button>
        <Button type="button" className="locker" onClick={() => navigator('lockers')}>
          <div>
            <img src="/assets/images/locker.png" />
            <p>
              락카 정보
            </p>
          </div>
        </Button>
        <Button type="button" className="chatting" onClick={() => navigator('chats')}>
          <div>
            <img src="/assets/images/chatting.png" />
            <p>
              상담톡
            </p>
          </div>
        </Button>
      </ButtonWrapper>
    </MyMenuButtons>
  );
}
