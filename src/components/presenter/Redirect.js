import React, { Component } from "react";
import { updateToken } from "../../redux/actions";
import RedirectPageView from "../views/RedirectPageView";
import { connect } from "react-redux";

class RedirectPage extends Component {
    componentDidMount() {
        this.props.updateToken();
    }
    render() {
        return (
            (!URL.includes("access_denied") &&
                React.createElement(RedirectPageView, {
                    tokenValues: this.props.token,
                })) ||
            React.createElement(RedirectPageView, {
                tokenValues: null,
            })
        );
    }
}

const URL = window.location.href;

function getValues(url) {
    const url_arr = url.split("&");
    url_arr[0] = url_arr[0].split("#").pop(); //remove callback#

    const url_obj = url_arr.reduce((prev, curr) => {
        const [title, value] = curr.split("=");
        prev[title] = value;
        return prev;
    }, {});
    return url_obj;
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateToken: () => dispatch(updateToken(getValues(URL))),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RedirectPage);
