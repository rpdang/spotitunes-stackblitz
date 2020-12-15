import React from "react";
import { Fragment } from "react";
import { useHistory } from "react-router-dom";
import "../../styles/base.css";

const DetailsView = ({
  track,
  addToPlaylist,
  removeFromPlaylist,
  isTrackInPlaylist,
  playlist,
  lyrics,
}) => {
  let history = useHistory();
  return (
    <Fragment>
      <div className="jumbotron text-center">
        <h1 className="display-4">
          {track.title} - {track.artist}
        </h1>
        <button
          onClick={() => history.goBack()}
          className="btn btn-secondary exitButton my-3"
        >
          Go back
        </button>
      </div>
      <div className="container text-center">
        <div className="col">
          <div className="row-sm-4 mb-2">
            {!lyrics ? (
              <p>
                <strong>
                  <mark>Sorry, this track has no lyrics available</mark>
                </strong>
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="row-sm-4">
            <img
              src={track.imgURL[1].url}
              className="img-thumbnail"
              alt=""
            ></img>
            <div className="row-sm-4 my-2">
              <audio controls className="audio-element">
                <source src={track.previewURL}></source>
              </audio>
            </div>
          </div>
          <div className="row-sm-4">
            <button
              onClick={() => {
                addToPlaylist(track);

                history.goBack();
              }}
              className="btn btn-secondary primaryButton mr-2"
              disabled={isTrackInPlaylist || !lyrics || playlist.length === 20}
            >
              Add to playlist
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                removeFromPlaylist(track.id);
                history.goBack();
              }}
              disabled={!isTrackInPlaylist}
            >
              Remove from playlist
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DetailsView;
