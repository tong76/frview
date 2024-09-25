import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { event } from "jquery";

export default function ModifyInfo() {

    const location = useLocation();
    const navigate = useNavigate();
    const { member: initialMember } = location.state || {};

    if (!initialMember) {
        console.log("상태를 전달받지 못했습니다.")
    }

    const [member, setMember] = useState(initialMember);
    const [pwdChk, setPwdChk] = useState("");

    const handleChange = (e) => {
        const {name, value} = e.target;
        setMember(
            (prevMember) => ({
                ...prevMember,
                [name]: value,
            })
            
        );
    }
    const hadlePwdChk = (e) => {
        setPwdChk(e.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(member.mpw !== pwdChk){
            alert("비밀번호가 일치하지 않습니다.");
            return;
            
        }
        try {
            const response = await axios.post("http://localhost:8080/api/modifyinfo", member)
        
        if(response.status == 200){
            alert("회원정보가 성공적으로 수정되었습니다.")
        }
    } catch (error) {
        console.error("에러 발생:", error);
        alert("오류가 발생했습니다.")
    }
};



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
                    <form onSubmit={handleSubmit} method="post">
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
                                    <li className="row_item" id="mpw">
                                        <div className="item_text">
                                            <span className="item_text">비밀번호확인</span>
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
                                </ul>





                                <div className="left-line">
                                    <ul className="subindex_row">
                                        <li className="row_modi memberId" >
                                            <div className="item_text">
                                                <input className="item_text input-green" name="mid" value={member.mid} onChange={handleChange} required />
                                            </div>
                                        </li>
                                        <li className="row_modi memberPwd">
                                            <div className="item_text">
                                                <input type="password" className="item_text input-green" name="mpw" value={member.mpw} onChange={handleChange} required />
                                            </div>
                                        </li>
                                        <li className="row_modi memberPwdChk">
                                            <div className="item_text">
                                                <input type="password" className="item_text input-green" name="confirmPassword" value={pwdChk} onChange={hadlePwdChk} required />
                                            </div>
                                        </li>
                                        <li className="row_modi memberName">
                                            <div className="item_text">
                                                <input className="item_text input-green" name="mname" value={member.mname} onChange={handleChange} required />
                                            </div>
                                        </li>
                                        <li className="row_modi phone">
                                            <div className="item_text">
                                                <input className="item_text input-green" name="mcell" value={member.mcell} onChange={handleChange} required />                                            </div>
                                        </li>
                                        <li className="row_modi email">
                                            <div className="item_text">
                                                <input className="item_text input-green" name="memail" value={member.memail} onChange={handleChange} required />                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="modInfo-footer">

                            <div className="memberInfoBtn">
                                <button type="submit" className="green-button btn button-text">수정완료</button>
                            </div>
                        </div>
                    </form>

                </div>
            </section>
        </main>





    </div>
);
}