import React, { useEffect, useState } from 'react';
import Footer from '../../components/common/footer';
import Header from '../../components/common/Header';
import { RoomDetailBox, RoomDetailHeader, RoomDetailImgBox, RoomDetailContent, RoomHosterInfo, RoomAboutInfo, RoomDetailInfo, RoomPlace, RoomFacility, ReservationBox, CommentBox, HostingMap } from './styled';
import StarRateIcon from '@material-ui/icons/StarRate';
import PersonIcon from '@material-ui/icons/Person';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { storeCapacity, storeCheckInDate, storeCheckOutDate } from '../../store/reserveInfo';
import SimpleMap from '../../components/common/map';

const RoomDetailPage = ({ history, match }) => {
    const [roomIdx, setRoomIdx] = useState(null);
    const [roomDetailInfo, setRoomDetailInfo] = useState(null);
    const dispatch = useDispatch();

    const [capacity, setCapacity] = useState({
        adult: 1,
        children: 0,
        baby: 0,
    })

    const [capacityModal, setCapacityModal] = useState(false);

    const onClickMinus = (e) => {
        const value = capacity[e.target.name];
        e.target.name === "adult" ?
            (value > 1 && setCapacity({ ...capacity, [e.target.name]: value - 1 }))
            :
            (value > 0 && setCapacity({ ...capacity, [e.target.name]: value - 1 }))
    }

    const onClickPlus = (e) => {
        const value = capacity[e.target.name];
        setCapacity({ ...capacity, [e.target.name]: value + 1 })
    }

    const onMoveBookPage = () => {
        const headCount = document.querySelector(".capacityValue").innerHTML;
        const checkin = document.querySelector(".checkin_date").value;
        const checkout = document.querySelector(".checkout_date").value;

        dispatch(storeCheckInDate(checkin));
        dispatch(storeCheckOutDate(checkout));
        dispatch(storeCapacity(headCount));

        history.push(`/book/${roomIdx}`)
    };

    useEffect(() => {
        setRoomIdx(match.params.roomId);
    }, [match.params.roomId]);

    useEffect(() => {
        const onLoadRoom = async () => {
            const response = await axios.get(`https://dev.rodin.club/rooms/${roomIdx}`);
            setRoomDetailInfo(response.data.result);
        }
        roomIdx && onLoadRoom();
    }, [roomIdx]);

    const [curRoomDetail, setRoomDetail] = useState([]);

    useEffect(() => {
        const onLoadAllRooms = async () => {
            const response = await axios.get("https://dev.rodin.club/rooms");
            const obj = response.data.result.filter(v => v.idx === Number(roomIdx));
            setRoomDetail(obj);
        }
        onLoadAllRooms();
    }, [roomIdx])

    const room = {
        imgURL: ["/images/local/area/area1.png",
            "/images/local/area/area2.png",
            "/images/local/area/area3.png",
            "/images/local/area/area4.png"
            , "/images/local/area/area5.png"],
        sector: "????????? ?????? ?????? ??????",
        moto: "S2 Clean & cozy room right next to Gangnam Station",
        info: ["?????? ?????? 3??? ?? ?????? 1??? ?? ?????? 1??? ?? ?????? 1???", "????????? ?? ?????? ?? ?????? ????????? ?? ?????????"],
        star: "4.74",
        comments: "54",
        heart: false,
        roomId: 1,
        location: "?????????,??????,??????",
        hoster: {
            grade: "???????????????",
            name: "Bella",
        },
        commentList: [
            {
                writer: "??????",
                date: "2021??? 6???",
                comment: "?????? ?????? ????????????",
            },
            {
                writer: "??????",
                date: "2021??? 3???",
                comment: "?????? ????????? ?????? ??? ????????? ?????????. ???????????? ????????? ?????? ?????? ??????",
            },
            {
                writer: "??????",
                date: "2021??? 3???",
                comment: "???????????? ????????????. ?????? ????????? ??????????????? ???????????? ???????????? ?????? ??? ????????????",
            },
            {
                writer: "??????",
                date: "2021??? 3???",
                comment: "????????? ????????? ??????????????? ???????????? ?????? ????????? ???????????? ???????????????",
            },
            {
                writer: "Lee",
                date: "2020??? 12???",
                comment: "????????? ????????? ????????? ????????? ?????? ?????? ??????????????? ??????????????? ???????????????",
            },
            {
                writer: "??????",
                date: "2020??? 12???",
                comment: "???",
            },
        ]
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            {
                roomDetailInfo && (
                    <RoomDetailBox>
                        <Header detail />
                        <div className="RoomDetailBody">
                            <RoomDetailHeader>
                                <div className="roomHeaderTit">{roomDetailInfo.roomName}</div>
                                <div className="roomHeaderBody">
                                    <div className="roomHeaderInfo">
                                        <div>
                                            <StarRateIcon className="stress" />
                                            {/* <div className="grade">{room.star} <span className="comments">(?????? {room.comments}???)</span></div> */}
                                            <div className="grade">5.00 <span className="comments">(?????? 6???)</span></div>
                                        </div>
                                        <div>???</div>
                                        <div>
                                            <PersonIcon className="stress" />
                                            <div>???????????????</div>
                                        </div>
                                        <div>???</div>
                                        <div className="locate">{roomDetailInfo.roomLocation}</div>
                                    </div>

                                    <div className="accessBtn">
                                        <div className="share btn">
                                            <ShareIcon />
                                            <div>????????????</div>
                                        </div>
                                        <div className="store btn">
                                            <FavoriteBorderIcon />
                                            <div>??????</div>
                                        </div>
                                    </div>
                                </div>
                            </RoomDetailHeader>
                            <RoomDetailImgBox>
                                <div className="mainImg">
                                    {/* <img src={room.imgURL[0]} alt="" /> */}
                                    <img src={roomDetailInfo.roomImageUrl} alt="" />
                                </div>
                                <div className="subImg">
                                    <div className="subImg_upper">
                                        {/* <img src={room.imgURL[0]} alt="" /> */}
                                        <img src={roomDetailInfo.roomImageUrl} alt="" />
                                        <img src={roomDetailInfo.roomImageUrl} alt="" />
                                    </div>
                                    <div className="subImg_under">
                                        <img src={roomDetailInfo.roomImageUrl} alt="" />
                                        <img src={roomDetailInfo.roomImageUrl} alt="" />
                                    </div>
                                </div>
                            </RoomDetailImgBox>
                            <RoomDetailContent>
                                <div className="content">
                                    <RoomHosterInfo>
                                        <div className="hosterInfo">Bella?????? ??????????????? {roomDetailInfo.roomKind} ??????</div>
                                        <div className="roomInfo">?????? ?????? {roomDetailInfo.roomCapacity}??? ??? ?????? {roomDetailInfo.roomBedroom}??? ??? ?????? {roomDetailInfo.roomBed}??? ??? ?????? {roomDetailInfo.roomBathroom}???</div>
                                    </RoomHosterInfo>
                                    <RoomAboutInfo>
                                        <div className="aboutItem">
                                            <div className="info_img">
                                                <img className="house" src="/images/detail/icons/home.png" alt="" />
                                            </div>
                                            <div className="info_content">
                                                <div className="list_tit">{roomDetailInfo.roomKind} ??????</div>
                                                <div className="list_txt">{roomDetailInfo.roomDesc} ????????? ???????????? ??????????????? ?????????.</div>
                                            </div>
                                        </div>
                                        <div className="aboutItem">
                                            <div className="info_img">
                                                <img className="clean" src="/images/detail/icons/clean.png" alt="" />
                                            </div>
                                            <div className="info_content">
                                                <div className="list_tit">?????? ??????</div>
                                                <div className="list_txt">?????????????????? ????????? 5?????? ?????? ????????? ?????????????????? ????????? ??????????????????. <span>??? ??????</span></div>
                                            </div>
                                        </div>
                                        <div className="aboutItem">
                                            <div className="info_img">
                                                <img className="checkin" src="/images/detail/icons/checkin.png" alt="" />
                                            </div>
                                            <div className="info_content">
                                                <div className="list_tit">?????? ?????????</div>
                                                <div className="list_txt">???????????? ????????? ??????????????????.</div>
                                            </div>
                                        </div>
                                        <div className="aboutItem">
                                            <div className="info_img">
                                                <img className="medal" src="/images/detail/icons/medal.png" alt="" />
                                            </div>
                                            <div className="info_content">
                                                <div className="list_tit">{room.hoster.name}?????? ????????????????????????.</div>
                                                <div className="list_txt">?????????????????? ????????? ????????? ?????? ????????? ???????????? ???????????? ???????????? ????????? ????????? ??? ????????? ????????? ????????? ??????????????????.</div>
                                            </div>
                                        </div>
                                    </RoomAboutInfo>
                                    <RoomDetailInfo>
                                        <div className="location">{roomDetailInfo.roomLocation}??? ????????? ???????????????.</div>
                                        <div className="detailInfo">
                                            <div>{roomDetailInfo.roomInfo}</div>
                                        </div>
                                    </RoomDetailInfo>
                                    <RoomPlace>
                                        <div className="tit">?????? ??????</div>
                                        <div className="content">
                                            <img src="/images/detail/icons/bed.png" alt="" />
                                            <div className="content_tit">1??? ??????</div>
                                            <div className="content_sub">???????????? ?????? {roomDetailInfo.roomBed}???, ?????? ?????? 1???</div>
                                        </div>
                                    </RoomPlace>
                                    <RoomFacility>
                                        <div className="tit">?????? ????????????</div>
                                        <div className="content">
                                            {
                                                roomDetailInfo.roomConvenient.split(", ").map(v => (
                                                    <li>{v}</li>
                                                ))
                                            }
                                            <div className="seeAllBtn">???????????? {roomDetailInfo.roomConvenient.split(", ").length}??? ?????? ??????</div>
                                        </div>
                                    </RoomFacility>
                                </div>
                                <div className="reservation">
                                    <ReservationBox>
                                        <div className="tit">????????? ??????????????? ?????????<br />???????????????.</div>
                                        <div className="sub">
                                            <StarRateIcon />
                                            <div>5.00 <span>(?????? 6???)</span></div>
                                        </div>
                                        <div className="reserveBox">
                                            <div className="checkInOut">
                                                <div className="checkIn">
                                                    <div className="opt_tit">?????????</div>
                                                    <input className="opt_txt checkin_date" name="checkin" type="date" />
                                                </div>
                                                <div className="checkOut">
                                                    <div className="opt_tit" >????????????</div>
                                                    <input className="opt_txt checkout_date" name="checkout" type="date" />
                                                </div>
                                            </div>
                                            <div className="guest">
                                                <div className="opt_tit">??????</div>
                                                <div className="opt_txt capacityValue">{capacity["baby"] > 0 ? (`????????? ${capacity["adult"] + capacity["children"]}??? ?????? ${capacity["baby"]}???`) : (`????????? ${capacity["adult"] + capacity["children"]}???`)}
                                                </div>
                                                {
                                                    capacityModal ?
                                                        (<KeyboardArrowUpIcon onClick={() => setCapacityModal(!capacityModal)} />)
                                                        :
                                                        (<KeyboardArrowDownIcon onClick={() => setCapacityModal(!capacityModal)} />)
                                                }

                                                <div className={capacityModal ? "capacityBlock" : "capacityBlock modalOff"}>
                                                    <div className="capacity_item">
                                                        <div className="capacity_tit">??????</div>
                                                        <div className="capacity_ctrl">
                                                            <button name="adult" onClick={(e) => onClickMinus(e)}>-</button>
                                                            <div>{capacity["adult"]}</div>
                                                            <button name="adult" onClick={(e) => onClickPlus(e)}>+</button>
                                                        </div>
                                                    </div>
                                                    <div className="capacity_item">
                                                        <div className="capacity_tit">?????????<span>(??? 2~12???)</span></div>
                                                        <div className="capacity_ctrl">
                                                            <button name="children" onClick={(e) => onClickMinus(e)}>-</button>
                                                            <div>{capacity["children"]}</div>
                                                            <button name="children" onClick={(e) => onClickPlus(e)}>+</button>
                                                        </div>
                                                    </div>
                                                    <div className="capacity_item">
                                                        <div className="capacity_tit">??????<span>(??? 2??? ??????)</span></div>
                                                        <div className="capacity_ctrl">
                                                            <button name="baby" onClick={(e) => onClickMinus(e)}>-</button>
                                                            <div>{capacity["baby"]}</div>
                                                            <button name="baby" onClick={(e) => onClickPlus(e)}>+</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="reserveBtn" onClick={onMoveBookPage}>?????? ?????? ?????? ??????</div>
                                    </ReservationBox>
                                </div>
                            </RoomDetailContent>
                            <CommentBox>
                                <div className="grade">
                                    <StarRateIcon />
                                    <div>5.00</div>
                                    <div>???</div>
                                    <div>?????? 6???</div>
                                </div>
                                <div className="commentList">
                                    {
                                        room.commentList.map(v => (
                                            <div className="commentItem">
                                                <div className="header">
                                                    <div className="profile">
                                                        <img src="/images/icons/profile.png" alt="" />
                                                    </div>
                                                    <div className="writer">
                                                        <div className="name">{v.writer}</div>
                                                        <div className="date">{v.date}</div>
                                                    </div>
                                                </div>
                                                <div className="txt">
                                                    <div>{v.comment}</div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="seeAllBtn">?????? 6??? ?????? ??????</div>
                            </CommentBox>
                            <HostingMap>
                                <div className="tit">????????? ??????</div>
                                <div className="location">{roomDetailInfo.roomLocation}</div>
                                {curRoomDetail.length !== 0 && <SimpleMap detail={curRoomDetail} />}
                            </HostingMap>
                        </div >
                        <Footer detail="detail" />
                    </RoomDetailBox >
                )
            }
        </>
    );
};

export default withRouter(RoomDetailPage);
