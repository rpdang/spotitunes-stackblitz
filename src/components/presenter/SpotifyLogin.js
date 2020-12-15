import SpotifyLoginView from "../views/SpotifyLoginView";
import apiConfig from "../../apiConfig";
import { Scopes } from "react-spotify-auth";
import { connect } from "react-redux";

const mapStateToProps = () => {
  return {
    redirectUri: apiConfig.redirectUri,
    clientID: apiConfig.client_id,
    scopes: [Scopes.userReadPrivate, Scopes.userReadEmail, Scopes.userTopRead],
  };
};

export default connect(mapStateToProps)(SpotifyLoginView);
