import cv, { Mat } from "@techstark/opencv-js"
import { DrawnifyProp } from "./interfaces";



export const drawnifyImage = ({image, canvasId, quantization, edgeDetection, edgeModification} : DrawnifyProp)  => {
  const src = cv.imread(image);
  const gray = new cv.Mat();
  cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
  ///////////////Main Program here///////////////////////////
  
  let dst = new cv.Mat();
  // noise filter (median, avg)
  cv.medianBlur(gray, dst, 5);
  // Quantized (number of shades)
  cv.imshow(canvasId, dst);

  dst = quantizeGrayImage(dst, 5);

  const edge = new cv.Mat();
  // noise filter (median, avg)
  cv.medianBlur(gray, edge, 5);
  // edge detection (laplace, log, canny)
  cv.Canny(edge, edge, 50, 100, 3, true);
  // SobelFilter(edge, edge);
  // bolden edges (dilates)

  // => combine edge and dst
  const final = new cv.Mat();
  cv.subtract(dst, edge, final)

  cv.imshow(canvasId, final);
  // cv.imshow(canvasId, gray);
  //////////////////////////////////////////////////

  //////////Individual test here/////////////////////
  // const dst = new cv.Mat();
  // cv.medianBlur(gray, dst, 5);
  // const edge = new cv.Mat();
  // // cv.medianBlur(gray, edge, 5);
  // SobelFilter(gray, edge);

  // const final = new cv.Mat();
  // cv.subtract(gray, edge, final)
  // // cv.imshow(canvasId, edge);
  ////////////////////////////
  src.delete(); 
  dst.delete(); 
  edge.delete(); 
  gray.delete();
  final.delete();
}

const quantizeGrayImage = (img: Mat, N: number) => {
  const ones = new cv.Mat(img.rows, img.cols, img.type(), new cv.Scalar(1,1,1))
  let quantized = img.mul(ones, (1/(255/(N-1))))
  quantized = quantized.mul(ones, 255/(N-1));
  ones.delete()

  return quantized
}
const SobelFilter = (img: Mat, outputImg: Mat) => {
  const dsty = new cv.Mat();
  const dstx = new cv.Mat();

  cv.Sobel(img, dstx, cv.CV_8U, 1, 0, 3, 1, 0, cv.BORDER_DEFAULT);
  cv.Sobel(img, dsty, cv.CV_8U, 0, 1, 3, 1, 0, cv.BORDER_DEFAULT);
  cv.add(dstx, dsty, outputImg)
  dstx.delete(); dsty.delete();
}