import {
  SCREEN_SHARE_START_REQUEST,
  SCREEN_SHARE_START_SUCCESS,
  SCREEN_SHARE_START_FAILURE,
  SCREEN_SHARE_STOP_REQUEST,
  SCREEN_SHARE_STOP_SUCCESS,
} from "./ScreenShareConstants";

export const screenShareStartRequest = () => ({
  type: SCREEN_SHARE_START_REQUEST,
});

export const screenShareStartSuccess = (stream) => ({
  type: SCREEN_SHARE_START_SUCCESS,
  payload: { stream },
});

export const screenShareStartFailure = (errorMessage) => ({
  type: SCREEN_SHARE_START_FAILURE,
  payload: { errorMessage },
});

export const screenShareStopRequest = () => ({
  type: SCREEN_SHARE_STOP_REQUEST,
});

export const screenShareStopSuccess = () => ({
  type: SCREEN_SHARE_STOP_SUCCESS,
});
