import { useAuth } from "@/context/authContext";

const Logout = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div>
      {currentUser ? (
        <button
          className="logout-button"
          onClick={() => {
            logout();
          }}
        >
          logout
        </button>
      ) : null}
    </div>
  );
};

export default Logout;
