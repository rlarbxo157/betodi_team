import React, { Suspense } from 'react';
import './App.css';
import {
  Switch,
  Route,
} from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';
import Messenger from './components/views/Messenger/Messenger';
import Navbar from './components/views/Navbar/Navbar';
import Footer from './components/views/Footer/Footer';
import BookUploadPage from './components/views/BookUploadPage/BookUploadPage';
import DetailProductPage from './components/views/DetailProductPage/DetailProductPage'
import MyPage from './components/views/MyPage/MyPage';
import CartPage from './components/views/CartPage/CartPage';

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <Navbar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/mypage" component={Auth(MyPage, true)} />
          <Route exact path="/product/upload" component={Auth(BookUploadPage, true)} />
          <Route exact path="/product/:productId" component={Auth(DetailProductPage, null)} />
          <Route exact path="/messenger" component={Auth(Messenger, true)} />
          <Route exact path="/user/cart" component={Auth(CartPage, true)} />

        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
