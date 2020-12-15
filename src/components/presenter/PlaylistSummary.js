import PlaylistSummaryView from "../views/PlaylistSummaryView";
import { connect } from "react-redux";
import React, { Component } from "react";
import {
  removeFromPlaylist,
  resetPlaylist,
  updateCurrentTrack,
  updateCurrentPlaylist,
} from "../../redux/actions";
import { db } from "../../firebase";
import promiseNoData from "../views/promiseNoData";
//TODO: css/view; visa input för namn på spellistan även om det inte finns ngn låt, flytta input längst upp sa det är första steget

class PlaylistSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      loading: false,
      err: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.pushToFirebase = this.pushToFirebase.bind(this);
  }

  handleChange(name) {
    this.setState({
      name: name,
    });
  }

  pushToFirebase() {
    try {
      this.setState({ loading: true });
      db.collection("playlists")
        .doc("playlistsdoc")
        .get()
        .then((doc) => {
          let oldPlaylists = doc.data().playlist;
          db.collection("playlists")
            .doc("playlistsdoc")
            .set({
              playlist: [
                {
                  id: this.props.userDetails.id,
                  highscore: 0,
                  name: this.state.name,
                  tracks: this.props.playlist,
                },
                ...oldPlaylists,
              ],
            });
          this.setState({ loading: false });
        })
        .then(() => this.props.resetPlaylist())
        .catch((err) => this.setState({ err: err }));
    } catch (err) {
      this.setState({ err: err });
    }
  }

  render() {
    let isEmpty = this.state.name == null || this.state.name === "";
    return (
      promiseNoData(this.state.loading, this.state.err) ||
      React.createElement(PlaylistSummaryView, {
        playlist: this.props.playlist,
        removeFromPlaylist: (trackID) => this.props.removeFromPlaylist(trackID),
        resetPlaylist: () => this.props.resetPlaylist(),
        setCurrentTrack: (trackObject) => {
          this.props.updateCurrentTrack({
            id: trackObject.id,
            title: trackObject.title,
            artist: trackObject.artist,
            imgURL: trackObject.imgURL,
            previewURL: trackObject.previewURL,
          });
        },
        handleChange: (name) => this.handleChange(name),
        isEmpty: isEmpty,
        pushToFirebase: () => {
          this.pushToFirebase();
          this.props.updateCurrentPlaylist({
            id: this.props.userDetails.id.concat(this.state.name),
            name: this.state.name,
            highscore: 0,
            tracks: this.props.playlist,
          });
        },
      })
    );
  }
}

const mapStateToProps = (state) => {
  return {
    playlist: state.playlist,
    userDetails: state.current_user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromPlaylist: (trackID) => dispatch(removeFromPlaylist(trackID)),
    resetPlaylist: () => dispatch(resetPlaylist()),
    updateCurrentTrack: (trackObject) =>
      dispatch(updateCurrentTrack(trackObject)),
    updateCurrentPlaylist: (playlist) =>
      dispatch(updateCurrentPlaylist(playlist)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistSummary);
