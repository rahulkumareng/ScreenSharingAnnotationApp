import React from "react";
import classNames from "classnames";

// constants
import {
  ANNOTATION_TOOL_PEN,
  ANNOTATION_TOOL_HIGHLIGHTER,
  ANNOTATION_TOOL_ERASER,
} from "../../store/annotation/AnnotationConstants";

// styles
import toolbarStyles from "./ScreenShareToolbar.module.scss";

export function ScreenShareToolbar(props) {
  const {
    selectedToolId,
    strokeColorHexCode,
    strokeWidth,
    isAnnotationModeEnabled,
    onToolChange,
    onColorChange,
    onStrokeWidthChange,
    onToggleAnnotationMode,
    onClearAnnotations,
    onUndoLastAnnotation,
    onRedoLastAnnotation,
    onExportAnnotatedFrame,
    onStartScreenShare,
    onStopScreenShare,
    isScreenSharing,
    isScreenShareStarting,
  } = props;

  const handlePenToolButtonClick = () => onToolChange(ANNOTATION_TOOL_PEN);

  const handleHighlighterToolButtonClick = () =>
    onToolChange(ANNOTATION_TOOL_HIGHLIGHTER);

  const handleEraserToolButtonClick = () =>
    onToolChange(ANNOTATION_TOOL_ERASER);

  const handleColorInputChange = (event) => onColorChange(event.target.value);

  const handleStrokeWidthChangeInternal = (event) => {
    const parsedWidth = Number(event.target.value);

    if (Number.isNaN(parsedWidth)) return;

    onStrokeWidthChange(parsedWidth);
  };

  const handleScreenShareClick = () => {
    if (isScreenSharing) {
      onStopScreenShare();
    } else {
      onStartScreenShare();
    }
  };

  return (
    <div className={toolbarStyles.toolbarRoot}>
      <div className={toolbarStyles.toolbarSection}>
        <span>Tool</span>
        <button
          className={classNames({
            [toolbarStyles.toolButtonActive]:
              selectedToolId === ANNOTATION_TOOL_PEN,
          })}
          onClick={handlePenToolButtonClick}
        >
          Pen
        </button>
        <button
          className={classNames({
            [toolbarStyles.toolButtonActive]:
              selectedToolId === ANNOTATION_TOOL_HIGHLIGHTER,
          })}
          onClick={handleHighlighterToolButtonClick}
        >
          Highlighter
        </button>
        <button
          className={classNames({
            [toolbarStyles.toolButtonActive]:
              selectedToolId === ANNOTATION_TOOL_ERASER,
          })}
          onClick={handleEraserToolButtonClick}
        >
          Eraser
        </button>
      </div>

      <div className={toolbarStyles.toolbarSection}>
        <span>Color</span>
        <input
          type="color"
          value={strokeColorHexCode}
          onChange={handleColorInputChange}
          className={toolbarStyles.colorInput}
        />
      </div>

      <div className={toolbarStyles.toolbarSection}>
        <span>Stroke width</span>
        <input
          type="range"
          min="1"
          max="20"
          value={strokeWidth}
          onChange={handleStrokeWidthChangeInternal}
          className={toolbarStyles.widthSlider}
        />
        <span className={toolbarStyles.toolbarValue}>{strokeWidth}</span>
      </div>

      <div className={toolbarStyles.toolbarSection}>
        <button onClick={onToggleAnnotationMode}>
          {isAnnotationModeEnabled
            ? "Disable annotations"
            : "Enable annotations"}
        </button>

        <button onClick={onClearAnnotations}>Clear annotations</button>
      </div>

      <div className={toolbarStyles.toolbarSection}>
        <button onClick={onUndoLastAnnotation}>Undo</button>
        <button onClick={onRedoLastAnnotation}>Redo</button>
        <button onClick={onExportAnnotatedFrame}>Export annotated frame</button>
      </div>

      <div className={toolbarStyles.toolbarSection}>
        <button
          onClick={handleScreenShareClick}
          disabled={isScreenShareStarting}
        >
          {isScreenShareStarting
            ? "Starting…"
            : isScreenSharing
              ? "Stop screen share"
              : "Start screen share"}
        </button>
      </div>
    </div>
  );
}
