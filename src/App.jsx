import { Route, Routes } from 'react-router-dom';
import Header from './conponents/Header';
import CalenderPage from './pages/CalenderPage';
import HomePage from './pages/HomePage';
import ProductImformationPage from './pages/ProductImformationPage';
import ProductsPage from './pages/ProductsPage';
import GlobalStyle from './styles/GlobalStyle';

export default function App() {
  return (
    <div>
      <GlobalStyle />
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calender" element={<CalenderPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:productId" element={<ProductImformationPage />} />
        </Routes>
      </div>
    </div>
  );
}
