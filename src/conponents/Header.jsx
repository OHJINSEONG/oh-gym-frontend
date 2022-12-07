import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  font-size: .8em;
  font-weight: bold;
  width: 100%;
  height: 30px;
  background-color: white;
  border-bottom: solid 1px black;

  ul{
      display: flex;
      justify-content: space-between;
      width: 200px;
  }
`;

export default function Header() {
  return (
    <Container>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Product</Link>
          </li>
          <li>
            <Link to="/calender">Calender</Link>
          </li>
        </ul>
      </nav>
    </Container>
  );
}
