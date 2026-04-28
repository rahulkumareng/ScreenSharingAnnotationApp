import {
  ANNOTATION_SET_TOOL,
  ANNOTATION_SET_COLOR,
  ANNOTATION_SET_WIDTH,
  ANNOTATION_TOGGLE_MODE,
  ANNOTATION_CLEAR_ALL,
} from "./AnnotationConstants";

export const annotationSetTool = (toolId) => ({
  type: ANNOTATION_SET_TOOL,
  payload: { toolId },
});

export const annotationSetColor = (colorHexCode) => ({
  type: ANNOTATION_SET_COLOR,
  payload: { colorHexCode },
});

export const annotationSetWidth = (strokeWidth) => ({
  type: ANNOTATION_SET_WIDTH,
  payload: { strokeWidth },
});

export const annotationToggleMode = () => ({
  type: ANNOTATION_TOGGLE_MODE,
});

export const annotationClearAll = () => ({
  type: ANNOTATION_CLEAR_ALL,
});
