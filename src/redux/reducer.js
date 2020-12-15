import * as actionType from "./actionTypes";

export default function reducer(state = { playlist: [] }, action) {
  const { type, payload } = action;
  switch (type) {
    case actionType.TOKEN:
      return { ...state, token: payload };
    case actionType.USER:
      return { ...state, current_user: payload };
    case actionType.SPOTIFY_QUERY:
      return { ...state, query: payload };
    case actionType.CURRENT_TRACK:
      return { ...state, current_track: payload };
    case actionType.ADD_TO_PLAYLIST:
      return { ...state, playlist: [...state.playlist, payload] };
    case actionType.REMOVE_FROM_PLAYLIST:
      return {
        ...state,
        playlist: state.playlist.filter((track) => track.id !== payload),
      };
    case actionType.RESET_PLAYLIST:
      return { ...state, playlist: [] };
    case actionType.CURRENT_PLAYLIST:
      return { ...state, current_playlist: payload };
    case actionType.IS_PLAYING:
      return { ...state, is_playing: payload };
    case actionType.FIRST_VISIT:
      return { ...state, first_visit: payload };
    default:
      return state;
  }
}
