import { useParams } from "react-router-dom";
import { useFetchVenues } from "../../hooks/useFetchVenues";
import { useEffect } from "react";

const VenueSpecificPage = () => {
  let { id } = useParams();
  const { venues, isLoading, error } = useFetchVenues();

  useEffect(() => {
    if (venues.length > 0) {
      const venue = venues.find((p) => p.id.toString() === id);
      if (venue) {
        document.title = venue.title + " | Holidaze";
      }
    }
  }, [venues, id]);

  if (isLoading) {
    return <div className="">Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const venue = venues.find((p) => p.id.toString() === id);

  if (!venue) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>Venue Specific Page</h1>
    </div>
  );
};

export default VenueSpecificPage;
