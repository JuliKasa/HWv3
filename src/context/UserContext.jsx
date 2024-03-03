import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider(props) {
  const [users, setUsers] = useState([]);

  // load users from local storage
  function loadUser() {
    return JSON.parse(localStorage.getItem("users")) || [];
  }

  // function saveUser(user) {
  //   let newUsersArray = [...users, user];
  //   setUsers(newUsersArray);
  //   localStorage.setItem("users", JSON.stringify(newUsersArray));
  // }

  function saveUser(user) {
    // Convert File object to data URL
    const reader = new FileReader();
    reader.readAsDataURL(user.photo);
    reader.onload = function () {
      // Modify the user object to replace the File object with the data URL
      user.photo = reader.result; // Data URL of the image
    };
  console.log(user) ;
    let newUsersArray = [...users, user];
    setUsers(newUsersArray);
    localStorage.setItem("users", JSON.stringify(newUsersArray));
  }

  function editUsers(updatedUser) {
    // Find the index of the user to be edited
    const index = users.findIndex((user) => user.email === updatedUser.email);
    if (index !== -1) {
      // Update the user in the array
      const updatedUsers = [...users];
      updatedUsers[index] = updatedUser;
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    } else {
      console.error("User not found for editing.");
    }
  }

  //load users every time the system is loaded.
  useEffect(() => {
    setUsers(loadUser());
  }, []);

  //Capabilities we are interested in transferring
  const values = {
    users,
    saveUser,
    loadUser,
    editUsers,
  };

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
}
