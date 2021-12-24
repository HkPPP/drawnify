import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import { useEffect, useState } from 'react'

import UploadFile from '../components/UploadFile'
import { drawnifyImage } from '../components/OpenCV/processing'
import { DrawnifyProp } from '../components/OpenCV/interfaces'

const Home: NextPage = () => {
  const CANVAS_ID = "canvas_main"
  const IMAGE_ID = "image_main"

  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [displayImage, setDisplayImage] = useState("");
  const [drawnifySettings, setDrawnifySettings] = useState<DrawnifyProp>({
    image: IMAGE_ID,
    canvasId: CANVAS_ID,
  });

  const handleUpload = () =>{
    setDisplayImage(URL.createObjectURL(uploadedImages[0]));
    setUploadedImages([]);
  };

  useEffect(() => {
    if (drawnifySettings && displayImage){
      drawnifyImage(drawnifySettings);
    }
  }, [drawnifySettings]);

  useEffect(() => {
    if (displayImage)
      // Free up memory
      URL.revokeObjectURL(displayImage)
  }, [displayImage])

  return (
    <>
      <Head>
        <title>drawnify</title>
        <meta name="description" content="Draw your favorite photo in style" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='flex flex-col items-center'>
        {displayImage 
          ? <Image 
              id={IMAGE_ID} 
              src={displayImage}
              alt="Your Transformed Image"
              width={500}
              height={500}
              onLoad={() => {
                if (drawnifySettings){
                  drawnifyImage(drawnifySettings);
                }
              }}
            />
          : null}
        <canvas id={CANVAS_ID}></canvas>
        <div className='flex flex-col items-center'>
          <UploadFile 
            label='abc' 
            text='abc' 
            maxSize={1232} 
            fileTypes='.png'  
            handleFiles={(files: File[]) => {setUploadedImages(files)} }
          />
          <button
            className='bg-indigo-500 text-white hover:bg-indigo-400 focus:outline-none disabled:bg-gray-200 disabled:text-gray-500 px-4 py-2 rounded-md uppercase text-xs tracking-wider font-semibold' 
            type='button' 
            onClick={handleUpload}
            disabled={!uploadedImages.length ? true : false}
          > 
            Upload Image
          </button>
        </div>
      </div>
    </>
    
    
  )
}

export default Home
