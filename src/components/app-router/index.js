import { Route, Routes } from "react-router-dom";

import HomePage from "../../pages/home-page";
import DetailPage from "../../pages/detail-page";
import ReadingPage from "../../pages/reading-page";
import SearchByGenrePage from "../../pages/search-result-pages/search-by-genre";
import SearchByYearPage from "../../pages/search-result-pages/search-by-year";

// import ProtectedRoute from "./protectedroute";

function AppRouter() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route exact path="novel/:novelId" element={<DetailPage />} />
      <Route
        exact
        path="novel/:name/chapter/:chapter"
        element={<ReadingPage />}
      />
      <Route exact path="search/genre/:genre" element={<SearchByGenrePage />} />
      <Route exact path="search/year/:year" element={<SearchByYearPage />} />
    </Routes>
  );
}

export default AppRouter;
