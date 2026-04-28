import { all } from "redux-saga/effects";
import { ScreenShareSaga } from "../../store/screenShare/ScreenShareSaga";

export function* RootSaga() {
  yield all([ScreenShareSaga()]);
}
