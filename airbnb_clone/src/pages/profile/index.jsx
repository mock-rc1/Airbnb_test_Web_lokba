import React, { useEffect, useState } from 'react';
import Header from '../../components/common/Header';
import { CommentBox, MyCommentBox, ProfileBox, ProfileInfoBox, ProfilePageBlock } from './styled';
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
import HomeIcon from '@material-ui/icons/Home';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import StarIcon from '@material-ui/icons/Star';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../../store/userInfo';

const ProfilePage = () => {
    const [openModifyBox, setOpenModifyBox] = useState(false);
    const { userId, userData } = useSelector(({ userInfo }) => ({
        userId: userInfo.userIdx,
        userData: userInfo.userData,
    }));

    const dispatch = useDispatch();

    useEffect(() => {
        const headers = {
            "x-access-token": localStorage.getItem('ACCESS_TOKEN')
        };
        const loadUser = async () => {
            const response = await axios.get(`https://dev.rodin.club/users/${userId}`, { headers });
            dispatch(getUserInfo(response.data.result));
        }
        loadUser();
    }, [userId, dispatch, openModifyBox]);


    const [myInfo, setMyInfo] = useState({
        userIntro: "",
        userLocation: "",
        userOffice: "",
        userLanguage: "",
    });

    const onChange = (e) => setMyInfo({ ...myInfo, [e.target.name]: e.target.value });

    const onModifyInfo = () => {
        const headers = {
            'x-access-token': localStorage.getItem("ACCESS_TOKEN")
        };

        const modifyUser = async () => {
            await axios.patch(`https://dev.rodin.club/users/${userId}`, myInfo, { headers });
        }
        modifyUser();
        setOpenModifyBox(false);
    }

    return (
        <>
            {
                userData && (
                    <ProfilePageBlock>
                        <Header profile />
                        <div className="profile_body">
                            <ProfileBox>
                                <div className="profileImg">
                                    <img src="/images/icons/profile.png" alt="" />
                                    <div>?????? ??????????????????</div>
                                </div>
                                <div className="verify">
                                    <VerifiedUserOutlinedIcon />
                                    <div className="verify_tit">?????? ??????</div>
                                    <div className="verify_txt">?????? ?????? ????????? ?????? ?????? ?????????<br /> ???????????? ????????? ?????? ??????????????? ?????????<br /> ??? ????????????.</div>
                                    <button>?????? ??????</button>
                                </div>
                            </ProfileBox>
                            <ProfileInfoBox>
                                <header>
                                    <div className="title">???????????????. ?????? {userData.userName}?????????.</div>
                                    <div className="register">?????? ?????? : {userData.createdAt.slice(0, 10)}</div>
                                    <u className={openModifyBox && "open"} onClick={() => setOpenModifyBox(true)}>????????? ????????????</u>
                                </header>
                                <body>
                                    {
                                        openModifyBox ?
                                            (
                                                <>
                                                    <div className="open_intro">
                                                        <div className="open_tit">??????</div>
                                                        <textarea placeholder={userData.userIntro} onChange={onChange} name="userIntro" />
                                                    </div>
                                                    <div className="open_location">
                                                        <div className="open_tit">??????</div>
                                                        <input name="userLocation" placeholder={userData.userLocation} onChange={onChange} className="inputBox" />
                                                    </div>
                                                    <div className="open_company">
                                                        <div className="open_tit">??????</div>
                                                        <input name="userOffice" placeholder={userData.userOffice} onChange={onChange} className="inputBox" />
                                                    </div>
                                                    <div className="ctrl">
                                                        <button className="cancelBtn" onClick={() => setOpenModifyBox(false)}>??????</button>
                                                        <button className="storeBtn" onClick={onModifyInfo}>??????</button>
                                                    </div>
                                                </>
                                            )
                                            :
                                            (
                                                <>
                                                    {
                                                        userData.userOffice &&
                                                        <div className="intro">
                                                            <div className="intro_tit">??????</div>
                                                            <div className="intro_txt">{userData.userIntro}</div>
                                                        </div>
                                                    }
                                                    {
                                                        userData.userOffice &&
                                                        <div className="info">
                                                            <HomeIcon />
                                                            <div>{userData.userLocation}</div>
                                                        </div>
                                                    }
                                                    {
                                                        userData.userOffice &&
                                                        <div className="info">
                                                            <LocalMallIcon />
                                                            <div>{userData.userOffice}</div>
                                                        </div>
                                                    }
                                                </>
                                            )
                                    }
                                </body>
                                <CommentBox>
                                    <div className="tit">
                                        <StarIcon />
                                        <div>?????? 0???</div>
                                    </div>
                                </CommentBox>
                                <MyCommentBox>
                                    <div className="tit">?????? ????????? ??????</div>
                                </MyCommentBox>
                            </ProfileInfoBox>
                        </div>
                    </ProfilePageBlock>
                )
            }
        </>
    );
};

export default ProfilePage;