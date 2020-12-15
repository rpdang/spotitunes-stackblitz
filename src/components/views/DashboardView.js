import React from "react";
import { useHistory } from "react-router-dom";
import "../../styles/dashboard.css";
import "../../styles/base.css";

let count = 0;

const DashboardView = ({
  userDetails: { name, score },
  playlists,
  updateCurrentPlaylist,
  searchPlaylist,
  userSignOut,
}) => {
  let history = useHistory();
  return (
    <div>
      <main role="main">
        <div className="navbar navbar-dark box-shadow dashboardNavBar">
          <div className="container d-flex justify-content-between">
            <div className="row">
              <div className="col-sm-8 col-md-7 py-4">
                <h4 className="lead font-italic font-weight-bold text-white">
                  Spotitunes
                </h4>
              </div>

              <button
                className="btn btn-secondary exitButton p-2 my-3 mr-5 signOutBtn"
                onClick={() => userSignOut()}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
        <div className="container text-center mt-4 mb-4">
          <h1 className="jumbotron-heading">Welcome {name}!</h1>
          <div className="btn-group" role="group" aria-label="Basic example">
            <button
              className="btn btn-lg btn-secondary primaryButton my-1 mx-1"
              onClick={() => {
                localStorage.clear();
                history.push("/create");
              }}
            >
              Create Game
            </button>
            <button
              className="btn btn-lg btn-secondary infoBtn my-1 mx-1"
              onClick={() => history.push("/infopage")}
            >
              Info
            </button>
          </div>
          <input
            className="form-control my-2"
            placeholder="Search for playlists here or pick one existing below!"
            onChange={(e) => searchPlaylist(e.target.value)}
          ></input>
        </div>
        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row">
              {playlists
                ? playlists.map((playlist) => (
                    <div className="col-md-4" key={count++}>
                      <div
                        className="card mb-4 shadow cardHover"
                        onClick={() => {
                          updateCurrentPlaylist(playlist);
                          history.push("/gamedetails");
                        }}
                      >
                        <img
                          className="card-img-top"
                          src={playlist.tracks[0].imgURL[1].url}
                          alt="descr"
                        ></img>
                        <div className="card-body">
                          <p className="card-text">
                            Playlist - {playlist.name}
                          </p>
                          <small className="text-muted">
                            Highscore : {playlist.highscore}
                          </small>
                        </div>
                      </div>
                    </div>
                  ))
                : ""}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardView;
