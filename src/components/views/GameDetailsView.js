import { useHistory } from "react-router-dom";

const GameDetailsView = ({ current_playlist, startPlaying }) => {
  let history = useHistory();

  return (
    <div className="container">
      <button
        className="btn btn-secondary exitButton my-2"
        onClick={() => history.push("/dashboard")}
      >
        Exit
      </button>
      <h1 className="display-4 lead">Playlist - {current_playlist.name}</h1>
      <h1 className="display-5 lead text-muted">
        Highscore: {current_playlist.highscore}
      </h1>
      <section className="jumbotron text-center">
        <div className="container">
          <div className="row justify-content-center">
            {current_playlist.tracks.map((track) => (
              <div className="col-md-3" key={track.id}>
                <div className="card-mb-4">
                  <img
                    className="card-img-top"
                    src={track.imgURL[0].url}
                    alt="descr"
                  ></img>
                  <div className="card-body">
                    <p className="card-text">
                      <strong>{track.title}</strong>
                      <br />
                      {track.artist}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="container">
        <div className="col">
          <h1 className="display-5 text-muted">
            Total Tracks: {current_playlist.tracks.length}
          </h1>
          <button
            className="btn btn-lg btn-secondary primaryButton ml-10"
            onClick={() => {
              history.push("/play");
              startPlaying();
            }}
          >
            Let's Play!
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameDetailsView;
