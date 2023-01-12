import { Route, Routes } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { useEffect } from 'react';
import { Reset } from 'styled-reset';

import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import GlobalStyle from './styles/GlobalStyle';
import LectureCalender from './conponents/LectureCalender';
import DiarysPage from './pages/DiarysPage';
import MyPage from './pages/MyPage';
import PlanerPage from './pages/PlanerPage';
import AddPlanPage from './pages/AddPlanPage';
import LockersPage from './pages/LockersPage';
import DiaryDetailPage from './pages/DiaryDetailPage';
import OrdersPage from './pages/OrdersPage';
import TicketsPage from './pages/TicketsPage';
import TicketDetailPage from './pages/TicketDetailPage';
import ProductInformationPage from './pages/ProductInformationPage';
import LoginPage from './pages/LoginPage';

import { apiService } from './services/ApiService';
import OrderSuccess from './conponents/OrderSuccess';
import OrderCancel from './conponents/OrderCancle';
import OrderFail from './conponents/OrderFail';
import ChattingPage from './pages/ChattingPage';
import Register from './conponents/Register';
import useUserStore from './hooks/useUserStore';
import BottomNavigator from './conponents/BottomNavigator';
import Header from './conponents/Header';
import TrainerPage from './pages/TrainerPage';
import ChattingListPage from './pages/ChattingListPage';
import Kakao from './conponents/Kakao';

export default function App() {
  const userStore = useUserStore();
  const [accessToken] = useLocalStorage('accessToken', '');

  useEffect(() => {
    apiService.setAccessToken(accessToken);

    if (accessToken) {
      userStore.fetchUser();
    }
  }, [accessToken]);

  return (
    <div>
      <Reset />
      <GlobalStyle />
      <Header />
      <BottomNavigator />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/myPage" element={<MyPage />} />
          <Route path="/myPage/calendar" element={<LectureCalender />} />
          <Route path="/myPage/diarys" element={<DiarysPage />} />
          {/* <Route path="/myPage/diarys/:diaryId" element={<DiaryDetailPage />} /> */}
          <Route path="/myPage/diarys/:diaryId/exercises" element={<PlanerPage />} />
          <Route path="/myPage/diarys/:diaryId/exercises/:exerciseId" element={<AddPlanPage />} />
          <Route path="/myPage/exercises" element={<PlanerPage />} />
          <Route path="/myPage/exercises/:exerciseId" element={<AddPlanPage />} />
          <Route path="/myPage/lockers" element={<LockersPage />} />
          <Route path="/myPage/lockers/:lockerId" element={<LockersPage />} />
          <Route path="/myPage/chats" element={<ChattingListPage />} />
          <Route path="/myPage/chats/:chatId" element={<ChattingPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:productId" element={<ProductInformationPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/success" element={<OrderSuccess />} />
          <Route path="/orders/cancel" element={<OrderCancel />} />
          <Route path="/orders/fail" element={<OrderFail />} />
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/tickets/:ticketId" element={<TicketDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/trainers" element={<TrainerPage />} />
          <Route path="/auth/kakao/callback" element={<Kakao />} />
        </Routes>
      </div>
    </div>
  );
}
