import Logo from "../../assets/Logo/holidazeLogo.webp";

function HomePage() {
  return (
    <div className="">
      <h1 className="text-white text-center font-condensed text-3xl">
        Home Page
      </h1>
      <div>
        <img
          src={Logo}
          alt="The logo of Holidaze"
          style={{ width: "75px", height: "75px" }}
          className="rounded-full"
        />
      </div>
    </div>
  );
}

export default HomePage;
