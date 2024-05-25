import { useEffect, useState } from "react";
import SearchBar from "../../components/Search";
import ReviewContainer from "../../components/Containers/ReviewsContainer";
import LoginForm from "../../components/Auth/Login";
import ProfilesList from "../../components/Lists/ProfilesList";
import VenuesList from "../../components/Lists/VenueList";
import BackToTopButton from "../../components/Buttons/BackToTop";

/**
 * VenuePage component that displays a search bar, recent venues, popular managers, reviews, and login form if the user is not logged in.
 *
 * @returns {JSX.Element} The rendered VenuePage component.
 */
const VenuePage = () => {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-1 items-stretch">
      {userName ? (
        <div className="col-span-1 md:col-span-6 bg-primary p-4 flex flex-col md:flex-row md:text-center md:items-baseline justify-evenly">
          <h1 className="text-cedar text-center font-condensed text-3xl capitalize font-bold ">
            Find your paradise today
          </h1>
          <SearchBar />
        </div>
      ) : (
        <>
          <div className="col-span-1 md:col-span-3 bg-primary rounded-sm p-4 ">
            <h1 className="text-cedar text-center font-condensed text-3xl uppercase font-bold rounded-sm">
              Login
            </h1>
            <LoginForm />
          </div>
          <div className="col-span-1 md:col-span-3 bg-primary p-4 flex flex-col justify-evenly ">
            <h2 className="text-cedar text-center font-condensed text-3xl capitalize font-bold ">
              Find your paradise today
            </h2>
            <SearchBar />
          </div>
        </>
      )}

      <div className="col-span-1  md:col-span-6 bg-primary p-4  flex flex-col md:flex-wrap gap-4 justify-evenly">
        <h3 className="text-cedar text-center font-condensed text-3xl capitalize font-bold ">
          Recent Venues
        </h3>
        <VenuesList />
      </div>
      <div className="col-span-1 md:col-span-3 bg-white text-center rounded-sm p-4 ">
        <h2 className="text-cedar text-center font-condensed text-3xl capitalize font-bold">
          Popular Managers
        </h2>
        <ProfilesList />
      </div>
      <div className="col-span-1 md:col-span-3 bg-white text-center rounded-sm p-4 ">
        <ReviewContainer />
      </div>
      <BackToTopButton />
    </div>
  );
};

export default VenuePage;
