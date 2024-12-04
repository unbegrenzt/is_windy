"use client";

import loadingAnimation from '../../../../public/animations/loading.json';
import Lottie from "lottie-react";

export default function LoadingAnimation() {
  return (
    <div className='w-6 h-6 mr-2'>
      <Lottie animationData={loadingAnimation} loop={true} />
    </div>
  )
};
