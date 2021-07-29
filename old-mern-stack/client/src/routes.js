import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import { MainPage } from "./pages/MainPage";
import { AboutPage } from "./pages/AboutPage";
import { AddWordPage } from "./pages/AddWordPage";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/addword">
          <AddWordPage />
        </Route>
        <Route path="/">
          <MainPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/">
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
