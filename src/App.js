import './App.css';
import NavBar from "./components/NavBar/NavBar";
import {BrowserRouter} from "react-router-dom";
import {Context} from "./context/context";
import {Graph} from "./models/Graph";
import AppRouter from "./components/AppRouter";
import {hardcode} from "./utils/hardcode";

function App() {
  let conversion = new Graph();
  let multipliers = {};
  [conversion, multipliers] = hardcode()
  return (
    <Context.Provider value={{
      conversion,
      multipliers
    }}>
      <BrowserRouter>
        <NavBar/>
        <AppRouter/>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
