import { useFetchVenues } from "../../../hooks/useFetchVenues";
import Card from "../../Card";

function VenuesList() {
  const { venues, isLoading, error } = useFetchVenues();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const filteredVenues = venues.filter(
    (venue) => venue.meta && venue.meta.breakfast
  );

  return (
    <>
      {filteredVenues.map((venue) => (
        <Card key={venue.id} {...venue} />
      ))}
    </>
  );
}

export default VenuesList;
