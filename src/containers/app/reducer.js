import { fromJS } from "immutable";
import {
  UPDATE_PLAYER_DATA,
  SET_TOKEN,
  FETCH_DATA_ERROR,
  PLAYPAUSE_ERROR,
  SMOOTH_PROGRESS
} from "./consts";
import { isNil } from "rambda";

export const MAIN_REDUCER = "MAIN_REDUCER";

const initialState = fromJS({
  token: null,
  album_cover: "",
  duration_ms: 0,
  artist: "",
  song_name: "",
  is_playing: "Paused",
  progress_ms: 0,
  no_data: false,
  loading: true
});

export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN: {
      const token = action.payload;
      return isNil(token) ? state : state.set("token", token);
    }
    case UPDATE_PLAYER_DATA: {
      const data = action.payload.response;
      // Response is null when user doesn't play anything on spotify.
      return isNil(data)
        ? state.set("no_data", true).set("loading", false)
        : state
            .set("song_name", data.item.name)
            .set("artist", data.item.artists[0].name)
            .set("duration_ms", data.item.duration_ms)
            .set("is_playing", data.is_playing)
            .set("progress_ms", data.progress_ms)
            .set("album_cover", data.item.album.images[1].url)
            .set("no_data", false)
            .set("loading", false);
    }
    case PLAYPAUSE_ERROR:
    case FETCH_DATA_ERROR: {
      const error = action.payload;
      console.log(error);
      // session expired
      if (error.status === 401) {
        return state
          .set("token", null)
          .set("loading", true)
          .set("no_data", false);
      }
      return state; //TODO: other errors
    }
    case SMOOTH_PROGRESS: {
      const currTime = state.get("progress_ms");
      return state.set("progress_ms", currTime + action.payload);
    }
    default:
      return state;
  }
};
