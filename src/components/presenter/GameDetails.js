import React, { Component } from "react";
import GameDetailsView from "../views/GameDetailsView";
import Play from "./Play";
import { connect } from "react-redux";
import promiseNoData from "../views/promiseNoData";
import { isPlaying } from "../../redux/actions";
//TODO: spellogik
//TODO: få den att loada

class GameDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      err: null,
    };
    this.startPlaying = this.startPlaying.bind(this);
  }

  startPlaying = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.props.isPlaying(true);
      this.setState({ loading: false });
    }, 1500);
  };

  render() {
    return React.createElement(
      React.Fragment,
      {},
      !this.props.is_playing
        ? promiseNoData(this.state.loading, this.state.err) ||
            React.createElement(GameDetailsView, {
              current_playlist: this.props.current_playlist,
              startPlaying: () => this.startPlaying(),
            })
        : promiseNoData(this.state.loading, this.state.err) ||
            React.createElement(Play, {})
    );
  }
}

const mapStateToProps = (state) => {
  return {
    current_user: state.current_user,
    current_playlist: state.current_playlist,
    is_playing: state.is_playing,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    isPlaying: (is_playing) => dispatch(isPlaying(is_playing)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameDetails);
