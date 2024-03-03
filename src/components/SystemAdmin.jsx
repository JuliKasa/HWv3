import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load users information from local storage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    // Filter out the admin user
    const filteredUsers = storedUsers.filter(
      (user) => user.username !== "admin"
    );
    setUsers(filteredUsers);
  }, []);

  const handleEditDetails = (username) => {
    // Redirect to the EditDetails page with the username as a parameter
    navigate(`/EditDetails`);
  };

  const handleDeleteUser = (username) => {
    // Remove the user from local storage
    const updatedUsers = users.filter((user) => user.username !== username);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    // Update state to reflect the changes
    setUsers(updatedUsers);
  };

  const handleLogout = () => {
    // Remove admin from session storage
    sessionStorage.removeItem("connectedUser");
    // Redirect to login page
    navigate("/login");
  };

  return (
    <div>
      {users.map((user) => (
        <div
          key={user.email}
          style={{ border: "1px solid black", padding: "10px", margin: "10px" }}
        >
          <div>
            <strong>Username:</strong> {user.username}
          </div>
          <div>
            <strong>Name:</strong> {user.name}
          </div>
          <div>
            <strong>Last Name:</strong> {user.lastname}
          </div>
          <div>
            <strong>Birthdate:</strong> {user.birthdate}
          </div>
          <div>
            <strong>Address:</strong>{" "}
            {user.city + " " + user.street + " " + user.house}
          </div>
          <div>
            <strong>Email:</strong> {user.email}
          </div>
          <button onClick={() => handleEditDetails(user.username)}>
            Edit Details
          </button>
          <button onClick={() => handleDeleteUser(user.username)}>
            Delete User
          </button>
        </div>
      ))}
      {/* Logout button */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
