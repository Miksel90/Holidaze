import { useState } from "react";
import reviews from "./dummyReviews";
import { FaQuoteLeft } from "react-icons/fa";

/**
 * ReviewContainer component that displays a random review from the reviews array.
 *
 * @component
 * @example
 * return (
 *   <ReviewContainer />
 * )
 */
function ReviewContainer() {
  const [currentReview] = useState(pickRandomReview());

  /**
   * Picks a random review from the reviews array.
   *
   * @returns {Object} A random review object.
   */
  function pickRandomReview() {
    const randomIndex = Math.floor(Math.random() * reviews.length);
    return reviews[randomIndex];
  }

  return (
    <div className="p-4 flex flex-col font-sans text-start ">
      <h1>
        <FaQuoteLeft className="text-silver text-3xl"></FaQuoteLeft>
      </h1>
      <div className="mt-1 p-2 text-2xl">
        <p>{currentReview.review}</p>
        <div className="flex flex-col text-end p-4 mt-1">
          <h2 className="text-cedar italic font-bold">{currentReview.name}</h2>
          <p className="text-sm">Managed since {currentReview.year}</p>
        </div>
      </div>
    </div>
  );
}

export default ReviewContainer;
