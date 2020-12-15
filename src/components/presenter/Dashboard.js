import DashboardView from "../views/DashboardView";
import { connect } from "react-redux";
import React, { Component } from "react";
import promiseNoData from "../views/promiseNoData";
import { db } from "../../firebase";
import {
  updateCurrentUser,
  updateCurrentPlaylist,
  updateToken,
  updateFirstVisit,
} from "../../redux/actions";

//(kanske en TODO; sortera egna spellistor och andras)
//kanske kunna edita spellistor???
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: null,
      playlists: null,
      searchPlaylist: [],
      err: null,
    };
    this.pushToFirestoreUser = this.pushToFirestoreUser.bind(this);
    this.fetchFromFirestore = this.fetchFromFirestore.bind(this);
    this.searchPlaylist = this.searchPlaylist.bind(this);
    this.userSignOut = this.userSignOut.bind(this);
  }

  searchPlaylist(searchText) {
    this.setState({
      searchPlaylist: this.state.playlists.filter((playlist) =>
        playlist.name.toLowerCase().includes(searchText.toLowerCase())
      ),
    });
  }

  componentDidMount() {
    setTimeout(() => {
      this.fetchFromFirestore();
    }, 500);
    this.props.updateFirstVisit(true);
  }

  pushToFirestoreUser() {
    try {
      db.collection("users")
        .doc("userdoc")
        .get()
        .then((doc) => {
          return doc.data().users;
        })
        .then((oldUsers) => {
          let users = [
            {
              userid: this.props.userDetails.id,
              score: this.props.userDetails.score,
            },
            ...oldUsers,
          ];
          db.collection("users").doc("userdoc").set({ users: users });
        });

      this.props.updateCurrentUser({
        id: this.props.userDetails.id,
        name: this.props.userDetails.name,
        score: this.props.userDetails.score,
        exist: true,
      });
    } catch (err) {
      this.setState({ err: err });
    }
  }

  fetchFromFirestore() {
    try {
      this.setState({ loading: true });
      db.collection("playlists")
        .doc("playlistsdoc")
        .get()
        .then((doc) => {
          return doc.data().playlist;
        })
        .then((playlists) => {
          this.setState({
            playlists: playlists,
            loading: false,
          });
        });
    } catch (err) {
      this.setState({ err: err });
    }
  }

  userSignOut() {
    this.props.updateToken({
      access_token: null,
      expires_in: null,
      token_type: null,
    });
    return (window.location.href = "http://localhost:3000/login");
  }

  render() {
    if (!this.props.userDetails.exist) {
      this.pushToFirestoreUser();
    }
    return (
      promiseNoData(this.state.loading, this.state.id, this.state.err) ||
      React.createElement(DashboardView, {
        userDetails: this.props.userDetails,
        playlists:
          this.state.searchPlaylist.length > 0
            ? this.state.searchPlaylist
            : this.state.playlists,
        updateCurrentPlaylist: (playlist) =>
          this.props.updateCurrentPlaylist(playlist),
        searchPlaylist: (searchText) => this.searchPlaylist(searchText),
        userSignOut: () => this.userSignOut(),
      })
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.current_user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrentUser: (userDetails) =>
      dispatch(updateCurrentUser(userDetails)),
    updateCurrentPlaylist: (playlist) =>
      dispatch(updateCurrentPlaylist(playlist)),
    updateToken: (obj) => dispatch(updateToken(obj)),
    updateFirstVisit: (first_visit) => dispatch(updateFirstVisit(first_visit)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
