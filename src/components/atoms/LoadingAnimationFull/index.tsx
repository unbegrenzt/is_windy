"use client";

import loadingAnimation from '../../../../public/animations/loading_three_dots.json';
import Lottie from "lottie-react";

export default function LoadingAnimationFull() {
  return (
    <Lottie animationData={loadingAnimation} loop={true} />
  )
};
