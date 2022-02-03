let connectionPromise = null;
export default function startConnection() {
  if (connectionPromise) {
    return connectionPromise;
  }

  connectionPromise = new Promise((resolve, reject) => {
    try {
      const w = new WebSocket("wss://api-pub.bitfinex.com/ws/2");
      w.addEventListener("open", () => resolve);
      w.addEventListener("message", (msg) => console.log(msg));

      w.addEventListener("error", (err) => console.log(err));

      w.addEventListener("close", (ev) => console.log(ev));
      w.send();
    } catch (e) {
      reject(e);
      console.log(e);
    }
  });

  return connectionPromise;
}

export function subscribeTicker(symbol, cb) {
  await startConnection();
  let msg = JSON.stringify({
    event: "subscribe",
    channel: "ticker",
    symbol: "ALL",
  });
}
