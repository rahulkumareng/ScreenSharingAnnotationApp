export const selectScreenShareState = (rootState) => rootState?.screenShare;

export const selectScreenShareStream = (rootState) =>
  selectScreenShareState(rootState)?.stream;

export const selectIsScreenSharing = (rootState) =>
  selectScreenShareState(rootState)?.isSharing;

export const selectIsScreenShareStarting = (rootState) =>
  selectScreenShareState(rootState)?.isStarting;

export const selectScreenShareErrorMessage = (rootState) =>
  selectScreenShareState(rootState)?.errorMessage;
