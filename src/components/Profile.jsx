import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Retrieve connected user information from sessionStorage
    const storedUser = sessionStorage.getItem("connectedUser");
    if (storedUser) {
      // Parse the stored user information
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Check if user has a photo
      if (parsedUser.photo instanceof File) {
        // Create a FileReader instance
        const reader = new FileReader();

        // Define what to do when file is loaded
        reader.onload = () => {
          // Set the user state with the base64 string result
          setUser((prevUser) => ({
            ...prevUser,
            photo: reader.result, // This will be the base64 string representation of the image
          }));
        };

        // Read the file as Data URL (base64)
        reader.readAsDataURL(parsedUser.photo);
      }
    }
  }, []);

  const logoutUser = (email) => {
    // Retrieve the connected user's email from sessionStorage
    const storedUser = sessionStorage.getItem("connectedUser");
    if (storedUser) {
      // Parse the stored user information
      const parsedUser = JSON.parse(storedUser);
      // Check if the provided email matches the logged-in user's email
      if (parsedUser.email === email) {
        sessionStorage.removeItem("connectedUser");
        window.location.href = "/";
      } else {
        // Handle case where provided email doesn't match logged-in user's email
        console.log("Invalid user");
      }
    }
  };

  // Check if user data is loaded before rendering profile information
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "20px",
        maxWidth: "400px",
        margin: "0 auto",
        marginTop: "20px",
      }}
    >
      <img
        src={user.photo}
        alt="Profile"
        style={{
          width: "100%",
          borderRadius: "50%",
          marginBottom: "20px",
        }}
      />
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Last Name:</strong> {user.lastname}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>City:</strong> {user.city}
      </p>
      <p>
        <strong>Street:</strong> {user.street}
      </p>
      <p>
        <strong>House Number:</strong> {user.house}
      </p>
      <p>
        <strong>Date of Birth:</strong> {user.birthdate}
      </p>
      <div style={{ marginTop: "20px" }}>
        <button
          style={{ marginRight: "10px" }}
          onClick={() => navigate("/EditDetails")}
        >
          Edit
        </button>
        <a
          href="https://games.yo-yoo.co.il/index.php?cat=121"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button style={{ backgroundColor: "blue", color: "white" }}>
            Play Game
          </button>
        </a>
        <button
          onClick={() => logoutUser(user.email)}
          style={{ backgroundColor: "red", color: "white" }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
