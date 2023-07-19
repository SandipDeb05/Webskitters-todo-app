import { useAuth } from "@/context/authContext";

const Logout = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div>
      {currentUser ? (
        <button
          style={{ padding: "0.5rem 1rem" }}
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
