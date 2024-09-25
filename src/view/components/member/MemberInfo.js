import { useEffect, useState } from 'react';
import axios from 'axios';
import NavigateButton from '../NavigateButton';
import cookie from 'react-cookies';
import { param } from 'jquery';

export default function MemberInfo() {

  const [member, setmember] = useState(null); // 전체 회원 목록 저장
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(null); // 에러 상태 관리
  
  useEffect(() => {
    const userid = cookie.load('userid');

    if (!userid) {
      setError(new Error("로그인 정보가 없습니다."));
      setLoading(false);
      alert("로그인이 필요합니다.");
      return;
    }


    axios.get('http://localhost:8080/api/memberinfo',{
      
      params: {userid}

      })     
      .then(response => {
        setmember(response.data); // 특정 회원의 데이터를 상태에 저장
        setLoading(false); // 로딩 상태 해제
      })
      .catch(error => {
        setError(error); // 에러 상태 저장
        setLoading(false); // 로딩 상태 해제
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!member) return <p>회원 정보를 찾을 수 없습니다.</p>;
  
  


  return (
    <div>
      <section className="intro-single">
        <div className="container">

          <div className="row">
            <div className="col-md-12 col-lg-8">
              <div className="title-single-box">
                <h1 className="title-single">회원정보</h1>
                <span className="color-text-a">{member.mname} 회원님, 안녕하세요!</span>
              </div>
            </div>

            <div className="col-md-12 col-lg-4">
              <nav aria-label="breadcrumb" className="breadcrumb-box d-flex justify-content-lg-end">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">홈</a></li>
                  <li className="breadcrumb-item active" aria-current="page">회원정보</li>
                </ol>
              </nav>
            </div>

          </div>
        </div>
      </section>

      <main id="main-info">
        <section className="content">

          <div className="container">
            <div className="subindex_greenbox">
              <div className="row-Flex">

                <ul className="subindex_row">
                  <li className="row_item" id="mid">
                    <div className="item_text">
                      <span className="item_text">아이디</span>
                    </div>
                  </li>
                  <li className="row_item" id="mpw">
                    <div className="item_text">
                      <span className="item_text">비밀번호</span>
                    </div>
                  </li>
                  <li className="row_item" id="mname">
                    <div className="item_text">
                      <span className="item_text">이름</span>
                    </div>
                  </li>
                  <li className="row_item" id="mcell">
                    <div className="item_text">
                      <span className="item_text">휴대폰번호</span>
                    </div>
                  </li>
                  <li className="row_item" id="memail">
                    <div className="item_text">
                      <span className="item_text">이메일</span>
                    </div>
                  </li>
                  <li className="row_item" id="mdate">
                    <div className="item_text">
                      <span className="item_text">가입일</span>
                    </div>
                  </li>
                </ul>







                <div className="left-line">
                  <ul className="subindex_row">
                    <li className="row_item" >
                      <div className="item_text">
                        <span className="item_text">{member.mid}</span>
                      </div>
                    </li>
                    <li className="row_item">
                      <div className="item_text">
                        <span className="item_text">**********</span>
                      </div>
                    </li>
                    <li className="row_item">
                      <div className="item_text">
                        <span className="item_text">{member.mname}</span>
                      </div>
                    </li>
                    <li className="row_item">
                      <div className="item_text">
                        <span className="item_text">{member.mcell}</span>
                      </div>
                    </li>
                    <li className="row_item">
                      <div className="item_text">
                        <span className="item_text">{member.memail}</span>
                      </div>
                    </li>
                    <li className="row_item">
                      <div className="item_text">
                        <span className="item_text">{member.mdate}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="info-footer">
              <div className="row-Flex">
                <div className="modifyPageBtn">
                  <NavigateButton className="green-button btn button-text" to="/member/modifyinfo" state={{member}} label= "회원정보수정" />                  
                </div>
                <div className="removeInfoBtn">
                <NavigateButton className="green-button btn button-text" to= "/member/removeinfo" label= "탈퇴"/>
                </div>
              </div>
            </div>


          </div>
        </section>
      </main>





    </div>
  );
}
