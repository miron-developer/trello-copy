import { Provider } from "react-redux";

import { store } from "@/store/index";
import Desk from "@/components/desk/desk";

import "./App.scss";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <Desk />
      </div>
    </Provider>
  );
}

export default App;
