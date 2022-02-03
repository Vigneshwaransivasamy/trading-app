import React, { useEffect, useState } from "react";
import styled from "styled-components";
import getTradingPairs from "../api/getTradingPairs";
import TradingPairs from "./TradingPairs";

const StyledTradePairsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  max-width: 1072px;
  width: 100%;
  margin: auto;
  @media (max-width: 600px) {
    & {
      grid-template-columns: repeat(auto-fill, minmax(165px, 1fr));
      font-size: 0.85em;
    }
  }
`;

const TradePairsList = () => {
  const [tradingPairs, setTradingPairs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getTradingPairs();
      setTradingPairs(data);
    }
    fetchData();
  }, []);
  return (
    <StyledTradePairsList>
      {tradingPairs.map((tp) => (
        <TradingPairs key={tp.symbol} {...tp} />
      ))}
    </StyledTradePairsList>
  );
};

export default TradePairsList;
