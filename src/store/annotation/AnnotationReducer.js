import {
  ANNOTATION_TOOL_PEN,
  ANNOTATION_SET_TOOL,
  ANNOTATION_SET_COLOR,
  ANNOTATION_SET_WIDTH,
  ANNOTATION_TOGGLE_MODE,
  ANNOTATION_CLEAR_ALL,
} from "./AnnotationConstants";

const INITIAL_ANNOTATION_STATE = {
  selectedToolId: ANNOTATION_TOOL_PEN,
  strokeColorHexCode: "#ff0000",
  strokeWidth: 15,
  isAnnotationModeEnabled: true,
  clearVersion: 0,
};

export const AnnotationReducer = (state = INITIAL_ANNOTATION_STATE, action) => {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case ANNOTATION_SET_TOOL:
      return {
        ...state,
        selectedToolId: action.payload.toolId,
      };
    case ANNOTATION_SET_COLOR:
      return {
        ...state,
        strokeColorHexCode: action.payload.colorHexCode,
      };
    case ANNOTATION_SET_WIDTH:
      return {
        ...state,
        strokeWidth: action.payload.strokeWidth,
      };
    case ANNOTATION_TOGGLE_MODE:
      return {
        ...state,
        isAnnotationModeEnabled: !state.isAnnotationModeEnabled,
      };
    case ANNOTATION_CLEAR_ALL:
      return {
        ...state,
        clearVersion: state.clearVersion + 1,
      };
    default:
      return state;
  }
};
