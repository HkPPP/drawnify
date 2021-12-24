import cv from "@techstark/opencv-js"
import { DrawnifyProp } from "./interfaces";

export const drawnifyImage = ({image, canvasId} : DrawnifyProp)  => {
  const src = cv.imread(image);
  const dst = new cv.Mat();
  cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY, 0);

  cv.imshow(canvasId, dst);

  src.delete(); dst.delete();
}