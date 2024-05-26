import { Route, Routes } from "react-router-dom";

import HomePage from "../../pages/home-page";
import DraftPage from "../../pages/draftpage";
import SignIn from "../../pages/auth/signin";
import SignUn from "../../pages/auth/signup";

// import ProtectedRoute from "./protectedroute";

function AppRouter() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route exact path="/draft" element={<DraftPage />} />
      <Route exact path="/signin" element={<SignIn />} />
      <Route exact path="/signup" element={<SignUn />} />
    </Routes>
  );
}

export default AppRouter;
