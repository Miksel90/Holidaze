import React, { useState } from "react";
import PropTypes from "prop-types";

/**
 * Carousel component that displays a set of children elements as slides.
 *
 * @component
 * @param {Object} props - The props for Carousel.
 * @param {React.ReactNode} props.children - The children elements to be displayed as slides.
 * @example
 * return (
 *   <Carousel>
 *     <div>Slide 1</div>
 *     <div>Slide 2</div>
 *     <div>Slide 3</div>
 *   </Carousel>
 * )
 */
const Carousel = ({ children }) => {
  const [current, setCurrent] = useState(0);
  const length = React.Children.count(children);

  /**
   * Advances to the next slide.
   */
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  /**
   * Goes back to the previous slide.
   */
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (length === 0) {
    return null;
  }

  return (
    <div className="relative flex items-center justify-center overflow-hidden h-998">
      {length > 1 && (
        <button
          onClick={prevSlide}
          className="absolute left-1 z-12 text-cedar bg-white rounded-2xl px-2 py-1 text-2xl font-bold"
        >
          &lt;
        </button>
      )}
      {React.Children.map(children, (child, index) => (
        <div
          key={child.key}
          className={index === current ? "slide active w-full" : "hidden"}
        >
          {index === current && React.cloneElement(child)}
        </div>
      ))}
      {length > 1 && (
        <button
          onClick={nextSlide}
          className="absolute right-1 z-12 text-cedar bg-white rounded-2xl px-2 py-1 text-2xl font-bold"
        >
          &gt;
        </button>
      )}
    </div>
  );
};

Carousel.propTypes = {
  children: PropTypes.node,
};

export default Carousel;
