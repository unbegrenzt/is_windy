import loadingAnimation from '../../../../public/animations/loading.json';
import Lottie from "lottie-react";

export default function LottieAnimation() {
  return (
    <div className='w-6 h-6 mr-2'>
      <Lottie animationData={loadingAnimation} loop={true} />
    </div>
  )
};
