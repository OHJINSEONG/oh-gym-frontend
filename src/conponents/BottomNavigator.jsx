import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';

const Container = styled.div`
  position: fixed;
  font-size: .8em;
  font-weight: bold;
  bottom:0%;
  width: 100%;
  height: 7em;
  background-color: white;
  border-top: solid 1px black;

  justify-content: space-between;

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
      border: 1px solid black;
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
`;

export default function BottomNavigator() {
  const [accessToken] = useLocalStorage('accessToken', '');
  const location = useLocation();

  const path = location.pathname;

  useEffect(() => {
    console.log(location.pathname);
  }, []);

  if (path.includes('myPage/')) {
    return (null);
  }

  return (
    <Container>
      <Wrapper>
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
          {accessToken
            ? (
              <li>
                <Link to="/myPage">MyPage</Link>
              </li>
            )
            : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            ) }
        </ul>
      </Wrapper>
    </Container>
  );
}
