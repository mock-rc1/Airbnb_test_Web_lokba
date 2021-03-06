import styled, { css } from "styled-components";

// color:#ff5a60;   에어비앤비 대표 컬러

export const HeaderBox = styled.div`
    display:flex;
    align-items: center;
    justify-content: space-between;
    
    height:80px;
    padding: 0 80px;

    ${props =>
        props.local_area && css`
        padding:0 24px;
    `}

    ${props =>
        props.travel && css`
        padding:0 24px;
    `}

    ${props =>
        props.book && css`
        padding: 0 24px;
    `}

    ${props =>
        props.detail && css`
        padding:0 12%;
    `}

    position:fixed;
    left:0;
    right:0;
    top:58px;

    background:white;
    z-index:1000;
    box-shadow:0px 3px 3px 0px #DDDDDD;
    
    /* border:1px solid gray; */
    
    .logoArea{
        display:flex;
        align-items: center;
        cursor:pointer;
        width:300px;
        text-decoration:none;
        
        .logoImg{
            margin-right:7px;
        }
        .logoTxt{
            color:#ff5a60;
            font-size:22px;
            font-weight:800;
            padding-top:4px;
        }
    }

    .inputArea{
        padding-left:8px;
        position: relative;
        cursor:pointer;

        .inputBox{
            display:flex;
            align-items: center;
            width:300px;
            height:48px;
            border-radius:30px;
            border:1px solid #DDDDDD;
            padding-left:16px;
            font-size:14px;
            color:black;
            font-weight:500;
            box-shadow:0px 3px 3px 0px #DDDDDD;

            .inputTxt{
                display:flex;
                width:230px;
                
                .area{
                    padding:0 12px;
                    cursor:pointer;
                }
                .date{
                    padding:0 12px;
                    border-left : 2px solid #DDDDDD;
                    border-right : 2px solid #DDDDDD;
                    cursor:pointer;
                }
                .guest{
                    padding:0 12px;
                    cursor:pointer;
                    color:#717171;
                }
            }
            .localArea{
                justify-content:center;
            }
        }

        .inputIconBox{
            position:absolute;
            right:8px;
            top:8px;
            width:32px;
            height:32px;
            background:#ff5a60;
            border:none;
            border-radius:50%;

            
            .inputIcon{
                position:absolute;
                color:white;
                top:8px;
                left:9px;
            }
        }
    }


    .infoArea{
        display:flex;
        align-items: center;
        font-size:14px;
        height:44px;
        width:300px;
        justify-content: flex-end;

        .info_host{
            cursor:pointer;
            margin-top:3px;
            height:100%;
            display:flex;
            align-items: center;
            justify-content: center;
            border-radius:50px;
            padding:0 10px;
            text-decoration: none;
            color:black;

            &:hover{
                background :#f8f9fa;
            }
        }

        .info_lang{
            cursor:pointer;
            margin-right:5px;
            width:45px;
            height:100%;
            border-radius: 50%;
            display:flex;
            justify-content: center;
            align-items: center;

            svg{
                width:20px;
                height:20px;
            }

            &:hover{
                background :#f8f9fa;
            }
        }

        .info_profile{
            display:flex;
            align-items: center;
            border-radius:50px;
            border:1px solid #DDDDDD; 
            height:100%;
            width:77px;
            padding:0 7px;
            box-sizing:border-box;
            position:relative;

            .profile_box{
                display:flex;
                align-items: center;
                justify-content: space-between;
                width:100%;

                svg{
                    width:20px;
                    height:20px;
                }
                img{
                    width:33px;
                    height:33px;
                    border-radius:50%;
                }
                cursor:pointer;
            }

            &:hover{
                box-shadow:0px 3px 3px 0px #DDDDDD;
            }
            
            .profile_option{
                position:absolute;
                width:240px;
                top:55px;
                border:1px solid #DDDDDD;
                right:0;
                z-index:1000;
                /* padding:15px; */
                padding:10px 0;
                background:white;
                border-radius:15px;

                a{
                    display:block;
                    text-decoration: none;
                    color:black;
                }
                
                div,a{
                    font-size:14px;
                    padding:14px 15px;
                    cursor:pointer;

                    &:hover{
                        background :#f8f9fa;
                    }
                }
                .bar{
                    display:block;
                    margin:5px 0;
                    width:100%;
                    border:1px solid #DDDDDD;
                }

                .stress{
                    font-weight:700;
                }


            }
            
        }
        
    }
    
    //숙소 예약 페이지에서는 검색창과 프로필이 없기 때문이다.
    .book{
        display:none;
    }
    
`;