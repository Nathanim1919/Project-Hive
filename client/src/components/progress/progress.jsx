import React, { useEffect, useRef, useState } from "react";
import "../../styles/progress.css";

export default function Progress({ progress, animates, total }) {
  const progressRef = useRef(null);
  const [degree, setDegree] = useState(0)

  useEffect(() => {
    const progressElement = progressRef.current;
    const animationDuration = animates; // Animation duration in milliseconds
    const intervalDuration = 20; // Interval duration in milliseconds
    const frames = animationDuration / intervalDuration;
    let currentFrame = 0;
    const progressPercent = (progress / total) * 100; // Convert progress to percentage
    setDegree(progressPercent);
    let progressDegree = (progressPercent / 100) * 360; // Convert progress to degrees

    if (progressDegree === 360){
      progressDegree = (progressPercent / 100) * 360 + 7;
    }
    const animationInterval = setInterval(() => {
      const gradientDegree = (currentFrame / frames) * progressDegree; // Gradually increase the gradient degree
      progressElement.style.background = `conic-gradient(#429ff7, ${gradientDegree}deg, #63f5ff 0deg)`;
      currentFrame++;

      if (currentFrame === frames) {
        clearInterval(animationInterval);
      }
    }, intervalDuration);

    return () => {
      clearInterval(animationInterval);
    };
  }, [progress, animates, total]);

  return (
    <div className="circular-progress" ref={progressRef}>
      <div className="number">{degree}%</div>
    </div>
  );
}
