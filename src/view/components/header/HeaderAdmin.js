import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import cookie from 'react-cookies';

const Header = () => {
    
    const [username, setUserName] = useState('');
    const [active, setActive] = useState('');

    useEffect(() => {

        if (
            window.location.pathname.includes("/login") ||
            window.location.pathname.includes("/join")
        ) {
            $(".fixed-top").hide()
        }

        var cookie_userid = cookie.load('userid')
        var cookie_usernm = cookie.load('username')
        var cookie_password = cookie.load('userpassword')

        if (cookie_userid != undefined) {
            const expires = new Date()
            expires.setMinutes(expires.getMinutes() + 60)

            cookie.save('userid', cookie_userid
                , { path: '/', expires })
            cookie.save('username', cookie_usernm
                , { path: '/', expires })
            cookie.save('userpassword', cookie_password
                , { path: '/', expires })

            $("#notLogin").hide()
            $("#isLogin").show()
        } else {
            $("#notLogin").show()
            $("#isLogin").hide()
        }
        callSessionInfoApi()
    }, []);

    const callSessionInfoApi = () => {
        axios.post('http://localhost:8080/member/jwtChk', {
            token1: cookie.load('userid')
            , token2: cookie.load('username')
        })
            .then(response => {
                setUserName(response.data.token2);
            })
            .catch(error => {
                console.log('작업중 오류가 발생하였습니다.');
            });
    }

    const handleMenuClick = (path) => {
        setActive(path);
    };

    const logout = () => {
        cookie.remove('userid', { path: '/' });
        cookie.remove('username', { path: '/' });
        cookie.remove('userpassword', { path: '/' });
        window.location.href = "/";
    }

        return (
            <nav class="navbar navbar-default navbar-trans navbar-expand-lg fixed-top">
                <div class="container">
                    <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarDefault" aria-controls="navbarDefault" aria-expanded="false" aria-label="Toggle navigation">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <a class="navbar-brand text-brand" href="/">Pop<span class="color-b">Pin</span></a>

                    <div class="navbar-collapse collapse justify-content-center" id="navbarDefault">
                        <ul class="navbar-nav">
                            <li class={`nav-item ${window.location.pathname === '/' ? 'active' : ''}`}>
                                <a id="home" class="nav-link" href="/" onClick={() => handleMenuClick('/')}>홈</a>
                            </li>

                            <li class={`nav-item ${window.location.pathname === '/goodslist' ? 'active' : ''}`}>
                                <a id="product" class="nav-link" href="/goodslist" onClick={() => handleMenuClick('/goodslist')}>상품</a>
                            </li>

                            <li class={`nav-item ${window.location.pathname === '/popup/popuplist' ? 'active' : ''}`}>
                                <Link id="popupstore" class="nav-link" to={"/popup/popuplist"} onClick={() => handleMenuClick('/popup/popuplist')}>팝업스토어</Link>
                            </li>

                            <li class={`nav-item ${window.location.pathname === '/board/boardlist' ? 'active' : ''}`}>
                                <a id="board" class="nav-link" href="/board/boardlist" onClick={() => handleMenuClick('/boardlist')}>게시판</a>
                            </li>

                            <div id="notLogin">
                                <li class={`nav-item ${window.location.pathname === '/login' ? 'active' : ''}`}>
                                    <a class="nav-link " href="/login" onClick={() => handleMenuClick('/login')}>로그인</a>
                                </li>
                            </div>

                            <div id="isLogin">
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">마이페이지</a>
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item " href="/" onClick={logout}>로그아웃</a>
                                        <a class="dropdown-item " href="#">예약정보</a>
                                        <a class="dropdown-item " href="#">장바구니</a>
                                        <a class="dropdown-item " href="#">주문정보</a>
                                        <a class="dropdown-item " href="/member/memberinfo">회원정보</a>
                                    </div>
                                </li>
                            </div>

                        </ul>
                    </div>
                </div>
            </nav>
        );
};

export default Header;