import React, { useEffect, useState } from 'react';
import { ErrorMessage, HeaderBox, InputBox, SignModal, SubmitButton } from './styled';
import { BiSearch } from "react-icons/bi";
import { MdLanguage } from "react-icons/md";
import { IoIosMenu } from "react-icons/io";
import { Link, withRouter } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import InputModel from '../InputBox';

const Header = ({ match, flex_search, local_area, travel }) => {

    const [onProfile, setOnProfile] = useState(false);
    const [signModal, setSignModal] = useState(false);
    const [signStage, setSignStage] = useState(1);
    const [error, setError] = useState(false);

    const clickStageTwoBtn = () => {
        const email = document.querySelector(".email");

        if (email.value.length === 0) {
            setError("*이메일이 필요합니다.");
        }
        else {
            setSignStage(4);
            setError(false);
        }
    }

    const onCloseModal = () => {
        setSignModal(false);
        setSignStage(1);
        setError(false);
    }

    useEffect(() => {
        const header = document.querySelector('.headerBox');

        if (header) {
            if (match.url === '/') {
                window.addEventListener('scroll', () => {
                    if (window.pageYOffset >= 0 && window.pageYOffset < 58) {
                        const top = 58 - `${window.pageYOffset}`;

                        header.style.top = `${top}px`;
                    }
                    else {
                        header.style.top = '0px';
                    }
                });
            }
            else {
                header.style.top = '0px';
            }
        }

    }, [match.url]);




    return (
        <HeaderBox className="headerBox" local_area={local_area} travel={travel}>
            <Link to="/" className="logoArea">
                <img className="logoImg" src="/images/icons/red_logo.png" alt="" />
                <div className="logoTxt">airbnb</div>
            </Link>
            {
                flex_search ?
                    (
                        <>
                        </>
                    ) :
                    local_area ?
                        (
                            <div className="inputArea">
                                <div className="inputBox">
                                    <div className="inputTxt localArea">
                                        <div className="area">{local_area}</div>
                                        <div className="date">날짜 입력</div>
                                        <div className="guest">게스트 추가</div>
                                    </div>
                                </div>
                                <div className="inputIconBox">
                                    <BiSearch className="inputIcon" />
                                </div>
                            </div >
                        )
                        :
                        (
                            <div className="inputArea">
                                <div className="inputBox">
                                    <div className="inputTxt">
                                        검색 시작하기
                                    </div>
                                </div>
                                <div className="inputIconBox">
                                    <BiSearch className="inputIcon" />
                                </div>
                            </div >
                        )

            }

            <div className="infoArea">
                <div className="info_host">호스트 되기</div>
                <div className="info_lang">
                    <MdLanguage />
                </div>
                <div className="info_profile">
                    <div className="profile_box" onClick={() => setOnProfile(!onProfile)}>
                        <IoIosMenu />
                        <img src="/images/icons/profile.png" alt="" />
                    </div>

                    {
                        onProfile && (
                            <div className="profile_option">
                                <div className="login" onClick={() => { setSignModal(true); setOnProfile(!onProfile) }}>로그인</div>
                                <div className="register" onClick={() => { setSignModal(true); setOnProfile(!onProfile) }}>회원가입</div>
                                <span className="bar"></span>
                                <div className="host">숙소 호스트 되기</div>
                                <div className="help">도움말</div>
                            </div>
                        )
                    }
                </div>
            </div>
            {
                signModal && (
                    <SignModal>
                        {
                            signStage === 1 && (
                                <div className="modal_box stage1">
                                    <div className="modal_header">
                                        <CloseIcon className="closeIcon" onClick={onCloseModal} />
                                        <div>로그인 또는 회원 가입</div>
                                    </div>
                                    <div className="stage1_content">
                                        <div className="sign_btn" onClick={() => setSignStage(2)}>
                                            <img src="/images/icons/mail.png" alt="" />
                                            <div>이메일로 로그인하기</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        {
                            signStage === 2 && (
                                <div className="modal_box stage2">
                                    <div className="modal_header">
                                        <CloseIcon className="closeIcon" onClick={onCloseModal} />
                                        <div>로그인 또는 회원 가입</div>
                                    </div>
                                    <div className="stage2_content">
                                        <div className="stage2_tit">에어비앤비에 오신 것을 환영합니다.</div>
                                        <div className="inputBox">
                                            <InputModel txt="이메일" />
                                            {error && <ErrorMessage>{error}</ErrorMessage>}
                                        </div>
                                        <SubmitButton onClick={() => clickStageTwoBtn()}>계속</SubmitButton>
                                    </div>
                                </div>
                            )
                        }
                        {
                            //회원 가입이 되어 있는 상태일 경우 -> 비밀번호 입력하는 곳
                            signStage === 3 && (
                                <div className="modal_box stage3">
                                    <div className="modal_header">
                                        <NavigateBeforeIcon className="beforeIcon" onClick={() => setSignStage(2)} />
                                        <div>로그인</div>
                                    </div>
                                    <div className="stage3_content">
                                        {/* <div className="inputBox">
                                            <InputBox className="password" placeholder="비밀번호" />
                                            {error && <ErrorMessage>{error}</ErrorMessage>}
                                        </div> */}
                                        <SubmitButton>로그인</SubmitButton>
                                    </div>
                                </div>
                            )
                        }
                        {
                            //회원 가입 하는 곳
                            signStage === 4 && (
                                <div className="modal_box stage4">
                                    <div className="modal_header">
                                        <NavigateBeforeIcon className="beforeIcon" onClick={() => setSignStage(2)} />
                                        <div>회원 가입 완료하기</div>
                                    </div>
                                    <div className="stage4_content">
                                        <div className="inputBox">
                                            {/* <InputBox placeholder="이름(예: 길동)" />
                                            <div className=""></div>
                                            <InputBox placeholder="성(예: 홍)" />
                                            <div>정부 발급 신분증에 표시된 이름과 일치하는지 확인하세요.</div>
                                            <InputBox placeholder="생년월일" />
                                            <div>만 18세 이상의 성인만 회원으로 가입할 수 있습니다. 생일은 에어비앤비의 다른 회원에게 공개되지 않습니다.</div>
                                            <InputBox placeholder="" />
                                            <div>예약 확인과 영수증을 이메일로 보내드립니다.</div>
                                            <InputBox placeholder="" />
                                            <div>아래의 동의 및 계속하기 버튼을 선택하면, 에어비앤비의 서비스 약관, 결제 서비스 약관, 개인정보 처리방침, 차별 금지 정책에 동의하는 것입니다.</div> */}
                                        </div>
                                        <SubmitButton>동의 및 계속하기</SubmitButton>
                                        <div>에어비앤비 회원 전용 할인, 추천 여행 정보, 마케팅 이메일, 푸시 알림을 보내드립니다. 계정 설정 또는 마케팅 알림에서 언제든지 메세지 수신을 거부할 수 있습니다.</div>
                                        <div>
                                            <CheckBoxOutlineBlankIcon />
                                            <div>에어비앤비에서 보내는 마케팅 메시지를 받고 싶지 않습니다.</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </SignModal>
                )
            }
        </HeaderBox >
    );
};

export default withRouter(Header);


//inputBox 수정하기


