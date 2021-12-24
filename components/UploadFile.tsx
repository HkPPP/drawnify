import { UploadFileProp } from "./interfaces"

import React, {useCallback, useEffect} from 'react'
import {useDropzone} from 'react-dropzone'

const UploadFile = ({label, text, maxSize, fileTypes, handleFiles} : UploadFileProp ) => {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone()
  useEffect(()=>{
    if (acceptedFiles) handleFiles(acceptedFiles);
  }, [acceptedFiles.length])
  return (
    <div className="border-dashed border-2 w-72 h-32 rounded flex justify-center items-center" {...getRootProps()}>
      <label className='relative cursor-pointer text-xs italic underline' >
        <p>Click to select an image</p>
        <input {...getInputProps()} />
      </label>
      <p className='relative text-xs'>, or drag and drop it</p>
    </div>
  )
}

export default UploadFile