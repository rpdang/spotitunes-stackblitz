import { useHistory } from "react-router";
import "../../styles/base.css";
import "../../styles/infopage.css";

const InfoPageView = ({ fireOnClick }) => {
  let history = useHistory();
  return (
    <section className="jumbotron text-left">
      <div className="container-fluid">
        <h1 className="jumbotron-heading">About Spotitunes</h1>
        <h4>
          Do you really know the lyrics of your favorite songs? We really don't
          think so but please, prove us wrong!
        </h4>
        <p>
          Start by creating a game where you add your favorite songs to the
          playlist (or new ones if you are daring). When you're done with your
          playlist name it to something special! Either you are playing your own
          games or other players' created games.
          <br />
          <br />
          The game is to sort out the randomized sentences to the actual lyrics.
          The more accurate lyrics, the more points you get. And also, think
          fast! If you know the words and are fast enough, you will get higher
          points. Lets beat the highscores of every playlists!
          &#128540;&#128526; &#129327; &#x1F389;&#x1F3C6;&#x1F50A;&#x1F3B6;
        </p>
        Want to play?
        <br />
        <button
          className="btn btn-secondary primaryButton mt-2"
          onClick={() => {
            fireOnClick();
            history.push("/dashboard");
          }}
        >
          Continue here!
        </button>
        <br />
        <div className="d-flex">
          <iframe
            title="fun"
            src="https://giphy.com/embed/08moP0jul361cRKpYz"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default InfoPageView;
