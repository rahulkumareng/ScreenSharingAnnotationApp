import { useDispatch, useSelector } from "react-redux";

// selectors
import {
  selectSelectedAnnotationToolId,
  selectAnnotationStrokeColorHexCode,
  selectAnnotationStrokeWidth,
  selectIsAnnotationModeEnabled,
} from "../store/annotation/AnnotationSelectors";

// actions
import {
  annotationSetTool,
  annotationSetColor,
  annotationSetWidth,
  annotationToggleMode,
  annotationClearAll,
} from "../store/annotation/AnnotationActions";

export function useAnnotationControls() {
  const dispatch = useDispatch();

  const selectedToolId = useSelector(selectSelectedAnnotationToolId);
  const strokeColorHexCode = useSelector(selectAnnotationStrokeColorHexCode);
  const strokeWidth = useSelector(selectAnnotationStrokeWidth);
  const isAnnotationModeEnabled = useSelector(selectIsAnnotationModeEnabled);

  const handleToolChange = (toolId) => dispatch(annotationSetTool(toolId));

  const handleColorChange = (colorHexCode) =>
    dispatch(annotationSetColor(colorHexCode));

  const handleStrokeWidthChange = (widthValue) =>
    dispatch(annotationSetWidth(widthValue));

  const handleToggleAnnotationMode = () => dispatch(annotationToggleMode());

  const handleClearAnnotations = () => dispatch(annotationClearAll());

  return {
    selectedToolId,
    strokeColorHexCode,
    strokeWidth,
    isAnnotationModeEnabled,
    handleToolChange,
    handleColorChange,
    handleStrokeWidthChange,
    handleToggleAnnotationMode,
    handleClearAnnotations,
  };
}
