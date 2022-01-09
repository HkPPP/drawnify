export interface PictureProp {
  src: string,
}

export interface UploadFileProp {
  label: string,
  text: string,
  maxSize: number,
  fileTypes: string,
  handleFiles: any,
}

export interface SliderProp {
  initValue?: number,
  min: number,
  max: number,
  step?: number,
  onChange?: any
}

export interface CalculateProp {
  value: number,
  step: number,
  min: number,
  max: number,
  truckWidth: number | any,
}

