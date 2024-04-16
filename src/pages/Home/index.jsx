import LoginForm from "../../components/Auth/Login";

function HomePage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-1 items-center justify-center">
      <div className="col-span-1 md:col-span-3 bg-primary rounded-sm p-4 ">
        <h1 className="text-cedar text-center font-condensed text-3xl uppercase font-bold  rounded-sm">
          Login
        </h1>
        <LoginForm />
      </div>
      <div className="col-span-1 md:col-span-3 bg-primary">
        <h1 className="text-white text-center font-condensed text-3xl">
          Search component
        </h1>
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

      <div className="col-span-1 md:col-span-3 bg-primary text-center">
        Feedback
      </div>
      <div className="col-span-1 md:col-span-3 bg-primary text-center">
        Pop Managers
      </div>
    </div>
  );
}

export default HomePage;
