import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

export default store;

/**
 * Store design
 * {
 *      token: {
 *              access_token: ,
 *              expires_tn: ,
 *              token_type:
 *             },
 *      current_user: {
 *                      name: ,
 *                      id: ,
 *                      score
 *                      ...
 *                  },
 *
 *        current_track : {track_object},
 *
 *        playlist: [track_objects]
 *
 *
 * }
 */
