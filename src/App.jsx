import { Route, Routes } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { useEffect } from 'react';
import { Reset } from 'styled-reset';

import styled from 'styled-components';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import GlobalStyle from './styles/GlobalStyle';
import LectureCalender from './conponents/LectureCalender';
import DiarysPage from './pages/DiarysPage';
import MyPage from './pages/MyPage';
import PlanerPage from './pages/PlanerPage';
import LockersPage from './pages/LockersPage';
import OrdersPage from './pages/OrdersPage';
import TicketsPage from './pages/TicketsPage';
import TicketDetailPage from './pages/TicketDetailPage';
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
import ExerciseListPage from './pages/ExerciseListPage';
import DiaryRegister from './conponents/DiaryRegister';
import BottmExerciseTimer from './conponents/BottomExerciseTimer';
import OrderPage from './pages/OrderPage';
import DiaryDetailPage from './pages/DiaryDetailPage';
import ExercisePage from './pages/ExercisePage';

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
      <BottmExerciseTimer />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/diarys" element={<DiarysPage />} />
          <Route path="/diarys/:diaryId" element={<DiaryDetailPage />} />
          <Route path="/diarys/:diaryId/exercises" element={<PlanerPage />} />
          <Route path="/diarys/:diaryId/exercises/:exerciseId" element={<ExercisePage />} />
          <Route path="/diarys/complete" element={<DiaryRegister />} />
          <Route path="/exercises" element={<ExerciseListPage />} />
          <Route path="/calendar" element={<LectureCalender />} />
          <Route path="/myPage" element={<MyPage />} />
          <Route path="/myPage/exercises/:exerciseId" element={<ExercisePage />} />
          <Route path="/myPage/lockers" element={<LockersPage />} />
          <Route path="/myPage/lockers/:lockerId" element={<LockersPage />} />
          <Route path="/myPage/chats" element={<ChattingListPage />} />
          <Route path="/myPage/chats/:chatId" element={<ChattingPage />} />
          <Route path="/myPage/tickets" element={<TicketsPage />} />
          <Route path="/myPage/orders" element={<OrdersPage />} />
          <Route path="/myPage/tickets/:ticketId" element={<TicketDetailPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/order/products/:productId/options/:optionId" element={<OrderPage />} />
          <Route path="/orders/success" element={<OrderSuccess />} />
          <Route path="/orders/cancel" element={<OrderCancel />} />
          <Route path="/orders/fail" element={<OrderFail />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/trainers" element={<TrainerPage />} />
          <Route path="/auth/kakao/callback" element={<Kakao />} />
        </Routes>
      </div>
    </div>
  );
}
