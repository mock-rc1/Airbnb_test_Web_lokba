import styled from "styled-components";

export const CoronaBox = styled.div`
    width:100%;
    height:58px;
    display:flex;
    justify-content: center;
    align-items: center;
    background: #222222;
    position:absolute;
    top:0;
    z-index:100;

    .corona_alert{
        color:#a3a3a3;
        text-decoration:underline;
        cursor:pointer;
        font-size:14px;
    }
`;
