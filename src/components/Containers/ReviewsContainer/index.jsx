import { useState } from "react";
import reviews from "./dummyReviews";
import { FaQuoteLeft } from "react-icons/fa";
import DefaultButton from "../../Buttons/DefaultButton";

function ReviewContainer() {
  const [currentReview, setCurrentReview] = useState(pickRandomReview());

  function pickRandomReview() {
    const randomIndex = Math.floor(Math.random() * reviews.length);
    return reviews[randomIndex];
  }

  function handleButtonClick() {
    let newReview = pickRandomReview();
    while (newReview.name === currentReview.name) {
      newReview = pickRandomReview();
    }
    setCurrentReview(newReview);
  }

  return (
    <div className="p-4 flex flex-col font-sans text-start">
      <h1>
        <FaQuoteLeft className="text-silver text-3xl"></FaQuoteLeft>
      </h1>
      <div className="mt-1 p-2 text-md">
        <p>{currentReview.review}</p>
        <div className="flex flex-col text-end p-4">
          <h2 className="text-cedar italic font-bold">{currentReview.name}</h2>
          <p className="text-sm">Managed since {currentReview.year}</p>
        </div>
      </div>
      <div className="text-center text-lg ">
        <DefaultButton to="" onClick={handleButtonClick}>
          Another Review
        </DefaultButton>
      </div>
    </div>
  );
}

export default ReviewContainer;
