import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Board from "./Components/ConfigsComponent/Board/Board";
import ContentComponent from "./Components/ConfigsComponent/ContentComponent";
import Season from "./Components/ConfigsComponent/Season/Season";
import Skin from "./Components/ConfigsComponent/Skin/Skin";
import Users from "./Components/ConfigsComponent/Users/Users";
import Home from "./Components/Home/Home";
import JaguarBoard from "./Components/JaguarBoard/JaguarBoard";
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

const PrivateContentComponent = ({ children, ...rest }: any) => {
  return isAuthenticated() ?
    <>
      <ContentComponent screenRender={children} />
    </>
    : <Navigate to={rest.redirectTo} />
}

const NavigationRoutes = () => (
  <BrowserRouter>

    <Routes>

      <Route path="/" element={<SignIn />} />

      <Route path="/home" element={
        <PrivateRoute redirectTo='/'>
          <Home />
        </PrivateRoute>
      }>
      </Route>

      <Route path="/signup" element={<SignUp />} />

      <Route path="/jaguarboard" element={
        <PrivateRoute redirectTo='/'>
          <JaguarBoard />
        </PrivateRoute>
      }>
      </Route>

      <Route path="/config" element={
        <PrivateContentComponent redirectTo='/' />
      }>
      </Route>

      <Route path="/config/user" element={
        <PrivateContentComponent redirectTo='/'>
          <Users />
        </PrivateContentComponent>}>
      </Route>

      <Route path="/config/season" element={
        <PrivateContentComponent redirectTo='/'>
          <Season />
        </PrivateContentComponent>}>
      </Route>

      <Route path="/config/board" element={
        <PrivateContentComponent redirectTo='/'>
          <Board />
        </PrivateContentComponent>}>
      </Route>

      <Route path="/config/skin" element={
        <PrivateContentComponent redirectTo='/'>
          <Skin />
        </PrivateContentComponent>}>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>

  </BrowserRouter>
);

export default NavigationRoutes;