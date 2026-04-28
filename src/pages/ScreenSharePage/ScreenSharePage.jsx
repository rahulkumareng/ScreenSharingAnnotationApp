import React, { useEffect } from "react";

// hooks
import { useScreenShare } from "../../hooks/useScreenShare";
import { useCanvasAnnotations } from "../../hooks/useCanvasAnnotations";
import { useAnnotationControls } from "../../hooks/useAnnotationControls";

// helpers
import { triggerAnnotatedFrameDownload } from "../../helpers/annotation.helpers";

// organisms
import { ScreenShareToolbar } from "../../organisms/ScreenShareToolbar/ScreenShareToolbar";
import { ScreenShareStage } from "../../organisms/ScreenShareStage/ScreenShareStage";

// styles
import pageStyles from "./ScreenSharePage.module.scss";

export function ScreenSharePage() {
  const {
    isScreenSharing,
    isScreenShareStarting,
    screenShareErrorMessage,
    videoElementRef,
    handleStartScreenShare,
    handleStopScreenShare,
  } = useScreenShare();

  const canvasElementRef = React.useRef(null);
  const {
    handlePointerDown,
    handlePointerMove,
    handlePointerEnd,
    handleUndoLastStroke,
    handleRedoLastStroke,
  } = useCanvasAnnotations(canvasElementRef);

  const {
    selectedToolId,
    strokeColorHexCode,
    strokeWidth,
    isAnnotationModeEnabled,
    handleToolChange,
    handleColorChange,
    handleStrokeWidthChange,
    handleToggleAnnotationMode,
    handleClearAnnotations,
  } = useAnnotationControls();

  const handleExportAnnotatedFrame = () => {
    triggerAnnotatedFrameDownload({
      videoElement: videoElementRef.current,
      canvasElement: canvasElementRef.current,
    });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "d" || event.key === "D") {
        handleToggleAnnotationMode();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleToggleAnnotationMode]);

  return (
    <div className={pageStyles.pageRoot}>
      <h1 className={pageStyles.pageTitle}>Screen Sharing Annotation Tool</h1>

      <ScreenShareToolbar
        selectedToolId={selectedToolId}
        strokeColorHexCode={strokeColorHexCode}
        strokeWidth={strokeWidth}
        isAnnotationModeEnabled={isAnnotationModeEnabled}
        onToolChange={handleToolChange}
        onColorChange={handleColorChange}
        onStrokeWidthChange={handleStrokeWidthChange}
        onToggleAnnotationMode={handleToggleAnnotationMode}
        onClearAnnotations={handleClearAnnotations}
        onUndoLastAnnotation={handleUndoLastStroke}
        onRedoLastAnnotation={handleRedoLastStroke}
        onExportAnnotatedFrame={handleExportAnnotatedFrame}
        onStartScreenShare={handleStartScreenShare}
        onStopScreenShare={handleStopScreenShare}
        isScreenSharing={isScreenSharing}
        isScreenShareStarting={isScreenShareStarting}
      />

      <ScreenShareStage
        videoElementRef={videoElementRef}
        canvasElementRef={canvasElementRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerEnd={handlePointerEnd}
        errorMessage={screenShareErrorMessage}
      />

      <p className={pageStyles.helpText}>
        Use the toolbar to select tools. Press the D key to toggle annotation
        mode on or off.
      </p>
    </div>
  );
}
