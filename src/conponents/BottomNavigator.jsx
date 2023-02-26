import {
  Link, useLocation,
} from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';

const Container = styled.div`
  position: fixed;
  font-size: .8em;
  font-weight: bold;
  bottom:0%;
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 900;
`;

const NavigatorWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #EF781A;

  ul{
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
      
    li{
      display: flex;  
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
    }

    a{
      display: flex;  
      width: 100%;
      height: 60%;
      justify-content: center;
      align-items: center;
      color: white;
      font-family: 'Spoqa Han Sans Neo';
      font-style: normal;
      font-weight: 400;
      border-right: 1px solid #FFFFFF; 
    }

    .noborder{
      border: none;
    }
  }
  
  div{
    display: flex;
    width: auto;
    justify-content: space-between;
  }
`;

export default function BottomNavigator() {
  const [accessToken] = useLocalStorage('accessToken', '');

  const location = useLocation();

  const path = location.pathname;

  if (!accessToken) {
    return (null);
  }

  if (path.includes('/order/')) {
    return (null);
  }

  if (path.includes('calendar')) {
    return (null);
  }

  if (path.includes('exercise')) {
    return (null);
  }

  if (path.includes('diary')) {
    return (null);
  }

  if (path.includes('myPage/')) {
    return (null);
  }

  if (path.includes('products/')) {
    return (null);
  }

  return (
    <Container>
      <NavigatorWrapper>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/trainers">Trainers</Link>
          </li>
          <li>
            <Link className="noborder" to="/myPage">MyPage</Link>
          </li>
        </ul>
      </NavigatorWrapper>
    </Container>
  );
}
