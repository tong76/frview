import '../../App.css'
/* import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; */
import { Route, Routes } from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';

//header
import HeaderAdmin from './Header/HeaderAdmin';

//footer
import Footer from './Footer/Footer';

//팝업  스토어
import PopupList from './Popup/PopupList';
import PopupRead from './Popup/PopupRead';

//main 
import MainView from './MainView';

//게시판 
import BoardList from './Board/BoardList';
import BoardPage from './Board/BoardPage';
import BoardRegist from './Board/BoardRegist';

//회원기능
import Join from './Member/Join';
import Login from './Member/Login';

//굿즈
import GoodsPopupList from './Goods/GoodsPopupList';
import GoodsList from './Goods/GoodsList';
import GoodsDetail from './Goods/GoodsDetail';

//css
import '../../resources/assets/img/favicon.png';
import '../../resources/assets/img/apple-touch-icon.png';
import '../../resources/assets/vendor/animate.css/animate.min.css';
import '../../resources/assets/vendor/bootstrap/css/bootstrap.min.css';
import '../../resources/assets/vendor/bootstrap-icons/bootstrap-icons.css';
import '../../resources/assets/vendor/swiper/swiper-bundle.min.css';
import '../../resources/assets/css/style.css';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    }
  }

  static getDerivedStateFromProps(props, state) {

    // 헤더, 푸터 보이게 할 페이지 경로설정
    if (
      window.location.pathname === "/" ||
      window.location.pathname === "/goods/goodspopuplist" ||
      window.location.pathname.includes("/goods/goodslist") ||
      window.location.pathname.includes("/goods/goodsdetail") ||
      window.location.pathname === "/popup/popuplist" ||
      window.location.pathname === "/board/boardlist"
    ) {
      return {
        isVisible: true
      };
    }
  }

  render() {
    return (
      <div className="App">
        <HeaderAdmin isVisible={this.state.isVisible} />
        <Routes>
          <Route exact path='/' Component={MainView} />
          <Route path='/popup/popuplist' Component={PopupList} />
          <Route path='/popup/popupread/:sno' Component={PopupRead} />
          <Route path='/board/boardlist' Component={BoardList} />
          <Route path='/board/boardpage/:bno' Component={BoardPage} />
          <Route path='/board/boardregist' Component={BoardRegist} />
          <Route path='/goods/goodspopuplist' Component={GoodsPopupList} />
          <Route path='/goods/goodslist/:sno' Component={GoodsList} />
          <Route path='/goods/goodsdetail/:sno/:pno' Component={GoodsDetail} />
          <Route path="/login" Component={Login} />
          <Route path="/join" Component={Join} />
        </Routes>
        <Footer isVisible={this.state.isVisible} />
      </div>
    );
  }
}

export default App;
