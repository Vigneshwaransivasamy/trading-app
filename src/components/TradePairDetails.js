import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import Websocket from "react-websocket";
import moment from "moment";
import HeroTradePair from "./HeroTradePair";

const ClearSpace = styled.div`
  padding: ${({ gapX = 0, gapY = 0 }) => gapY + "px " + gapX + "px"};
  max-width: 670px;
  margin: auto;
`;

const StyledTradePairDetailsWrap = styled.div`
  max-width: 1028px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-flow: column nowrap;
  font-weight: 500;
  padding: 0px 0px 30px 0px;
`;

const StyledDaysPriceWrap = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background: gainsboro;
  justify-content: space-between;
  padding: 10px 10px;
  text-align: left;
  font-size: 14px;
`;

const PriceBlock = styled.div`
  width: 240px;
  height: 50px;
  & > div:first-of-type {
    font-weight: 500;
  }
`;

const StyledMarketTradeWrap = styled.div`
  display: flex;
  flex-direction: column;
  background: gainsboro;
  padding: 10px 10px;
  text-align: left;
`;

const PriceChangeStyle = styled.td`
  color: ${({ isPositive }) => {
    const color = isPositive ? "#26df26" : "#fb6060";
    return color;
  }};
`;

const PriceValueStyle = styled.div`
  color: ${({ isPositive }) => {
    const color = isPositive ? "#26df26" : "#fb6060";
    return color;
  }};
`;

function TradePairDetails({ symbol }) {
  const [channelReady, setChannelReady] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState(null);
  const [tradeData, setTradeData] = useState([]);

  const socketRef = useRef();

  const handleMessage = useCallback(
    (data) => {
      const msg = JSON.parse(data);
      if (subscriptionId === msg[0]) {
        if (!Array.isArray(msg[1]) && msg.length === 2) {
          console.log(subscriptionId, " : received msg", msg[1]);
          return;
        }

        if (msg.length === 3) {
          setTradeData((prevTradeData) => {
            return [
              msg[2],
              ...prevTradeData.filter((d) => {
                const isDifferentMessage = d[0] !== msg[2][0];
                return isDifferentMessage;
              }),
            ];
          });
          return;
        }

        const newMsg = msg[1];
        setTradeData((prevTradeData) => {
          if (prevTradeData.length < 31) {
            return [...newMsg, ...prevTradeData];
          }

          return [
            ...newMsg,
            ...prevTradeData.slice(0, prevTradeData.length - newMsg.length),
          ];
        });
      }

      if (msg.event === "subscribed" && msg.symbol === symbol.actualSymbol) {
        setSubscriptionId(msg.chanId);
      }
    },
    [subscriptionId, symbol.actualSymbol]
  );

  const subscribeTicker = useCallback(() => {
    socketRef.current.sendMessage(
      JSON.stringify({
        event: "subscribe",
        channel: "trades",
        symbol: symbol.actualSymbol,
      })
    );
  }, [symbol]);

  useEffect(() => {
    if (channelReady) {
      subscribeTicker();
    }
    console.log("rerendered on symbol update", symbol);
  }, [symbol, channelReady, subscribeTicker]);

  return (
    <ClearSpace gapX="30">
      <Websocket
        ref={socketRef}
        url="wss://api-pub.bitfinex.com/ws/2"
        onMessage={handleMessage}
        onOpen={() => setChannelReady(true)}
      />
      <StyledTradePairDetailsWrap>
        <HeroTradePair symbol={symbol} />
      </StyledTradePairDetailsWrap>
      <StyledDaysPriceWrap>
        <div>
          <PriceBlock>
            <div>Open Price (0:00) UTC</div>
            <div>{symbol.lastPrice}</div>
          </PriceBlock>
          <PriceBlock>
            <div>Daily Change (0:00) UTC</div>
            <div>
              <PriceValueStyle isPositive={symbol.dailyChangeRelative >= 0}>
                {symbol.dailyChangeRelative >= 0 ? "+" : ""}
                {symbol.dailyChangeRelative}%
              </PriceValueStyle>
            </div>
          </PriceBlock>
          <PriceBlock>
            <div>Top Bid</div>
            <div>{symbol.bid}</div>
          </PriceBlock>
        </div>
        <div>
          <PriceBlock>
            <div>Daily Ask</div>
            <div>{symbol.ask}</div>
          </PriceBlock>
          <PriceBlock>
            <div>Last Price</div>
            <div>{symbol.lastPrice}</div>
          </PriceBlock>
          <PriceBlock>
            <div>24hr range</div>
            <div>
              {symbol.low} - {symbol.high}
            </div>
          </PriceBlock>
        </div>
      </StyledDaysPriceWrap>
      <ClearSpace gapY={5} />
      <StyledMarketTradeWrap>
        <h4>Market Trades</h4>
        {tradeData.length > 0 ? (
          <table>
            <tbody>
              <tr>
                <th>Amount({symbol.symbol.split("/")[0]})</th>
                <th>Price({symbol.symbol.split("/")[1]})</th>
                <th>Time</th>
              </tr>
              {tradeData.map((d) => {
                return (
                  <tr key={d[0]}>
                    <td>{d[2]}</td>
                    <PriceChangeStyle isPositive={d[2] >= 0}>
                      {d[3]}
                    </PriceChangeStyle>
                    <td>{moment(d[1]).format("LTS")}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <h4 style={{ textAlign: "center" }}>Fetching Data...</h4>
        )}
      </StyledMarketTradeWrap>
    </ClearSpace>
  );
}

export default TradePairDetails;
