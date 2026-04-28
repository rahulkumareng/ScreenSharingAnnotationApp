import { combineReducers } from "redux";
import { ScreenShareReducer } from "../../store/screenShare/ScreenShareReducer";
import { AnnotationReducer } from "../../store/annotation/AnnotationReducer";

export const RootReducer = combineReducers({
  screenShare: ScreenShareReducer,
  annotation: AnnotationReducer,
});
