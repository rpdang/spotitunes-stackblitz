import SpotifyLogin from "./components/presenter/SpotifyLogin";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import RedirectPage from "./components/presenter/Redirect";
import Dashboard from "./components/presenter/Dashboard";
import PlaylistSummary from "./components/presenter/PlaylistSummary";
import Details from "./components/presenter/Details";
import store from "./redux/store";
import { Provider } from "react-redux";
import Search from "./components/presenter/Search";
import InfoPage from "./components/presenter/InfoPage";
import React from "react";
import Play from "./components/presenter/Play";
import GameDetails from "./components/presenter/GameDetails";
import Result from "./components/presenter/Play";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <BrowserRouter>
          <Switch>
            <Redirect exact from="/" to="/login" />

            <Route path="/infopage">
              <InfoPage />
            </Route>

            <Route path="/login">
              <SpotifyLogin />
            </Route>

            <Route path="/callback">
              <RedirectPage />
            </Route>

            <Route path="/dashboard">
              <Dashboard />
            </Route>

            <Route path="/gamedetails">
              <GameDetails />
            </Route>

            <Route path="/details">
              <Details />
            </Route>
            <Route path="/play">
              <Play />
            </Route>

            <Route path="/create">
              <div className="creategamebase justify-content-between col-sm-20 col-md-11 py-2">
                <React.Fragment>
                  <div className="elem search">
                    <Search />
                  </div>
                  <div className="playlist">
                    <PlaylistSummary />
                  </div>
                </React.Fragment>
              </div>
            </Route>

            <Route path="/result">
              <Result />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
};

export default App;
