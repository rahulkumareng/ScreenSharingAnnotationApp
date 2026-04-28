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
          type="button"
          className={classNames(toolbarStyles.toolButton, {
            [toolbarStyles.toolButtonActive]:
              selectedToolId === ANNOTATION_TOOL_PEN,
          })}
          onClick={handlePenToolButtonClick}
        >
          Pen
        </button>
        <button
          type="button"
          className={classNames(toolbarStyles.toolButton, {
            [toolbarStyles.toolButtonActive]:
              selectedToolId === ANNOTATION_TOOL_HIGHLIGHTER,
          })}
          onClick={handleHighlighterToolButtonClick}
        >
          Highlighter
        </button>
        <button
          type="button"
          className={classNames(toolbarStyles.toolButton, {
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
        <button
          type="button"
          onClick={onToggleAnnotationMode}
          className={classNames(toolbarStyles.toggleButton, {
            [toolbarStyles.toggleButtonActive]: isAnnotationModeEnabled,
          })}
        >
          {isAnnotationModeEnabled
            ? "Disable annotations"
            : "Enable annotations"}
        </button>

        <button
          type="button"
          onClick={onClearAnnotations}
          className={toolbarStyles.secondaryButton}
        >
          Clear annotations
        </button>
      </div>

      <div className={toolbarStyles.toolbarSection}>
        <button
          type="button"
          onClick={onUndoLastAnnotation}
          className={toolbarStyles.secondaryButton}
        >
          Undo
        </button>
        <button
          type="button"
          onClick={onRedoLastAnnotation}
          className={toolbarStyles.secondaryButton}
        >
          Redo
        </button>
        <button
          type="button"
          onClick={onExportAnnotatedFrame}
          className={toolbarStyles.secondaryButton}
        >
          Export annotated frame
        </button>
      </div>

      <div className={toolbarStyles.toolbarSection}>
        <button
          type="button"
          onClick={handleScreenShareClick}
          className={toolbarStyles.primaryButton}
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
