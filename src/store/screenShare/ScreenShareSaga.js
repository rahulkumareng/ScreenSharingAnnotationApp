import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  SCREEN_SHARE_START_REQUEST,
  SCREEN_SHARE_STOP_REQUEST,
} from "./ScreenShareConstants";
import {
  screenShareStartSuccess,
  screenShareStartFailure,
  screenShareStopSuccess,
} from "./ScreenShareActions";
import { selectScreenShareStream } from "./ScreenShareSelectors";

function getDisplayMediaStream() {
  const mediaDevices = navigator.mediaDevices;

  if (!mediaDevices || !mediaDevices.getDisplayMedia) {
    return Promise.reject(
      new Error("Screen sharing is not supported in this browser"),
    );
  }

  return mediaDevices.getDisplayMedia({ video: true, audio: false });
}

export function* handleScreenShareStart() {
  try {
    const stream = yield call(getDisplayMediaStream);
    yield put(screenShareStartSuccess(stream));
  } catch (error) {
    const safeMessage =
      error && error.message ? error.message : "Unable to start screen sharing";
    yield put(screenShareStartFailure(safeMessage));
  }
}

export function* handleScreenShareStop() {
  const activeStream = yield select(selectScreenShareStream);

  if (activeStream && activeStream.getTracks) {
    activeStream.getTracks().forEach((track) => {
      track.stop();
    });
  }

  yield put(screenShareStopSuccess());
}

export function* ScreenShareSaga() {
  yield takeLatest(SCREEN_SHARE_START_REQUEST, handleScreenShareStart);
  yield takeLatest(SCREEN_SHARE_STOP_REQUEST, handleScreenShareStop);
}
