import NavApp from "./components/app-nav";
import AppRouter from "./components/app-router";
import SearchBox from "./components/search-box";
import Footer from "./components/footer";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <NavApp />
      <SearchBox />
      <div className="app-content">
        <AppRouter />
      </div>
      <Footer />
    </div>
  );
}

export default App;
