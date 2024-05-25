import { Helmet } from "react-helmet";

/**
 * NotFound component that displays a 404 error message.
 *
 * @returns {JSX.Element} The rendered NotFound component.
 */
const NotFound = () => {
  return (
    <main>
      <Helmet>
        <title>404 | Holidaze</title>
      </Helmet>
      <h2>404</h2>
      <p>That page does not exist!</p>
    </main>
  );
};

export default NotFound;
