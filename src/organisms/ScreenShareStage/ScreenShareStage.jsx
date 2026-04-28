import React from "react";

// styles
import stageStyles from "./ScreenShareStage.module.scss";

export function ScreenShareStage(props) {
  const {
    videoElementRef,
    canvasElementRef,
    onPointerDown,
    onPointerMove,
    onPointerEnd,
    errorMessage,
  } = props;

  return (
    <div className={stageStyles.stageContainer}>
      <div className={stageStyles.videoCanvasWrapper}>
        <video
          ref={videoElementRef}
          className={stageStyles.videoElement}
          autoPlay
          muted
          playsInline
        />
        <canvas
          ref={canvasElementRef}
          className={stageStyles.canvasElement}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerEnd}
          onPointerLeave={onPointerEnd}
        />
      </div>
      {errorMessage && (
        <div className={stageStyles.errorBanner}>
          {errorMessage}
        </div>
      )}
    </div>
  );
}
