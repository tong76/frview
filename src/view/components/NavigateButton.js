import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';


/**
 * @param {string} type "버튼 타입(선택사항)"
 * @param {string} [className] "버튼에 추가할 클래스 이름(선택사항)" 
 * @param {string} to "/페이지 이동할 경로"
 * @param {object} state {{ 이동할 경로에 전달할 state 이름(선택사항) }}
 * @param {string} label "버튼에 입력할 문자열" 
 * @returns 페이지 이동 버튼
 */
export default function NavigateButton({ type, className, to, state, label }) {

    const navigate = useNavigate();

    const handleClick = () => {

        if (state) {
            navigate(to, { state });
        } else {
            navigate(to);
        }
    };

    return <button type={type} className={className} onClick={handleClick}>{label}</button>;

}

// PropTypes를 사용한 타입 검사
NavigateButton.propTypes = {
    type: PropTypes.string,
    className: PropTypes.string, 
    to: PropTypes.string.isRequired,
    state: PropTypes.object, 
    label: PropTypes.string.isRequired,
};
