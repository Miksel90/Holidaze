import React, { useState } from "react";
import PropTypes from "prop-types";

const Carousel = ({ children }) => {
  const [current, setCurrent] = useState(0);
  const length = React.Children.count(children);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (length === 0) {
    return null;
  }

  return (
    <div className="relative flex items-center justify-center overflow-hidden">
      <button
        onClick={prevSlide}
        className="absolute left-0 z-10 text-primary  bg-white p-4 text-4xl font-bold border-2 border-cedar"
      >
        &lt;
      </button>
      {React.Children.map(children, (child, index) => (
        <div
          key={child.key}
          className={index === current ? "slide active" : "hidden"}
          // style={{ width: "100%", height: "100%" }}
        >
          {index === current && React.cloneElement(child)}
        </div>
      ))}
      <button
        onClick={nextSlide}
        className="absolute right-0 z-10 text-primary bg-white p-4 text-4xl font-bold border-2 border-cedar"
      >
        &gt;
      </button>
    </div>
  );
};

Carousel.propTypes = {
  children: PropTypes.node,
};

export default Carousel;
