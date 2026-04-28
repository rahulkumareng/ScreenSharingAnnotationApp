import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

// selectors
import {
  selectIsScreenSharing,
  selectIsScreenShareStarting,
  selectScreenShareErrorMessage,
  selectScreenShareStream,
} from "../store/screenShare/ScreenShareSelectors";

// actions
import {
  screenShareStartRequest,
  screenShareStopRequest,
} from "../store/screenShare/ScreenShareActions";

export function useScreenShare() {
  const dispatch = useDispatch();
  const isScreenSharing = useSelector(selectIsScreenSharing);
  const isScreenShareStarting = useSelector(selectIsScreenShareStarting);
  const screenShareErrorMessage = useSelector(selectScreenShareErrorMessage);
  const screenShareStream = useSelector(selectScreenShareStream);

  const videoElementRef = useRef(null);

  useEffect(() => {
    const videoElement = videoElementRef.current;

    if (!videoElement) {
      return;
    }

    if (screenShareStream) {
      videoElement.srcObject = screenShareStream;
      videoElement.play().catch(() => {});
    } else {
      videoElement.srcObject = null;
    }
  }, [screenShareStream]);

  const handleStartScreenShare = () => dispatch(screenShareStartRequest());

  const handleStopScreenShare = () => dispatch(screenShareStopRequest());

  return {
    isScreenSharing,
    isScreenShareStarting,
    screenShareErrorMessage,
    videoElementRef,
    handleStartScreenShare,
    handleStopScreenShare,
  };
}
