import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import cookie from 'react-cookies';
import Swal from 'sweetalert2';

const BoardModify = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { bno } = location.state || {};
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');

    // 사용자 아이디 가져오기
    useEffect(() => {
        const callSessionInfoApi = async () => {
            try {
                const response = await axios.post('http://localhost:8080/member/jwtChk', {
                    token1: cookie.load('userid'),
                    token2: cookie.load('username')
                });
                setUserId(response.data.token1);
            } catch (error) {
                console.log('작업 중 오류가 발생하였습니다.');
            }
        };
        callSessionInfoApi();
    }, []);

    // 게시글 정보 가져오기
    useEffect(() => {
        const callboardInfoApi = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/board/boardPage/${bno}`);
                const data = res.data.boardPage[0];
                setTitle(data.btitle);
                setContent(data.bcon);
            } catch (error) {
                alert("게시글을 못 받아왔습니다.");
            }
        };
        callboardInfoApi();
    }, [bno]);

    const submitClick = async (e) => {
        e.preventDefault();

        const fnValidate = () => {
            if (title === '') {
                sweetalert('제목을 입력해주세요.', '', 'error', '닫기');
                return false;
            }
            if (content === '') {
                sweetalert('내용을 입력해주세요.', '', 'error', '닫기');
                return false;
            }
            return true;
        };

        if (fnValidate()) {
            const jsonData = {
                bno: bno,
                btitle: title,
                bcon: content,
            };

            try {
                const response = await axios.post('http://localhost:8080/board/boardModify', jsonData);
                if (response.data === "succ") {
                    sweetalert('수정이 완료되었습니다.', '', 'success', '확인');
                    setTimeout(() => {
                        navigate('/board/boardList');
                    }, 1500);
                }
            } catch (error) {
                alert('작업 중 오류가 발생하였습니다.');
            }
        }
    };

    const sweetalert = (title, contents, icon, confirmButtonText) => {
        Swal.fire({
            title: title,
            text: contents,
            icon: icon,
            confirmButtonText: confirmButtonText
        });
    };

    return (
        <main id="main">
            <section className="contact">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 section-t8">
                            <form name="frm" id="frm" role="form" onSubmit={submitClick}>
                                <input type="hidden" id="bno" name="bno" value={bno} />
                                <div className="row">
                                    <div className="col-md-12 mb-3">
                                        <h2>자유게시판</h2>
                                        <div className="form-group">
                                            <input type="text" id="btitle" name="btitle" className="form-control form-control-lg form-control-a"
                                                placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <textarea id="bcon" name="bcon" className="form-control" cols="45" rows="8" placeholder="Content"
                                                value={content} onChange={(e) => setContent(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-12 text-center">
                                        <button type="submit" className="btn btn-a">게시글 수정하기</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default BoardModify;