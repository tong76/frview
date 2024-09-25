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

//회원정보
import MemberInfo from './Member/MemberInfo';
import ModifyInfo from './Member/ModifyInfo';

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
    }
  }

  //인터셉터 기능

  componentDidUpdate(prevProps) {
    if (window.location.pathname !== prevProps.location.pathname) {
      // URL이 변경되었을 때 실행할 로직
      this.checkUserPermission();
    }
  }

  componentDidMount() {
    this.checkUserPermission();
  }

  checkUserPermission = () => {

    if (
      // window.location.pathname === '/member/memberinfo' ||
      window.location.pathname === '/board/boardregist' ||
      window.location.pathname === '/popup/popuplist' ||
      window.location.pathname === '/board/boardlist') {

      axios.post('http://localhost:8080/member/jwtChk', {
        token1: cookie.load('userid'),
        token2: cookie.load('username')
      })
        .then(response => {
          this.state.userid = response.data.token1
          let password = cookie.load('userpassword')
          if (password !== undefined) {
            axios.post('http://localhost:8080/member/jwtLogin', {
              mid: this.state.userid,
              mpw: password
            })
              .then(response => {
                if (response.data.jwtLogin[0].mid === undefined) {
                  this.noPermission()
                }
              })
              .catch(error => {
                this.noPermission()
              });
          } else {
            this.noPermission()
          }
        })
        .catch(response => this.noPermission());
    }
  }

  noPermission = (e) => {
    this.remove_cookie();
    window.location.href = '/login';
  };

  remove_cookie = (e) => {
    cookie.remove('userid', { path: '/' });
    cookie.remove('username', { path: '/' });
    cookie.remove('userpassword', { path: '/' });
  }

  render() {
    return (
      <div className="App">
        <HeaderAdmin />
        {/* <Routes>
            <Route exact path="/" Component={mainView}/>
            <Route path="/popup/popupList" Component={popupList} />
            <Route path="/popup/popupRead/:sno" Component={popupRead} />
            <Route path="/board/boardList" Component={boardList} />
            <Route path="/board/boardPage" Component={boardPage} />
          </Routes> */}
        <Routes>
        <Route exact path='/' Component={MainView} />
        <Route path='/popup/popupList' Component={PopupList} />
        <Route path='/popup/popupRead/:sno' Component={PopupRead} />
        <Route path='/board/boardList' Component={BoardList} />
        <Route path='/board/boardPage/:bno' Component={BoardPage} />
        <Route path='/board/boardRegist' Component={BoardRegist} />
        <Route path="/login" Component={Login} />
        <Route path="/join" Component={Join} />
        <Route path="/member/memberinfo" Component={MemberInfo} />
        <Route path="/member/modifyinfo" Component={ModifyInfo} />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default App;
