import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

// selectors
import {
  selectAnnotationStrokeColorHexCode,
  selectAnnotationStrokeWidth,
  selectSelectedAnnotationToolId,
  selectIsAnnotationModeEnabled,
  selectAnnotationClearVersion,
} from "../store/annotation/AnnotationSelectors";

// constants
import {
  ANNOTATION_TOOL_HIGHLIGHTER,
  ANNOTATION_TOOL_ERASER,
} from "../store/annotation/AnnotationConstants";

// helpers
import {
  drawStrokeOnCanvasContext,
  normalisePointerPosition,
} from "../helpers/annotation.helpers";

const HIGHLIGHTER_ALPHA = 0.3;
const DEFAULT_ALPHA = 1;

export function useCanvasAnnotations(canvasRef) {
  const selectedToolId = useSelector(selectSelectedAnnotationToolId);
  const strokeColorHexCode = useSelector(selectAnnotationStrokeColorHexCode);
  const strokeWidth = useSelector(selectAnnotationStrokeWidth);
  const isAnnotationModeEnabled = useSelector(selectIsAnnotationModeEnabled);
  const clearVersion = useSelector(selectAnnotationClearVersion);

  const strokesRef = useRef([]);
  const undoneStrokesRef = useRef([]);
  const isPointerDownRef = useRef(false);

  const redrawCanvas = useCallback(() => {
    const canvasElement = canvasRef.current;
    const canvasContext = canvasElement.getContext("2d");
    const canvasWidth = canvasElement.width;
    const canvasHeight = canvasElement.height;

    canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);

    strokesRef.current.forEach((stroke) => {
      drawStrokeOnCanvasContext({
        canvasContext,
        stroke,
        canvasWidth,
        canvasHeight,
      });
    });
  }, [canvasRef]);

  const handlePointerDown = useCallback(
    (event) => {
      if (!isAnnotationModeEnabled) return;

      const canvasElement = canvasRef.current;
      const boundingRect = canvasElement.getBoundingClientRect();
      const normalisedPoint = normalisePointerPosition(
        event.clientX,
        event.clientY,
        boundingRect,
      );

      const baseStroke = {
        strokeWidth,
        strokeStyle: strokeColorHexCode,
        compositeOperation: "source-over",
        globalAlpha: DEFAULT_ALPHA,
      };

      const toolStrokeConfig =
        selectedToolId === ANNOTATION_TOOL_HIGHLIGHTER
          ? {
              compositeOperation: "source-over",
              globalAlpha: HIGHLIGHTER_ALPHA,
            }
          : selectedToolId === ANNOTATION_TOOL_ERASER
            ? {
                compositeOperation: "destination-out",
                globalAlpha: DEFAULT_ALPHA,
              }
            : baseStroke;

      const newStroke = {
        ...baseStroke,
        ...toolStrokeConfig,
        points: [normalisedPoint],
      };

      strokesRef.current = [...strokesRef.current, newStroke];
      undoneStrokesRef.current = [];
      isPointerDownRef.current = true;
    },
    [
      canvasRef,
      isAnnotationModeEnabled,
      selectedToolId,
      strokeColorHexCode,
      strokeWidth,
    ],
  );

  const handlePointerMove = useCallback(
    (event) => {
      if (!isPointerDownRef.current) return;

      const canvasElement = canvasRef.current;
      const boundingRect = canvasElement.getBoundingClientRect();
      const normalisedPoint = normalisePointerPosition(
        event.clientX,
        event.clientY,
        boundingRect,
      );

      const strokes = strokesRef.current;
      strokes[strokes.length - 1].points.push(normalisedPoint);

      const latestStroke = strokes[strokes.length - 1];
      const latestStrokePoints = latestStroke.points;

      if (latestStrokePoints.length < 2) return;

      const lastTwoPointsStroke = {
        ...latestStroke,
        points: latestStrokePoints.slice(-2),
      };

      const canvasContext = canvasElement.getContext("2d");

      drawStrokeOnCanvasContext({
        canvasContext,
        stroke: lastTwoPointsStroke,
        canvasWidth: canvasElement.width,
        canvasHeight: canvasElement.height,
      });
    },
    [canvasRef],
  );

  const handlePointerEnd = useCallback(() => {
    isPointerDownRef.current = false;
    if (selectedToolId === ANNOTATION_TOOL_HIGHLIGHTER) {
      redrawCanvas();
    }
  }, [redrawCanvas, selectedToolId]);

  const handleUndoLastStroke = useCallback(() => {
    const strokes = strokesRef.current;
    if (!strokes.length) return;

    const undoneStroke = strokes.pop();
    strokesRef.current = strokes;
    undoneStrokesRef.current = [...undoneStrokesRef.current, undoneStroke];
    redrawCanvas();
  }, [redrawCanvas]);

  const handleRedoLastStroke = useCallback(() => {
    const strokes = undoneStrokesRef.current;

    if (!strokes.length) return;

    const strokeToRestore = strokes.pop();

    undoneStrokesRef.current = strokes;
    strokesRef.current = [...strokesRef.current, strokeToRestore];
    redrawCanvas();
  }, [redrawCanvas]);

  const handleResize = useCallback(() => {
    const canvasElement = canvasRef.current;
    const boundingRect = canvasElement.getBoundingClientRect();

    const devicePixelRatio = window.devicePixelRatio || 1;

    canvasElement.width = Math.floor(boundingRect.width * devicePixelRatio);
    canvasElement.height = Math.floor(boundingRect.height * devicePixelRatio);

    redrawCanvas();
  }, [canvasRef, redrawCanvas]);

  useEffect(() => {
    handleResize();
  }, [handleResize]);

  useEffect(() => {
    if (!clearVersion) return;

    strokesRef.current = [];
    undoneStrokesRef.current = [];
    redrawCanvas();
  }, [clearVersion, redrawCanvas]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return {
    handlePointerDown,
    handlePointerMove,
    handlePointerEnd,
    handleUndoLastStroke,
    handleRedoLastStroke,
  };
}
