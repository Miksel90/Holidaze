import { logoutUser } from "./logout";

const Logout = () => {
  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    logoutUser();
  };

  if (userName) {
    return (
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  } else {
    return null;
  }
};

export default Logout;
