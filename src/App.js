import NavApp from "./components/app-nav";
import AppRouter from "./components/app-router";
import SearchBox from "./components/search-box";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <NavApp />
      <SearchBox />
      <AppRouter />
    </div>
  );
}

export default App;
