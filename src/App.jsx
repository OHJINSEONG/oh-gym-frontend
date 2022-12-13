import { Route, Routes } from 'react-router-dom';
import Header from './conponents/Header';

import HomePage from './pages/HomePage';
import ProductImformationPage from './pages/ProductImformationPage';
import ProductsPage from './pages/ProductsPage';
import GlobalStyle from './styles/GlobalStyle';
import LectureCalender from './conponents/LectureCalender';
import MyPage from './pages/MyPage';

export default function App() {
  return (
    <div>
      <GlobalStyle />
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/myPage" element={<MyPage />} />
          <Route path="/myPage/calendar" element={<LectureCalender />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:productId" element={<ProductImformationPage />} />
        </Routes>
      </div>
    </div>
  );
}
