import { useState } from "react";

import Step from "./Step";
import Slider from "./SliderInd/sliderIndex.js";
import "./styles.css";

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const _handleIndexChange = (index) => {
    setCurrentIndex(index);
    console.log("index:" , index)
    
  };

  const _handleNext = (currentIndex) => {
    setCurrentIndex(currentIndex + 1);
  };

  const _handleComplete = () => {};

  return (
    <div className="App">
      <div className="container">
        <Step currentIndex={currentIndex} />
      </div>
      <Slider onChange={_handleIndexChange} currentIndex={currentIndex} />
    </div>
  );
}