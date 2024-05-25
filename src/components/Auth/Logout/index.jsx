import { logoutUser } from "./logout";

/**
 * Logout component for handling user logout.
 *
 * @component
 * @example
 * return (
 *   <Logout />
 * )
 */
const Logout = () => {
  const userName = localStorage.getItem("userName");

  /**
   * Handles the user logout process.
   */
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
