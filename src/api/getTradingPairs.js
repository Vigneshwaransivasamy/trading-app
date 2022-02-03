import axios from "axios"; // Axios library for Node
import { restructureTradePair } from "../dataHelper";
const baseUrl = "https://api-pub.bitfinex.com/v2"; // Domain
const pathParams = "tickers"; // Change based on relevant path params listed in the documentation

export default async function getTradingPairs(queryParams = "ALL") {
  try {
    const proxyUrl = `https://try.readme.io/`;
    const url = `${proxyUrl}${baseUrl}/${pathParams}?symbols=${queryParams}`;
    const response = await axios({ method: "get", url, mode: "cors" });
    const restructuredTradePairs = response.data.reduce(
      (tradePairs, currentData) => {
        // Processing only trading pairs
        if (currentData[0].substr(0, 1) === "t") {
          tradePairs.push(restructureTradePair(currentData));
        }

        return tradePairs;
      },
      []
    );
    return restructuredTradePairs;
  } catch (err) {
    console.log(err);
  }
}
