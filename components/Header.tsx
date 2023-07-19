import React from "react";
import Logout from "./Logout";
import { useAuth } from "@/context/authContext";

const Header = () => {
  const { currentUser } = useAuth();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        borderBottom: "1px solid #fff",
      }}
    >
      <h1>Todo App</h1>
      {currentUser && <h4>Welcome {currentUser.email}</h4>}
      <Logout />
    </div>
  );
};

export default Header;
