import React from "react";
import { useHistory } from "react-router-dom";
import "../../styles/creategame.css";
import "../../styles/base.css";

//lägg till state ex. image i spotify query
//todo: fixa så att det inte krashar när man söker på tom query

const PlaylistSummaryView = ({
  playlist,
  removeFromPlaylist,
  resetPlaylist,
  setCurrentTrack,
  pushToFirebase,
  handleChange,
  isEmpty,
}) => {
  let history = useHistory();
  return (
    <section className="sticky-top">
      <div className="container">
        <h1 className="display-5">Playlist</h1>
        {playlist.length !== 0 ? (
          <div>
            <button
              className="btn btn-danger my-2"
              onClick={() => resetPlaylist()}
            >
              Reset Playlist
            </button>
            <table>
              <tbody>
                {playlist.map((track) => (
                  <tr className="my-2" key={track.id}>
                    <td>
                      <button
                        className="btn btn-sm btn-secondary exitButton mr-1"
                        onClick={() => removeFromPlaylist(track.id)}
                      >
                        x
                      </button>
                    </td>
                    <td
                      onClick={() => {
                        setCurrentTrack(track);
                        history.push({
                          pathname: "/details",
                        });
                      }}
                    >
                      <img
                        className="cardHover rounded shadow my-2 mx-1"
                        src={track.imgURL[2].url}
                        alt="img"
                      ></img>
                    </td>
                    <td
                      onClick={() => {
                        setCurrentTrack(track);
                        history.push({
                          pathname: "/details",
                        });
                      }}
                    >
                      <small>
                        <b>{track.title}</b>
                        <p>{track.artist}</p>
                      </small>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br />
            <p className="lead text-muted">
              <b>Total tracks:</b> {playlist.length}
            </p>
            {playlist.length === 20 ? (
              <p className="text-danger">
                You have reached the maximum limit of tracks! :(
              </p>
            ) : (
              ""
            )}
            <div className="input-group my-2">
              <input
                className="form-control"
                placeholder="Name Your Playlist!"
                onChange={(e) => handleChange(e.target.value)}
              ></input>
              <div className="input-group-append">
                <button
                  className="btn btn-secondary primaryButton"
                  onClick={() => {
                    pushToFirebase();
                    setTimeout(() => {
                      history.push("/gamedetails");
                    }, 500);
                  }}
                  disabled={isEmpty}
                >
                  Save Game!
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="muted">Add up to 20 songs and create your playlist!</p>
        )}
      </div>
    </section>
  );
};

export default PlaylistSummaryView;
