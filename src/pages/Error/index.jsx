import { Helmet } from "react-helmet";

const NotFound = () => {
  return (
    <main>
      <Helmet>
        <title>404 | GadgetVault</title>
      </Helmet>
      <h2>404</h2>
      <p>That page does not exist!</p>
    </main>
  );
};

export default NotFound;
