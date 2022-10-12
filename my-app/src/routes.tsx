import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Home from "./Components/Home/Home";
import SignIn from "./Components/SignIn/SignIn";
import SignUp from "./Components/SignUp/SignUp";

import { isAuthenticated } from "./Services/AuthService/Auth";

const PrivateRoute = ({ children, redirectTo }: { children: any, redirectTo: any }) => {
  return isAuthenticated() ?
    <>
      {children}
    </>
    : <Navigate to={redirectTo} />
}

const NavigationRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/app" element={
        <PrivateRoute redirectTo='/'>
          <Home />
        </PrivateRoute>}>
      </Route>
    </Routes>
  </BrowserRouter>
);

export default NavigationRoutes;