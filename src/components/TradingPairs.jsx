import styled from "styled-components";

import { useDispatch } from "react-redux";

import { setSymbol } from "../reducer/root";

const StyledTradingPairs = styled.div`
  display: flex;
  color: #333;
  flex-basis: auto;
  flex-direction: column;
  height: 70px;
  background: #f1f1f1;
  justify-content: space-between;
  padding: 18px 15px;
  margin: 5px;
  cursor: pointer;
`;

const PriceChangeStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: ${({ isPositive }) => {
    const color = isPositive ? "#26df26" : "#fb6060";
    return color;
  }};
`;

const SymbolStyle = styled.div`
  text-align: left;
`;

const PriceValueStyle = styled.div`
  max-width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TradingPairs = (props) => {
  const { symbol, lastPrice, dailyChangeRelative } = props;
  const dispatch = useDispatch();
  const isPositive = dailyChangeRelative >= 0;
  return (
    <StyledTradingPairs onClick={() => dispatch(setSymbol(props))}>
      <SymbolStyle>{symbol}</SymbolStyle>
      <PriceChangeStyle data-color={isPositive} isPositive={isPositive}>
        <PriceValueStyle>{lastPrice}</PriceValueStyle>
        <PriceValueStyle>
          {isPositive ? "+" : ""}
          {dailyChangeRelative}%
        </PriceValueStyle>
      </PriceChangeStyle>
    </StyledTradingPairs>
  );
};

export default TradingPairs;
