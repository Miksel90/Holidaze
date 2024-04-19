import BrowseContainer from "../../components/Containers/BrowseContainer";
import RegisterForm from "../../components/Auth/Register";
import ReviewContainer from "../../components/Containers/ReviewsContainer";

function RegisterPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-1 items-stretch">
      <div className="col-span-1 md:col-span-3 bg-primary rounded-sm p-4 ">
        <h1 className="text-cedar text-center font-condensed text-3xl uppercase font-bold rounded-sm">
          Register
        </h1>
        <RegisterForm />
      </div>
      <div className="col-span-1 md:col-span-3 bg-primary p-1 flex flex-col justify-evenly text-xl ">
        <BrowseContainer />
      </div>

      <div className="col-span-1 md:col-span-2 bg-primary text-center">
        Venue 1
      </div>
      <div className="col-span-1 md:col-span-2  bg-primary text-center">
        Venue 2
      </div>
      <div className="col-span-1 md:col-span-2 bg-primary text-center">
        Venue 3
      </div>

      <div className="col-span-1 md:col-span-3 bg-white text-center">
        <ReviewContainer />
      </div>
      <div className="col-span-1 md:col-span-3 bg-primary text-center">
        Pop Managers
      </div>
    </div>
  );
}

export default RegisterPage;
