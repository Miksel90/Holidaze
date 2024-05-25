import { useState, useEffect } from "react";

/**
 * BackToTopButton component that displays a button to scroll back to the top of the page when scrolled down.
 *
 * @component
 * @example
 * return (
 *   <BackToTopButton />
 * )
 */
const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    /**
     * Toggles the visibility of the button based on the scroll position.
     */
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  /**
   * Scrolls the window to the top smoothly.
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-4 right-4">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="bg-matisse text-white p-3 rounded-full shadow-lg transition duration-300"
        >
          Back to Top
        </button>
      )}
    </div>
  );
};

export default BackToTopButton;
