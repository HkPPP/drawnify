// import { SliderProp } from "./interfaces"

// const Slider = ({min, max, step} : SliderProp) => {
//   return (
//     <div className="w-128 h-8">
//       <input 
//         className="rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 w-full" 
//         type="range" 
//         min={min}
//         max={max}
//         step={step}
//       />
//       <div className="absolute text-gray-800 -ml-1 bottom-0 left-0 -mb-6">10</div>
//       <div className="absolute text-gray-800 -mr-1 bottom-0 right-0 -mb-6">150</div>
//     </div>
//   )
// }
  
// export default Slider

import { CalculateProp, SliderProp } from "./interfaces.js";

import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useResizedWidth } from "./useResizedWidth.js";

const calculateValueFromWidth = ({
  value,
  step,
  min,
  max,
  truckWidth
}: CalculateProp) => {
  return Math.floor((min + (value / truckWidth) * max) / step) * step;
};

const calculateWidthFromValue = ({
  value,
  step,
  min,
  max,
  truckWidth
}: CalculateProp) => {
  const val = value < min ? min : value;
  const result = ((Math.floor(val / step) * step) / max) * truckWidth;
  return result > truckWidth ? truckWidth : result;
};

export const Slider = (props : SliderProp) => {
  const { initValue = 0, min, max, step, onChange } = props;
  const [value, setVatue] = useState(initValue);
  const [truckRef, truckWidth] = useResizedWidth();
  const [thumbRef, thumbWidth] = useResizedWidth();

  const containerRef = useRef(null);

  const x = useMotionValue(0);
  const widthX = useTransform(x, (value) => {
    //console.log(`truck:${truckWidth}, thumb:${thumbWidth}`);
    return value + thumbWidth;
  });

  useEffect(() => {
    const width = calculateWidthFromValue({value, step, min, max, truckWidth});
    x.set(width);
    console.log(
      `value:${value}, step:${step}, min:${min}, max:${max}, truck:${truckWidth}, thumb:${thumbWidth}`
    );
  }, [value, step, min, max, truckWidth]);
 
  const handleDrag = (event, info) => {
    const value = x.get()
    const val = calculateValueFromWidth({value, step, min, max, truckWidth});
    setVatue(val);
    onChange && onChange(val);
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full h-2 px-2 bg-gray-300 rounded-full"
    >
      <motion.div 
        ref={truckRef} 
        className="relative w-full"
      >
        <motion.span
          ref={thumbRef}
          tabIndex={0}
          drag="x"
          dragConstraints={containerRef}
          dragElastic={0}
          dragMomentum={false}
          onDrag={handleDrag}
          className="absolute top-0 z-10 w-4 h-4 -mt-1 -ml-2 bg-red-700 rounded-full shadow cursor-pointer"
          style={{ x }}
        />
      </motion.div>
      <motion.span
        className="absolute top-0 left-0 h-2 bg-red-700 rounded-full"
        style={{ width: widthX }}
      />
      <div>{value}</div>
    </motion.div>
  );
};
