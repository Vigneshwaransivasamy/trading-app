export const formatSymbol = (symbol) => {
  const unPrefixSymbol = symbol.substring(1);
  const symbolSplit = unPrefixSymbol.split(":");
  if (symbolSplit.length === 1) {
    return `${unPrefixSymbol.substr(0, 3)}/${unPrefixSymbol.substr(3)}`;
  }
  return `${symbolSplit[0]}/${symbolSplit[1]}`;
};

export const formatNumber = (number) => {
  return parseFloat(number.toFixed(2));
};

/**
 * 
 * @param {[
    SYMBOL,
    BID, 
    BID_SIZE, 
    ASK, 
    ASK_SIZE, 
    DAILY_CHANGE, 
    DAILY_CHANGE_RELATIVE, 
    LAST_PRICE, 
    VOLUME, 
    HIGH, 
    LOW
  ],} tradePair 

  [
SYMBOL: "tBTCUSD"
BID: 37478
BID_SIZE: 12.621417879999997
ASK: 37479
ASK_SIZE: 24.581938009999995
DAILY_CHANGE: -1444
DAILY_CHANGE_RELATIVE: -0.0371
LAST_PRICE: 37479
VOLUME: 3799.34630944
HIGH: 38923
LOW: 37111
]
 * @returns 
 */
export const restructureTradePair = (tradePair) => ({
  actualSymbol: tradePair[0],
  symbol: formatSymbol(tradePair[0]),
  bid: tradePair[1],
  bidSize: tradePair[2],
  ask: tradePair[3],
  askSize: tradePair[4],
  dailyChange: tradePair[5],
  dailyChangeRelative: tradePair[6],
  lastPrice: tradePair[7],
  volume: tradePair[8],
  high: tradePair[8],
  low: tradePair[9],
});
