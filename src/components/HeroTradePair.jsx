import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import backIcon from "../assets/images/back.svg";
import switchIcon from "../assets/images/switch.svg";
import { setSymbol } from "../reducer/root";

const HeroTradePairStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 120px;
  text-align: left;
  font-size: 20px;
`;

const TitleSymbol = styled.div`
  display: flex;
  margin: auto 0;
  justify-content: center;
  position: relative;
`;

const TitlePrice = styled.div`
  display: flex;
  flex-direction: column;
`;

const BackIcon = styled.div`
  position: absolute;
  left: 0px;
  top: 4px;
  width: 30px;
  height: 20px;
  background: url(${backIcon}) no-repeat;
  background-size: contain;
  cursor: pointer;
`;

const SwitchIcon = styled.span`
  position: relative;
  top: 3px;
  width: 30px;
  height: 25px;
  background: url(${switchIcon}) no-repeat;
  background-size: contain;
`;

const TitleContentWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  font-size: 16px;
  align-content: space-between;
  & > div {
    margin: 0px 20px 0px 0px;
  }
`;

const PriceValueStyle = styled.div`
  color: ${({ isPositive }) => {
    const color = isPositive ? "#26df26" : "#fb6060";
    return color;
  }};
`;
export default function HeroTradePair({ symbol: currentTradePair }) {
  const dispatch = useDispatch();
  return (
    <HeroTradePairStyle>
      <TitleSymbol>
        <BackIcon onClick={() => dispatch(setSymbol(null))} />
        <SwitchIcon />
        <div>{currentTradePair.symbol}</div>
      </TitleSymbol>
      <TitlePrice>
        <div>{currentTradePair.lastPrice}</div>
        <TitleContentWrap>
          <div>
            ~ {currentTradePair.symbol.split("/")[1]}{" "}
            {currentTradePair.lastPrice}
          </div>
          <PriceValueStyle>
            {currentTradePair.dailyChangeRelative >= 0 ? "+" : ""}
            {currentTradePair.dailyChangeRelative}%
          </PriceValueStyle>
        </TitleContentWrap>
      </TitlePrice>
    </HeroTradePairStyle>
  );
}
