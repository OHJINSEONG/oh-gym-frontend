import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  font-size: .8em;
  font-weight: bold;
  top:0%;
  width: 100%;
  height: 70px;
  background-color: white;
  justify-content: space-between;
  z-index: 900;
  border-bottom: 1px solid #D1D1D1;

  ul{
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 100%;
      
    li{
      display: flex;
      justify-content:center;
      align-items: center;
      margin: 15px;
    }
  }
  
  div{
    display: flex;
    width: auto;
    justify-content: space-between;
  }
`;

const Wrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  

  .myPage{
    font-size: 20px;
    font-weight: 600;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;  
  }

  button{
    color: #EF781A;
  }
`;

export default function Header() {
  const location = useLocation();
  const navigator = useNavigate();

  const path = location.pathname;

  if (path.includes('diarys/') || path.includes('exercises/') || path.includes('order/') || path.includes('chats/')) {
    return (
      <Container>
        <Wrapper>
          <ul>
            <li>
              <button type="button" onClick={() => navigator(-1)}>이전</button>
            </li>
            <li>
              <img src="/assets/images/alarm.png" />
            </li>
          </ul>
        </Wrapper>
      </Container>
    );
  }

  if (path.includes('myPage/')) {
    return (
      <Container>
        <Wrapper>
          <ul>
            <li>
              <button type="button" className="myPage" onClick={() => navigator('/myPage')}>MyPage</button>
            </li>
            <li>
              <img src="/assets/images/alarm.png" />
            </li>
          </ul>
        </Wrapper>
      </Container>
    );
  }

  return (
    <Container>
      <Wrapper>
        <ul>
          <li>
            <Link to="/">
              <img
                alt="title"
                src="/assets/images/title.png"
              />
            </Link>
          </li>
          <div>
            <li>
              <Link to="/products">
                <img
                  alt="alarm"
                  src="/assets/images/alarm.png"
                />
              </Link>
            </li>
            <li>
              <Link to="/products">
                <img
                  alt="setting"
                  src="/assets/images/setting.png"
                />
              </Link>
            </li>
          </div>
        </ul>
      </Wrapper>
    </Container>
  );
}
