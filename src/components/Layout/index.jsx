import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

/**
 * Layout component that defines the structure of the application with a header, footer, and content area.
 *
 * @component
 * @example
 * return (
 *   <Layout />
 * )
 */
const Layout = () => {
  return (
    <div className="bg-boulder w-full flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow w-full">
        <div className="w-full md:pl-[180px] lg:pl-64 lg:mt-1 xxs:mt-15">
          <div className="mx-auto px-1">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="w-full md:pl-[180px] lg:pl-64">
        <div className="mx-auto px-1">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
