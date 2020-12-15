import * as actionType from "./actionTypes";

export const updateToken = ({ access_token, expires_in, token_type }) => ({
  type: actionType.TOKEN,
  payload: {
    access_token: access_token,
    expires_in: expires_in,
    token_type: token_type,
  },
});

export const updateCurrentUser = ({ id, name, score, exist }) => ({
  type: actionType.USER,
  payload: {
    id: id,
    name: name,
    score: score,
    exist: exist,
  },
});

export const updateSpotifyQuery = ({ query }) => ({
  type: actionType.SPOTIFY_QUERY,
  payload: { query: query },
});

export const updateCurrentTrack = ({
  id,
  title,
  artist,
  imgURL,
  previewURL,
}) => ({
  type: actionType.CURRENT_TRACK,
  payload: {
    id: id,
    title: title,
    artist: artist,
    imgURL: imgURL,
    previewURL: previewURL,
  },
});

export const addToPlaylist = (track) => ({
  type: actionType.ADD_TO_PLAYLIST,
  payload: track,
});

export const removeFromPlaylist = (trackID) => ({
  type: actionType.REMOVE_FROM_PLAYLIST,
  payload: trackID,
});

export const resetPlaylist = () => ({
  type: actionType.RESET_PLAYLIST,
});

export const updateCurrentPlaylist = ({ id, name, highscore, tracks }) => ({
  type: actionType.CURRENT_PLAYLIST,
  payload: { id: id, name: name, highscore: highscore, tracks: tracks },
});

export const isPlaying = (is_playing) => ({
  type: actionType.IS_PLAYING,
  payload: is_playing,
});

export const updateFirstVisit = (first_visit) => ({
  type: actionType.FIRST_VISIT,
  payload: first_visit,
});
