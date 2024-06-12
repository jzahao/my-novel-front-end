import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import NavApp from "./components/app-nav";
import AppRouter from "./components/app-router";
import Footer from "./components/footer";
import SearchBox from "./components/search-box";
import * as userServices from "./services/user.service.js";
import userSlice from "./store/user.slice";
import { serverSelector } from "./store/server.slice.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const server = useSelector(serverSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("mynovel"));
    if (user) {
      userServices.getFavoriteList(server, user.id).then((res) => {
        if (res) {
          dispatch(
            userSlice.actions.login({
              ...user,
              favoriteList: res.data ? res.data.map((item) => item.id) : [],
            })
          );
        }
      });
    }
  }, [dispatch, server]);

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
