import { legacy_createStore as createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { RootReducer } from "./root/RootReducer";
import { RootSaga } from "./root/RootSaga";

const sagaMiddleware = createSagaMiddleware();

export const ScreenShareAppStore = createStore(
  RootReducer,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(RootSaga);
