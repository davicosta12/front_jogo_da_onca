import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Board from "./Components/ConfigsComponent/Board/Board";
import ConfigsComponent from "./Components/ConfigsComponent/ConfigsComponent";
import Skin from "./Components/ConfigsComponent/Skin/Skin";
import Users from "./Components/ConfigsComponent/Users/Users";
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

const PrivateConfigsRoute = ({ children, ...rest }: any) => {
  return isAuthenticated() ?
    <>
      <ConfigsComponent screenRender={children} />
    </>
    : <Navigate to={rest.redirectTo} />
}

const NavigationRoutes = () => (
  <BrowserRouter>

    <Routes>

      <Route path="/" element={<SignIn />} />

      <Route path="/signup" element={<SignUp />} />

      <Route path="/app" element={
        <PrivateRoute redirectTo='/'>
          <Home />
        </PrivateRoute>
      }>
      </Route>

      <Route path="/config" element={<PrivateConfigsRoute redirectTo='/' />} />

      <Route path="/config/user" element={
        <PrivateConfigsRoute redirectTo='/'>
          <Users />
        </PrivateConfigsRoute>}>
      </Route>

      <Route path="/config/skin" element={
        <PrivateConfigsRoute redirectTo='/'>
          <Skin />
        </PrivateConfigsRoute>}>
      </Route>

      <Route path="/config/board" element={
        <PrivateConfigsRoute redirectTo='/'>
          <Board />
        </PrivateConfigsRoute>}>
      </Route>

    </Routes>

  </BrowserRouter>
);

export default NavigationRoutes;