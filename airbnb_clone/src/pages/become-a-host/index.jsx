import React, { useEffect, useState } from 'react';
import { BecomeHostBox, HostIntroBox, HostStageBox } from './styled';
import { Link, withRouter } from 'react-router-dom';

const BecomeHostPage = () => {
    const [stage1, setStage1] = useState(null);
    const [stage2, setStage2] = useState(null);
    const [curStage, setCurStage] = useState(null);

    return (
        <BecomeHostBox>
            {
                !curStage &&
                <HostIntroBox>
                    <div className="host_intro_img">
                        <img src="/images/become_host/img/main.jpg" alt="" />
                        <Link to="/" className="logo">
                            <img src="/images/icons/red_logo.png" alt="" />
                        </Link>
                    </div>
                    <div className="host_intro_body">
                        <div className="tit">간단한 10단계로 호스팅<br />시작하기</div>
                        <div className="content">에어비앤비 호스트가 되어보세요. 에어비앤비에서 모든<br /> 과정을 도와드립니다.</div>
                        <div className="btn">
                            <div className="startBtn" onClick={() => { setCurStage(1) }}>시작하기</div>
                        </div>
                        <Link to="/host/homes" className="exitBtn">나가기</Link>
                    </div>
                </HostIntroBox>
            }
            {
                curStage === 1 &&
                (
                    <HostStageBox>
                        <div className="host_stage_img">
                            <div className="stage_tit">
                                호스팅할 숙소 유형을<br /> 알려주세요.
                                </div>
                            <Link to="/" className="logo">
                                <img src="/images/favicon/favicon.png" alt="" />
                            </Link>
                        </div>
                        <div className="host_stage_body">
                            <div className="stage1_list">
                                <div className={stage1 === 0 ? "s1_opt stage1_on" : "s1_opt"} onClick={() => setStage1(0)}>
                                    <div className="s1_tit">아파트</div>
                                    <img src="/images/become_host/stage1/room1.png" alt="" />
                                </div>
                                <div className={stage1 === 1 ? "s1_opt stage1_on" : "s1_opt"} onClick={() => setStage1(1)}>
                                    <div className="s1_tit">주택</div>
                                    <img src="/images/become_host/stage1/room2.png" alt="" />
                                </div>
                                <div className={stage1 === 2 ? "s1_opt stage1_on" : "s1_opt"} onClick={() => setStage1(2)}>
                                    <div className="s1_tit">별채</div>
                                    <img src="/images/become_host/stage1/room3.png" alt="" />
                                </div>
                                <div className={stage1 === 3 ? "s1_opt stage1_on" : "s1_opt"} onClick={() => setStage1(3)}>
                                    <div className="s1_tit">독특한 숙소</div>
                                    <img src="/images/become_host/stage1/room4.png" alt="" />
                                </div>
                                <div className={stage1 === 4 ? "s1_opt stage1_on" : "s1_opt"} onClick={() => setStage1(4)}>
                                    <div className="s1_tit">B&B</div>
                                    <img src="/images/become_host/stage1/room5.png" alt="" />
                                </div>
                                <div className={stage1 === 5 ? "s1_opt stage1_on" : "s1_opt"} onClick={() => setStage1(5)}>
                                    <div className="s1_tit">부티크 호텔</div>
                                    <img src="/images/become_host/stage1/room6.png" alt="" />
                                </div>
                            </div>
                            <div className="btn">
                                <div className="beforeBtn" onClick={() => setCurStage(null)}>뒤로</div>
                                <div className="nextBtn" onClick={() => setCurStage(2)}>다음</div>
                            </div>
                            <Link to="/host/homes" className="exitBtn">나가기</Link>
                        </div>
                    </HostStageBox>
                )
            }
            {
                curStage === 2 &&
                (
                    <HostStageBox>
                        <div className="host_stage_img">
                            <div className="stage_tit">
                                다음 중 숙소를 가장 잘<br />설명하는 문구는<br />무엇인가요?
                                </div>
                            <Link to="/" className="logo">
                                <img src="/images/favicon/favicon.png" alt="" />
                            </Link>
                        </div>
                        <div className="host_stage_body">
                            <div className="stage2_list">
                                <div className={stage2 === 0 ? "s2_opt stage2_on" : "s2_opt"} onClick={() => setStage2(0)}>
                                    <div className="s2_tit">게스트용 별채</div>
                                    <div className="s2_sub">본채와 필지를 공유하지만 따로 떨어져있는 건물을 의미합니다.</div>
                                </div>
                                <div className={stage2 === 1 ? "s2_opt stage2_on" : "s2_opt"} onClick={() => setStage2(1)}>
                                    <div className="s2_tit">게스트 스위트</div>
                                    <div className="s2_sub">더 큰 구조물의 안에 있거나 나란히 붙어 있는 별도의 공간으로 전용<br />출입구를 갖추고 있습니다.</div>

                                </div>
                                <div className={stage2 === 2 ? "s2_opt stage2_on" : "s2_opt"} onClick={() => setStage2(2)}>
                                    <div className="s2_tit">농장 체험 숙소</div>
                                    <div className="s2_sub">농촌에 있는 숙소로, 게스트가 동물과 교감하거나 등산, 수공예 등의<br />활동을 즐길 수 있는 곳입니다.</div>

                                </div>
                            </div>
                            <div className="btn">
                                <div className="beforeBtn" onClick={() => setCurStage(1)}>뒤로</div>
                                <div className="nextBtn" onClick={() => setCurStage(3)}>다음</div>
                            </div>
                            <Link to="/host/homes" className="exitBtn">나가기</Link>
                        </div>
                    </HostStageBox>
                )
            }



        </BecomeHostBox >
    );
};

export default withRouter(BecomeHostPage);