import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="bg-boulder w-full flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow w-full">
        <div className="w-full md:pl-[200px] lg:pl-64  lg:mt-2  xxs:mt-15 ">
          <div className="max-w-4xl mx-auto px-4">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="w-full md:pl-[200px] lg:pl-64">
        <div className=" mx-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
