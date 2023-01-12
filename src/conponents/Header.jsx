import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useUserStore from '../hooks/useUserStore';

const Container = styled.div`
  position: fixed;
  font-size: .8em;
  font-weight: bold;
  width: 100%;
  height: 30px;
  background-color: white;

  justify-content: space-between;

  ul{
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 100%;
      
    li{
      display: flex;
      justify-content:center;
      align-items: center;
      margin: 10px;
      padding: 10px;
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

export default function Header() {
  const location = useLocation();
  const navigator = useNavigate();

  const path = location.pathname;

  if (path.includes('myPage/')) {
    return (
      <Container>
        <Wrapper>
          <ul>
            <li>
              <button type="button" onClick={() => navigator('/myPage')}>MyPage</button>
            </li>
            <li>
              <button type="button">뭐할까</button>
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
            <Link to="/">설정</Link>
          </li>
          <li>
            <Link to="/products">알림</Link>
          </li>
        </ul>
      </Wrapper>
    </Container>
  );
}
