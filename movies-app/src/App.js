import "./App.scss";
import FilmPage from "./components/FilmPage.js";
import { Provider } from "react-redux";
import store from "./redux/store";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">MOVIES VIEWER</header>
        <div className="App-body">
          <FilmPage />
        </div>
        <footer className="App-footer">
          Copyright belongs to Daniil Denysiuk©
        </footer>
      </div>
    </Provider>
  );
}

export default App;
