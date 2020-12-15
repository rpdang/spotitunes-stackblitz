import React, { Component } from "react";
import { connect } from "react-redux";
import ApiHandler from "../../apiHandler";
import { PlayView } from "../views/PlayView";
import promiseNoData from "../views/promiseNoData";
import { DragDropContext } from "react-beautiful-dnd";
import { isPlaying } from "../../redux/actions";
import { updateCurrentPlaylist } from "../../redux/actions";
import { db } from "../../firebase";


var songCounter = 0;
var timeScore = 0;
var sortingScore = 0;
var totalscore = 0;
var originalLyrics = [];
var score = 0;

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: null,
      originalLyrics: null,
      lyrics: null,
      playingMusic: true,
      loading: false,
      error: null,
      end: false,
    };
    this.reorder = this.reorder.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.audioControl = this.audioControl.bind(this);
    this.stopPlaying = this.stopPlaying.bind(this);
    this.setStartVolume = this.setStartVolume.bind(this);
    this.renderTime = this.renderTime.bind(this);
    this.update = this.update.bind(this);
    this.sortingScore = this.sortingScore.bind(this);
    this.scoreSum = this.scoreSum.bind(this);
  }

  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  shuffle = (array) => {
    var tmp,
      current,
      top = array.length;

    if (top)
      while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
    return array;
  };

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    const lyrics = this.reorder(
      this.state.lyrics,
      result.source.index,
      result.destination.index
    );

    this.setState({
      lyrics,
    });
  }

  stopPlaying = () => {
    this.props.isPlaying(false);
  };

  audioControl() {
    let player = document.getElementById("audioPlay");
    if (player.paused) {
      player.play();
      this.setState({ playingMusic: true });
    } else {
      player.pause();
      this.setState({ playingMusic: false });
    }
  }

  renderTime = (remainingTime) => {
    if (remainingTime === 0) {
      if (this.props.playlist.tracks.length === songCounter) {
        this.scoreSum();
      } else {
        this.scoreSum();
        songCounter = songCounter + 1;
        this.update();
      }
    } else {
      timeScore = remainingTime;
      return remainingTime;
    }
  };

  scoreSum() {
    this.sortingScore(this.state.lyrics, originalLyrics);
    totalscore = totalscore + timeScore * 10 + sortingScore * 200;
    if (totalscore > this.props.playlist.highscore) {
      score = totalscore;
    }
  }

  sortingScore(str1, str2) {
    var length = str2.length;
    for (var i = 0; i < length; i++) {
      if (str1[i] === str2[i]) {
        sortingScore = sortingScore + 1;
      }
    }
  }

  componentDidMount() {
    score = this.props.playlist.highscore;
    songCounter = 0;
    totalscore = 0;
    this.update();
  }

  update() {
    timeScore = 30;
    sortingScore = 0;

    if (songCounter === this.props.playlist.tracks.length) {
      songCounter = 0;
      this.setState({ end: true });
      this.stopPlaying();
    } else if (this.props.playlist.tracks.length > 0) {
      this.setState({ loading: true });
      ApiHandler.fetchLyrics(
        this.props.playlist.tracks[songCounter].title,
        this.props.playlist.tracks[songCounter].artist
      )
        .then((res) => {
          const originalLyrics = res
            .substring(res.indexOf("..."), "")
            .split(/\n/)
            .filter((sentence) => sentence !== "");

          let splitLyrics = null;
          if (originalLyrics.length > 7) {
            splitLyrics = originalLyrics.slice(0, 6);
          } else {
            splitLyrics = originalLyrics;
          }
          const shuffledLyrics = this.shuffle(splitLyrics);
          this.setState({
            originalLyrics: originalLyrics,
            lyrics: shuffledLyrics,
            loading: false,
          });
        })
        .catch((err) => {
          this.setState({ error: err });
        });
    }
  }

  nextSong() {
    if (songCounter < this.props.playlist.tracks.length) {
      this.scoreSum();
      songCounter = songCounter + 1;
      setTimeout(() => {
        this.update();
      }, 500);
    }
  }

  setStartVolume() {
    let audio = document.getElementById("audioPlay");
    if (audio) {
      audio.volume = 0.1;
    }
  }
  pushToFirebase() {
    try {
      this.setState({ loading: true });
      db.collection("playlists")
        .doc("playlistsdoc")
        .get()
        .then((doc) => {
          return doc.data().playlist;
        })
        .then((playlists) => {
          let collectArr = [];

          playlists.forEach((elem) => {
            if (
              elem.id.concat(elem.name) ===
              this.props.playlist.id.concat(this.props.playlist.name)
            ) {
              collectArr.push({
                id: this.props.playlist.id.concat(this.props.playlist.name),
                highscore: score,
                name: this.props.playlist.name,
                tracks: this.props.playlist.tracks,
              });
            } else {
              collectArr.push(elem);
            }
          });
          db.collection("playlists").doc("playlistsdoc").set({
            playlist: collectArr,
          });

          this.setState({ loading: false });
        })
        .catch((err) => this.setState({ err: err }));
    } catch (err) {
      this.setState({ err: err });
    }
  }

  render() {
    return (
      promiseNoData(this.state.loading, this.state.error) ||
      React.createElement(
        DragDropContext,
        { onDragEnd: this.onDragEnd },
        React.createElement(PlayView, {
          end: this.state.end,
          totalscore: totalscore,
          timeScore: timeScore,
          sortingScore: sortingScore,
          renderTime: (remainingTime) => this.renderTime(remainingTime),
          nextSong: () => this.nextSong(),
          lyricTokens: this.state.lyrics ? this.state.lyrics : null,
          playlist: this.props.playlist,
          audioControl: () => this.audioControl(),
          stopPlaying: () => this.stopPlaying(),
          playingMusic: this.state.playingMusic,
          setStartVolume: () => this.setStartVolume(),
          songCounter: songCounter,
          pushToFirebase: () => {
            this.pushToFirebase();
            this.props.updateCurrentPlaylist({
              id: this.props.userDetails.id,
              name: this.state.name,
              highscore: totalscore,
              tracks: this.props.playlist,
            });
          },
          originalLyrics: this.state.originalLyrics,
        })
      )
    );
  }
}

const mapStateToProps = (state) => {
  return {
    playlist: state.current_playlist,
    userDetails: state.current_user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    isPlaying: (is_playing) => dispatch(isPlaying(is_playing)),
    updateCurrentPlaylist: (playlist) =>
      dispatch(updateCurrentPlaylist(playlist)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Play);
