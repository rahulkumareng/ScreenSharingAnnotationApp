export const selectAnnotationState = (rootState) => rootState?.annotation;

export const selectSelectedAnnotationToolId = (rootState) =>
  selectAnnotationState(rootState)?.selectedToolId;

export const selectAnnotationStrokeColorHexCode = (rootState) =>
  selectAnnotationState(rootState)?.strokeColorHexCode;

export const selectAnnotationStrokeWidth = (rootState) =>
  selectAnnotationState(rootState)?.strokeWidth;

export const selectIsAnnotationModeEnabled = (rootState) =>
  selectAnnotationState(rootState)?.isAnnotationModeEnabled;

export const selectAnnotationClearVersion = (rootState) =>
  selectAnnotationState(rootState)?.clearVersion;
