import {
  SCREEN_SHARE_START_REQUEST,
  SCREEN_SHARE_START_SUCCESS,
  SCREEN_SHARE_START_FAILURE,
  SCREEN_SHARE_STOP_REQUEST,
  SCREEN_SHARE_STOP_SUCCESS,
} from "./ScreenShareConstants";

const INITIAL_SCREEN_SHARE_STATE = {
  isSharing: false,
  isStarting: false,
  stream: null,
  errorMessage: null,
};

export const ScreenShareReducer = (
  state = INITIAL_SCREEN_SHARE_STATE,
  action,
) => {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case SCREEN_SHARE_START_REQUEST:
      return {
        ...state,
        isStarting: true,
        errorMessage: null,
      };
    case SCREEN_SHARE_START_SUCCESS:
      return {
        ...state,
        isStarting: false,
        isSharing: true,
        stream: action.payload.stream,
      };
    case SCREEN_SHARE_START_FAILURE:
      return {
        ...state,
        isStarting: false,
        isSharing: false,
        stream: null,
        errorMessage: action.payload.errorMessage,
      };
    case SCREEN_SHARE_STOP_REQUEST:
      return {
        ...state,
        isStarting: false,
      };
    case SCREEN_SHARE_STOP_SUCCESS:
      return {
        ...state,
        isSharing: false,
        stream: null,
      };
    default:
      return state;
  }
};
