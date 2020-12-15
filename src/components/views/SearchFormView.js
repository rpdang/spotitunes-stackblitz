import React from "react";
import { useHistory } from "react-router-dom";
import "../../styles/base.css";
import "../../styles/creategame.css";

export const SearchFormView = ({ updateQuery, onSearch }) => {
  let history = useHistory();
  return (
    <section className="">
      <div className="d-flex flex-row bd-highlight mb-2">
        <div className="container">
          <button
            className="btn btn-secondary exitButton my-2"
            onClick={() => history.goBack()}
          >
            Exit
          </button>
          <h1 className="display-5">Search for Songs</h1>
          <div className="input-group my-2">
            <input
              id="searchInput"
              title="query"
              className="form-control"
              type="text"
              placeholder="Search tracks or artists"
              onChange={(e) => updateQuery(e.target.value)}
            ></input>
            <div className="input-group-append">
              <button
                id="searchBtn"
                type="submit"
                className="btn btn-secondary primaryButton"
                value="Search"
                onClick={() => onSearch()}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchFormView;
