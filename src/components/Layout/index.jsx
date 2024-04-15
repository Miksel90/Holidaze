import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="bg-boulder w-full flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow w-full">
        {/* Adjust padding for medium screens instead of extra-large */}
        <div className="w-full md:pl-[200px] lg:pl-64  lg:mt-2  xxs:mt-15 ">
          <div className="max-w-4xl mx-auto px-4">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="w-full md:pl-[200px] lg:pl-64">
        {/* Footer should match the outlet's alignment and padding */}
        <div className="max-w-4xl mx-auto px-4">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
