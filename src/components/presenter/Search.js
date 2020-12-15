import React, { Component } from "react";
import SearchFormResultView from "../views/SearchFormResultView";
import SearchFormView from "../views/SearchFormView";
import ApiHandler from "../../apiHandler";
import { connect } from "react-redux";
import promiseNoData from "../views/promiseNoData";
import { updateCurrentTrack, updateFirstVisit } from "../../redux/actions";
//TODO:flytta searchform + result from search till högra sidan av skärmen
//TODO: få details i search results när man klickat på låt alt. få den på denna sida iallafall, inte prio
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_text: null,
      data: null,
      err: null,
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResults = this.handleResults.bind(this);
    this.resetInput = this.resetInput.bind(this);
  }

  resetInput() {
    this.setState({ search_text: "" });
    document.getElementById("searchInput").value = "";
  }

  handleChange(text) {
    this.setState({
      search_text: text,
    });
  }

  handleSubmit() {
    this.setState({
      loading: true,
    });
    const request = ApiHandler.searchTracks(
      this.state.search_text,
      this.props.access_token
    );

    request
      .then((res) => {
        localStorage.setItem("data", JSON.stringify([...res]));
        setTimeout(() => {
          this.setState({
            data: [...res],
            loading: false,
          });
        }, 250);
      })
      .catch((err) => {
        this.setState({
          err: err,
        });
      });
  }

  handleResults() {
    const result = JSON.parse(localStorage.getItem("data"));
    if (result) {
      if (result.length > 1) {
        return result;
      }
    }
    return "";
  }

  componentDidMount() {
    if (this.props.first_visit) {
      this.handleSubmit();
      this.props.updateFirstVisit(false);
    }
    let input = document.getElementById("searchInput");
    input.addEventListener("keyup", (e) => {
      if (e.code === "Enter") {
        e.preventDefault();
        document.getElementById("searchBtn").click();
      }
    });
  }

  render() {
    return React.createElement(
      React.Fragment,
      {},
      React.createElement(SearchFormView, {
        updateQuery: (text) => this.handleChange(text),
        onSearch: () => {
          this.handleSubmit();
          this.resetInput();
        },
      }),
      promiseNoData(this.state.loading, this.state.data, this.state.err) ||
        React.createElement(SearchFormResultView, {
          searchResults: this.handleResults(),
          setCurrentTrack: (trackObject) => {
            this.props.updateCurrentTrack({
              id: trackObject.id,
              title: trackObject.name,
              artist: trackObject.artists[0].name,
              imgURL: trackObject.album.images,
              previewURL: trackObject.preview_url,
            });
          },
        })
    );
  }
}

const mapStateToProps = (state) => {
  return {
    access_token: state.token.access_token,
    first_visit: state.first_visit,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrentTrack: (trackDetails) =>
      dispatch(updateCurrentTrack(trackDetails)),
    updateFirstVisit: (first_visit) => dispatch(updateFirstVisit(first_visit)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
