import React from "react";
import Logout from "./Logout";
import { useAuth } from "@/context/authContext";

const Header = () => {
  const { currentUser } = useAuth();

  return (
    <div className="header-container">
      <h1 className="header-title">Todo</h1>
      {currentUser && (
        <h3 className="header-welcome">
          Welcome <span style={{ color: "#FFC107" }}>{currentUser.email}</span>
        </h3>
      )}
      <Logout />
    </div>
  );
};

export default Header;
