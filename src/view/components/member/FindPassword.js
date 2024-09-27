

export default function FindPassword() {
   const submitClick = (e) => {
    e.preventDefault();

    

   }



    return(

        <>
            <div class="login-box">
                <div class="login-logo">
                    <a href="/" style={{ fontWeight: "600" }}><b>Pop<span class="color-b">Pin</span></b></a>
                </div>
                <div class="login-box-body">
                    <p class="login-box-msg"><b>비밀번호 찾기</b>
                    </p>
                    <form onSubmit={submitClick}>
                    <div style={{ marginBottom: "3%" }} class="form-group has-feedback">
                        <input id="userid" type="text" name="mid" class="form-control"
                            placeholder="ID"  />
                    </div>
                    <div style={{ marginBottom: "3%" }} class="form-group has-feedback">
                        <input id="password" type="password" name="mpw" class="form-control"
                            placeholder="E-Mail"  />
                    </div>
                    </form>
                    <div class="row" style={{ textAlign: "center"}}>
                        <p style={{fontSize: ""}}>*회원가입 시 저장한 이메일을 입력하세요.</p>
                        <div class="col-xs-12">
                            <button id="logchkBtn" style={{ backgroundColor: "#2eca6a", borderColor: "#2eca6a", margin: "20px 0px 20px 0px" }} class="btn btn-primary btn-flat btn-findpw">인증메일 전송</button>
                        </div>
                    </div>
                </div>

            </div >
        </>
        
    );

}