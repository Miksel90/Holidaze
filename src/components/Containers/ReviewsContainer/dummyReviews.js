/**
 * @typedef {Object} Review
 * @property {string} name - The name of the reviewer.
 * @property {number} rating - The rating given by the reviewer (1 to 5).
 * @property {string} review - The review text.
 * @property {number} year - The year the review was written.
 */

/**
 * An array of review objects, each containing details about a review.
 *
 * @type {Review[]}
 */
const reviews = [
  {
    name: "Darth Vader",
    rating: 5,
    review:
      "Impressive, most impressive. Listing my vacation pod here doubled its visibility and income. The Force is strong with Holidaze.",
    year: 2021,
  },
  {
    name: "Luke Skywalker",
    rating: 4,
    review:
      "Great platform, easy to use, although customer service response times could be faster. Has definitely helped increase bookings for my secluded island retreat.",
    year: 1984,
  },
  {
    name: "Leia Organa",
    rating: 5,
    review:
      "Absolutely stunning service! Easy listing process and great exposure. Felt like royalty with all the bookings coming in. Highly recommend Holidaze.",
    year: 2020,
  },
  {
    name: "Han Solo",
    rating: 4,
    review:
      "Solid platform with reliable payments. Only hiccup is the occasional site maintenance during peak hours. Otherwise, it’s perfect for renting out the Falcon.",
    year: 2019,
  },
  {
    name: "Chewbacca",
    rating: 3,
    review: "Rrrrrrr-ghghghghgh!",
    year: 2018,
  },
  {
    name: "Obi-Wan Kenobi",
    rating: 5,
    review:
      "A tranquil experience using Holidaze. It’s been perfect for renting out my desert hideout for meditation retreats. Highly effective and peaceful.",
    year: 2017,
  },
  {
    name: "Anakin Skywalker",
    rating: 2,
    review:
      "Not what I expected. I found the fees a bit high for my taste. Got some bookings but not enough to justify the costs.",
    year: 2016,
  },
  {
    name: "Yoda",
    rating: 5,
    review:
      "Helpful, Holidaze is. Used it, many have. Return, I will. Increased my hut’s bookings, it has.",
    year: 130,
  },
  {
    name: "Boba Fett",
    rating: 3,
    review:
      "Adequate for a bounty hunter on the move. Useful for short-term stays between missions. Could use more security features.",
    year: 2021,
  },
  {
    name: "Jabba the Hutt",
    rating: 1,
    review:
      "Unsatisfactory! The fees are too high and the service too slow. Lost more credits than earned. Recommend it, I do not!",
    year: 2020,
  },
];

export default reviews;
