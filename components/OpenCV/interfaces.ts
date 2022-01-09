export interface DrawnifyProp {
  image: string,
  canvasId: string,
  quantization?: {
    noiseFilter: NoiseFilter,
    noiseLevel: number,
    rangeOfShades: number,
  },
  contrast?: {
    lowerBound: number,
    upperBound: number
  },
  edgeDetection?: {
    detectionMethod?: EdgeDetectionMethod,
    noiseFilter?: number,
    noiseLevel?: number,
    threshold?: number,
  },
  edgeModification?: {
    boldness: number,
  },
}
export enum NoiseFilter {
  AVERAGE,
  MEAN,
} 

export enum EdgeDetectionMethod {
  CANNY,
  SOBEL,
  LAPLACIAN,
} 