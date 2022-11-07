import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Board from "./Components/ContentComponent/Board/Board";
import ContentComponent from "./Components/ContentComponent/ContentComponent";
import Season from "./Components/ContentComponent/Season/Season";
import Skin from "./Components/ContentComponent/Skin/Skin";
import Users from "./Components/ContentComponent/Users/Users";
import GameBoard from "./Components/GameBoard2/Gameboard";
import Home from "./Components/Home/Home";
import JaguarBoard from "./Components/JaguarBoard/JaguarBoard";
import { ActionTypes } from "./reducer/reducer";
import SignIn from "./Components/SignIn/SignIn";
import SignUp from "./Components/SignUp/SignUp";
import { Tabuleiro } from "./misc/GameBoard/Tabuleiro";

import { isAdmin, isAuthenticated, userExist } from "./Services/AuthService/Auth";
import { useContext, useEffect } from "react";
import { ThemeContext } from "./App";
import AuthHelper from "./helpers/AuthHelper";

const PrivateRoute = ({ children, redirectTo }: { children: any, redirectTo: any }) => {

  return isAuthenticated() && userExist() && !isAdmin() ?
    <>
      {children}
    </>
    : <Navigate to={redirectTo} />
}

const PrivateContentComponent = ({ children, ...rest }: any) => {

  return isAuthenticated() && userExist() && isAdmin() ?
    <>
      <ContentComponent screenRender={children} />
    </>
    : <Navigate to={rest.redirectTo} />
}

const NavigationRoutes = () => {

  const { state, dispatch } = useContext(ThemeContext);

  useEffect(() => {
    AuthHelper.restoreAuthFromCache(dispatch);
  }, []);

  const verifyWhatPathChoice = () => {
    return userExist() ? (!isAdmin() ? '/home' : '/config/season') : '/';
  }

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<SignIn />} />

        <Route path="/home" element={
          <PrivateRoute redirectTo={verifyWhatPathChoice()}>
            <Home />
          </PrivateRoute>
        }>
        </Route>

        <Route path="/signup" element={<SignUp />} />

        <Route path="/jaguarboard" element={
          <PrivateRoute redirectTo={verifyWhatPathChoice()}>
            <GameBoard />
          </PrivateRoute>
        }>
        </Route>

        <Route path="/config" element={
          <PrivateContentComponent redirectTo={verifyWhatPathChoice()} />
        }>
        </Route>

        <Route path="/config/user" element={
          <PrivateContentComponent redirectTo={verifyWhatPathChoice()}>
            <Users />
          </PrivateContentComponent>}>
        </Route>

        <Route path="/config/season" element={
          <PrivateContentComponent redirectTo={verifyWhatPathChoice()}>
            <Season />
          </PrivateContentComponent>}>
        </Route>

        <Route path="/config/board" element={
          <PrivateContentComponent redirectTo={verifyWhatPathChoice()}>
            <Board />
          </PrivateContentComponent>}>
        </Route>

        <Route path="/config/skin" element={
          <PrivateContentComponent redirectTo={verifyWhatPathChoice()}>
            <Skin />
          </PrivateContentComponent>}>
        </Route>

        <Route path="*" element={<Navigate to={verifyWhatPathChoice()} replace />} />

      </Routes>

    </BrowserRouter>
  );
}

export default NavigationRoutes;