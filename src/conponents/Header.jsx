import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useUserStore from '../hooks/useUserStore';

const Container = styled.div`
  position: fixed;
  font-size: .8em;
  font-weight: bold;
  width: 100%;
  height: 30px;
  background-color: white;
  border-bottom: solid 1px black;

  justify-content: space-between;

  ul{
      display: flex;
      justify-content: space-between;
      width: 200px;
  }
  
  div{
    display: flex;
    justify-content: space-between;
  }
`;

const Wrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1000px;
  height: 40px;
`;

export default function Header() {
  const userStore = useUserStore();

  const { user } = userStore;

  useEffect(() => {
    userStore.find();
  }, []);

  return (
    <Container>
      <Wrapper>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Product</Link>
          </li>
          <li>
            <Link to="/myPage">MyPage</Link>
          </li>
        </ul>
        <div>
          <p>
            pt횟수:
            {user.ptTimes}
          </p>
          <p>
            이용일:
            {user.periodOfUse}
          </p>
        </div>
      </Wrapper>
    </Container>
  );
}
