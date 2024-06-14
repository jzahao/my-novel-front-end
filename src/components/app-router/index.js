import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import HomePage from "../../pages/home-page";
import SignIn from "../../pages/auth/signin";
import SignUn from "../../pages/auth/signup";
import DetailPage from "../../pages/detail-page";
import ReadingPage from "../../pages/reading-page";
import SearchByGenrePage from "../../pages/search-result-pages/search-by-genre";
import SearchByKeywordPage from "../../pages/search-result-pages/search-by-keyword";
import MyFavorite from "../../pages/my-favorite-page";
import { userSelector } from "../../store/user.slice";

import ProtectedRoute from "./protectedroute";

function AppRouter() {
  const user = useSelector(userSelector);

  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route exact path="/novel/:novelId" element={<DetailPage />} />
      <Route
        exact
        path="/novel/:id/chapter/:chapter"
        element={<ReadingPage />}
      />
      <Route exact path="/genre/:genre" element={<SearchByGenrePage />} />
      <Route exact path="/search/:keyword" element={<SearchByKeywordPage />} />

      <Route
        element={<ProtectedRoute isAllowed={!user.isLogin} redirectPath="/" />}
      >
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUn />} />
      </Route>

      <Route
        element={
          <ProtectedRoute isAllowed={user.isLogin} redirectPath="/signin" />
        }
      >
        <Route exact path="/my-favorite" element={<MyFavorite />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
