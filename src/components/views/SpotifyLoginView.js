import React from "react";
import { SpotifyAuth } from "react-spotify-auth";
import logo from "../img/logotype.svg";
import "react-spotify-auth/dist/index.css";

const SpotifyLogin = ({ redirectUri, clientID, scopes }) => {
  return (
    <div className="d-flex flex-sm-column justify-content-center align-items-center my-5">
      <img src={logo} alt="Logo" />
      <h2 className="display-5 my-3">
        Please log in to your Spotify Premium Account to start
      </h2>
      <SpotifyAuth
        redirectUri={redirectUri}
        clientID={clientID}
        scopes={scopes}
      />
    </div>
  );
};

export default SpotifyLogin;
