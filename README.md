# Screen Sharing Annotation Tool

Minimal React app (Vite + Redux + Redux-Saga) that lets you:

- Start/stop screen sharing using `navigator.mediaDevices.getDisplayMedia`.
- Draw on top of the shared screen (pen, highlighter, eraser).
- Clear, undo, redo annotations, and export the current annotated frame as a PNG.

## Setup

**Requirements**

- Node.js and npm
- Modern browser with screen sharing support (Chrome, Edge, recent Firefox, etc.)

**Install and run** (from the repository root):

```bash
cd screen-sharing-app
npm install

# dev server
npm run dev

# production build + preview
npm run build
npm run preview
```

## Canvas layering and scaling

The UI uses two layers inside a single wrapper:

1. **Video layer** – a `<video>` element bound to the `getDisplayMedia` stream.
2. **Canvas layer** – a `<canvas>` positioned absolutely on top of the video.

The wrapper:

- Uses `aspect-ratio: 16 / 9` and `object-fit: contain` on the video so the shared screen scales responsively.
- Stretches the canvas to `width: 100%; height: 100%` so it always covers the visible video area.

To keep annotations aligned during resize, the app:

- Stores stroke points in **normalised coordinates** (each point is between `0` and `1` along X and Y, relative to the canvas bounding box).
- On resize, recomputes the canvas `width` and `height` from the DOM size and device pixel ratio.
- Redraws all strokes by multiplying each normalised point by the new pixel dimensions.

This means annotations stay correctly positioned over the underlying video even when the window or container size changes.

## Key architectural decisions

- **Redux slices**
  - `screenShare` tracks `isSharing`, `isStarting`, `stream`, and `errorMessage`.
  - `annotation` tracks selected tool, stroke color, stroke width, annotation mode, and a `clearVersion` counter.

- **Redux-Saga for async flows**
  - `ScreenShareSaga` starts and stops the media stream:
    - On start: calls `navigator.mediaDevices.getDisplayMedia` and dispatches success/failure.
    - On stop: stops all tracks on the active `MediaStream` and clears state.

- **Custom hooks for separation of concerns**
  - `useScreenShare` connects the `screenShare` slice to the `<video>` element via a `ref` and exposes start/stop handlers.
  - `useCanvasAnnotations` owns the in-memory stroke list, pointer handling, resize behaviour, and undo/redo logic.
  - `useAnnotationControls` wraps all annotation-related Redux dispatches and selectors behind a simple interface for the page.

- **Component structure**
  - `ScreenSharePage` is a thin orchestrator: wires hooks and passes data/handlers to child components.
  - `ScreenShareToolbar` renders all controls (tool, color, width, annotation mode, Undo/Redo, export, screen share toggle).
  - `ScreenShareStage` renders the video + canvas overlay and the error banner.
