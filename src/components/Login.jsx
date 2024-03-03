import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

export default function Login() {
  const { loadUser } = useContext(UserContext);
  const navigate = useNavigate();
  const users = loadUser();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  function loginUser(e) {
    e.preventDefault();

    // Check if the user is admin
    if (user.username === "admin" && user.password === "ad12343211ad") {
      // Save admin information in sessionStorage
      sessionStorage.setItem(
        "connectedUser",
        JSON.stringify({ username: "admin", isAdmin: true })
      );
      // Redirect to admin panel or any other admin-specific page
      navigate("/SystemAdmin");
      return;
    }

    const matchedUser = users.find(
      (u) => u.username === user.username && u.password === user.password
    );

    if (matchedUser) {
      console.log(matchedUser); 
      // Save user information in sessionStorage
      sessionStorage.setItem("connectedUser", JSON.stringify(matchedUser));
      // Redirect to profile page
      navigate("/Profile");
    } else {
      alert("Invalid username or password");
      return;
    }
  }

  return (
    <>
      <form onSubmit={loginUser} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="logname"
            style={{
              fontWeight: "bold",
              fontSize: "16px",
              marginRight: "10px",
            }}
          >
            <FaUser /> Username
          </label>
          <br />
          <input
            type="text"
            required
            onChange={(e) =>
              setUser((prev) => ({ ...prev, username: e.target.value }))
            }
            style={{
              padding: "5px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="logpasswordinp"
            style={{
              fontWeight: "bold",
              fontSize: "16px",
              marginRight: "10px",
            }}
          >
            <FaLock /> Password
          </label>
          <br />
          <input
            type="password"
            required
            onChange={(e) =>
              setUser((prev) => ({ ...prev, password: e.target.value }))
            }
            style={{
              padding: "5px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "blue",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
      <button
        onClick={() => navigate("/Register")}
        style={{
          backgroundColor: "green",
          color: "white",
          padding: "10px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Register
      </button>
    </>
  );

}
