import "./App.css";
import TradePairDetails from "./components/TradePairDetails";
import TradePairsList from "./components/TradePairsList";
import { useSelector } from "react-redux";

function App() {
  const selectedSymbol = useSelector((state) => state.rootState.selectedSymbol);
  return (
    <div className="App">
      {selectedSymbol ? <TradePairDetails symbol={selectedSymbol} /> : ""}
      <TradePairsList />
    </div>
  );
}

export default App;
