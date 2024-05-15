import { Route, Routes } from "react-router-dom";

import HomePage from "../../pages/home-page";
import DraftPage from "../../pages/draftpage";

// import ProtectedRoute from "./protectedroute";

function AppRouter() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route exact path="/draft" element={<DraftPage />} />
    </Routes>
  );
}

export default AppRouter;
