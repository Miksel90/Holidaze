import { Routes, Route } from "react-router-dom";
import {
  HomePage,
  AboutPage,
  ProfilePage,
  VenuePage,
  BookedPage,
  VenueSpecificPage,
  RegisterPage,
  NotFound,
} from "./pages";
import Layout from "./components/Layout/index.jsx";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="venues" element={<VenuePage />} />
          <Route path="venues/:id" element={<VenueSpecificPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="profiles/:name" element={<ProfilePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="booked" element={<BookedPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
