import { useState, useEffect } from "react";
import LoginForm from "../../components/Auth/Login";
import SearchBar from "../../components/Search";
import ReviewContainer from "../../components/Containers/ReviewsContainer";
import imageOne from "../../assets/Images/golf.webp";
import imageTwo from "../../assets/Images/suiteLife.webp";
import imageThree from "../../assets/Images/Explore.webp";
import ProfilesList from "../../components/Lists/ProfilesList";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

function HomePage() {
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
        <div className="col-span-1 md:col-span-6 bg-primary p-8 flex flex-col justify-evenly ">
          <h1 className="text-cedar text-center font-condensed text-3xl capitalize font-bold rounded-sm">
            Find your paradise today
          </h1>
          <SearchBar />
        </div>
      ) : (
        <>
          <Helmet>
            <title>Home | Holidaze</title>
          </Helmet>
          <div className="col-span-1 md:col-span-3 bg-primary rounded-sm p-4 ">
            <h1 className="text-cedar text-center font-condensed text-3xl uppercase font-bold rounded-sm">
              Login
            </h1>
            <LoginForm />
          </div>
          <div className="col-span-1 md:col-span-3 bg-primary p-8 flex flex-col justify-evenly ">
            <h2 className="text-cedar text-center font-condensed text-3xl capitalize font-bold rounded-sm">
              Find your paradise today
            </h2>
            <SearchBar />
          </div>
        </>
      )}
      <div className="col-span-1 md:col-span-2 bg-primary text-center rounded-sm ">
        <Link to="/venues">
          <div className="relative">
            <div className="absolute inset-0 flex items-end justify-center text-cedar font-condensed  text-4xl p-2 bg-primary hover:text-primary bg-opacity-0 hover:bg-opacity-50">
              <h2 className="border-2 px-4 bg-white rounded-sm">Golf</h2>
            </div>
            <img src={imageOne} alt="Golf course" className="w-full h-20" />
          </div>
        </Link>
      </div>
      <div className="col-span-1 md:col-span-2 bg-primary text-center rounded-sm">
        <Link to="/venues">
          <div className="relative">
            <div className="absolute inset-0 flex items-end justify-center text-cedar font-condensed text-4xl  p-2 bg-primary hover:text-primary bg-opacity-0 hover:bg-opacity-50">
              <h2 className="border-2 px-4 bg-white rounded-sm">Suite LIfe</h2>
            </div>
            <img
              src={imageTwo}
              alt="Luxurious hotel with pool"
              className="w-full h-20"
            />
          </div>
        </Link>
      </div>
      <div className="col-span-1 md:col-span-2 bg-primary text-center rounded-sm">
        <Link to="/venues">
          <div className="relative">
            <div className="absolute inset-0 flex items-end justify-center text-cedar font-condensed text-4xl p-2 bg-primary hover:text-primary bg-opacity-0 hover:bg-opacity-50">
              <h2 className="border-2 px-4 bg-white rounded-sm">Explore</h2>
            </div>
            <img
              src={imageThree}
              alt="Wineglass overlooking the fields"
              className="w-full h-20"
            />
          </div>
        </Link>
      </div>
      <div className="col-span-1 md:col-span-3 bg-white text-center rounded-sm p-4 ">
        <h2 className="text-cedar text-center font-condensed text-4xl capitalize font-bold rounded-sm py-2">
          Popular Managers
        </h2>
        <ProfilesList />
      </div>
      <div className="col-span-1 md:col-span-3 bg-white text-center rounded-sm p-4 ">
        <ReviewContainer />
      </div>
    </div>
  );
}

export default HomePage;
