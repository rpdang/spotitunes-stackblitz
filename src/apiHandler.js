import axios from "axios";
import apiConfig from "./apiConfig";

const RESPONSE_OK = 200;

class ApiHandler {
  searchTracks(spotify_query, access_token) {
    let requestURL = "";
    if (!spotify_query || spotify_query === "") {
      return this.fetchTopTracks(access_token);
    } else {
      const query = spotify_query.toString().replace(" ", "+");
      requestURL = `https://api.spotify.com/v1/search?q=${query}&type=track,artist`;
    }
    const config = {
      method: "get",
      url: requestURL,
      headers: {
        Authorization: "Bearer " + access_token,
      },
    };

    return axios(config)
      .then((response) => {
        if (response.status === RESPONSE_OK) {
          return response;
        } else {
          throw new Error("Error response: ", response.status);
        }
      })
      .then((res) => {
        const resArr = res.data.tracks.items.filter(
          (elem) => elem.preview_url !== null
        );
        return resArr;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  fetchTopTracks(access_token) {
    const config = {
      method: "get",
      url: `https://api.spotify.com/v1/me/top/tracks`,
      headers: {
        Authorization: "Bearer " + access_token,
      },
      json: true,
    };
    return axios(config)
      .then((response) => {
        if (response.status === RESPONSE_OK) {
          return response;
        } else {
          throw new Error("Error response: ", response.status);
        }
      })
      .then((res) => {
        const resArr = res.data.items.filter(
          (elem) => elem.preview_url !== null
        );
        return resArr;
      })
      .catch((err) => {
        return err;
      });
  }

  fetchLyrics(title, artist) {
    //fix: undefined för tecken i artistnamn
    const config = {
      method: "get",
      url: `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?q_track=${title}&q_artist=${artist}&apikey=${apiConfig.lyrics}`,
    };
    return axios(config)
      .then((response) => {
        if (response.status === RESPONSE_OK) {
          return response;
        } else {
          throw new Error("Error response: ", response.status);
        }
      })
      .then((res) => {
        const lyrics = res.data.message.body.lyrics;
        if (!lyrics) {
          return null;
        }
        return lyrics.lyrics_body;
      })
      .catch((err) => {
        return err;
      });
  }

  fetchUserData(access_token) {
    const config = {
      method: "get",
      url: "https://api.spotify.com/v1/me",
      headers: {
        Authorization: "Bearer " + access_token,
      },
      json: true,
    };

    return axios(config)
      .then((response) => {
        if (response.status === RESPONSE_OK) {
          return response;
        } else {
          throw new Error("Error response", response.status);
        }
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  }
}

export default new ApiHandler();
