export function normalisePointerPosition(clientX, clientY, canvasBoundingRect) {
  if (!canvasBoundingRect) return null;

  const xOffset = clientX - canvasBoundingRect.left;
  const yOffset = clientY - canvasBoundingRect.top;

  if (xOffset < 0 || yOffset < 0) {
    return null;
  }

  const normalisedX = xOffset / canvasBoundingRect.width;
  const normalisedY = yOffset / canvasBoundingRect.height;

  return {
    x: normalisedX,
    y: normalisedY,
  };
}

export function drawStrokeOnCanvasContext(params) {
  const { canvasContext, stroke, canvasWidth, canvasHeight } = params;

  const pointsToDraw = stroke.points;

  if (!pointsToDraw || pointsToDraw.length < 2) {
    return;
  }

  canvasContext.save();

  canvasContext.lineJoin = "round";
  canvasContext.lineCap = "round";
  canvasContext.lineWidth = stroke.strokeWidth;
  canvasContext.strokeStyle = stroke.strokeStyle;
  canvasContext.globalAlpha = stroke.globalAlpha;
  canvasContext.globalCompositeOperation = stroke.compositeOperation;

  canvasContext.beginPath();

  pointsToDraw.forEach((point, index) => {
    const absoluteX = point.x * canvasWidth;
    const absoluteY = point.y * canvasHeight;

    if (index === 0) {
      canvasContext.moveTo(absoluteX, absoluteY);
    } else {
      canvasContext.lineTo(absoluteX, absoluteY);
    }
  });

  canvasContext.stroke();

  canvasContext.restore();
}

export function triggerAnnotatedFrameDownload(params) {
  const { videoElement, canvasElement } = params;

  const exportCanvas = document.createElement("canvas");
  const exportContext = exportCanvas.getContext("2d");

  const exportWidth = canvasElement.width;
  const exportHeight = canvasElement.height;

  exportCanvas.width = exportWidth;
  exportCanvas.height = exportHeight;

  if (videoElement) {
    try {
      exportContext.drawImage(videoElement, 0, 0, exportWidth, exportHeight);
    } catch (error) {
      // console.log(error);
    }
  }

  try {
    exportContext.drawImage(canvasElement, 0, 0, exportWidth, exportHeight);
  } catch (error) {
    return;
  }

  const dataUrl = exportCanvas.toDataURL("image/png");

  const downloadLinkElement = document.createElement("a");
  downloadLinkElement.href = dataUrl;
  downloadLinkElement.download = "annotated-frame.png";
  downloadLinkElement.click();
}
