import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useHistory } from "react-router";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Play from "../img/play-btn.svg";
import Pause from "../img/pause-btn.svg";
import { Fragment } from "react";
import "../../styles/base.css";
import "../../styles/play.css";

export const PlayView = ({
  lyricTokens,
  playlist,
  audioControl,
  stopPlaying,
  playingMusic,
  setStartVolume,
  renderTime,
  nextSong,
  totalscore,
  timeScore,
  sortingScore,
  songCounter,
  end,
  pushToFirebase,
  originalLyrics,
}) => {
  let history = useHistory();
  return (
    <div>
      {!end ? (
        <div>
          <audio autoPlay loop id="audioPlay" className="audio-element">
            <source src={playlist.tracks[songCounter].previewURL}></source>
          </audio>
          <section className="jumbotron p-4">
            <div className="container text-center">
              <div className="row">
                <div className="col-lg">
                  <h1 className="display-4">Lets's go!</h1>
                  <p>Total Score: {totalscore}</p>
                  <p>Time Score: {timeScore}</p>
                  <p>Sorting Score: {sortingScore}</p>
                  <div
                    className="btn-group my-2"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      className="btn btn-secondary exitButton"
                      onClick={() => {
                        stopPlaying();
                        history.push("/gamedetails");
                      }}
                    >
                      Exit
                    </button>
                    <button
                      className="btn btn-secondary primaryButton mx-1"
                      onClick={() => nextSong()}
                      disabled={songCounter === playlist.tracks.length}
                    >
                      Faster than the timer? Done!
                    </button>
                    <button
                      type="button mx-1"
                      onLoad={() => setStartVolume()}
                      onClick={() => audioControl()}
                      className="btn btn-warning"
                    >
                      {playingMusic ? (
                        <img src={Pause} alt="Pause" />
                      ) : (
                        <img src={Play} alt="Play" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="col mt-5 ml-1">
                  <CountdownCircleTimer //https://github.com/vydimitrov/react-countdown-circle-timer
                    isPlaying
                    duration={30}
                    colors={[
                      ["#004777", 0.33],
                      ["#F7B801", 0.33],
                      ["#A30000", 0.33],
                    ]}
                  >
                    {({ remainingTime }) => renderTime(remainingTime)}
                  </CountdownCircleTimer>
                </div>
              </div>
            </div>
          </section>
          <div className="playContainerBg">
            <div className="d-flex justify-content-center shadow">
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    className="playDroppableList"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {lyricTokens ? (
                      lyricTokens.map((token, index) => (
                        <Draggable
                          key={index}
                          draggableId={index.toString()}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              className="cardHover roundedCorners playTextFont"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style,
                                index,
                                token,
                                originalLyrics
                              )}
                            >
                              {token}
                            </div>
                          )}
                        </Draggable>
                      ))
                    ) : (
                      <p>Error loading lyrics</p>
                    )}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </div>
      ) : (
        <Fragment>
          <div className="jumbotron text-center">
            <h1>You're done with the game! &#x1F389;</h1>
          </div>

          <div className="container text-center">
            <p>Your Score: {totalscore}</p>{" "}
            <p>
              {" "}
              Highscore:{" "}
              {totalscore > playlist.highscore
                ? totalscore
                : playlist.highscore}
            </p>
            <button
              className="btn btn-secondary primaryButton mt-2"
              onClick={() => {
                stopPlaying();
                pushToFirebase();
                history.push("/dashboard");
              }}
            >
              Back to Dashboard
            </button>
          </div>
        </Fragment>
      )}
    </div>
  );
};

const grid = 8;

const getItemStyle = (
  isDragging,
  draggableStyle,
  index,
  token,
  originalLyrics
) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging
    ? "hotpink"
    : originalLyrics.indexOf(token) === index
    ? "#21d192"
    : "lightcoral",

  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "skyblue" : "#FAF0E6",
  padding: grid,
  width: 250,
});
