import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };

  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="create-recipe">Create Recipe</Link>
      <Link to="/saved-recipe">Save Recipe</Link>
      {!cookies.access_token ? (
        <Link to="/auth">Log In</Link>
      ) : (
        <button onClick={logout}>Log out</button>
      )}
    </div>
  );
};
