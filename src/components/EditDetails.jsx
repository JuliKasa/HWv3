import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function EditDetails() {
  const { editUsers } = useContext(UserContext);
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

  const [user, setUser] = useState({
    username: "",
    password: "",
    password2: "",
    name: "",
    lastname: "",
    birthdate: "",
    city: "",
    street: "",
    house: "",
    photo: "",
  });

  const [validation, setValidation] = useState({
    username: {
      isValid: true,
      error: "",
    },
    password: {
      isValid: true,
      error: "",
    },
    password2: {
      isValid: true,
      error: "",
    },
    name: {
      isValid: true,
      error: "",
    },
    lastname: {
      isValid: true,
      error: "",
    },
    birthdate: {
      isValid: true,
      error: "",
    },
    city: {
      isValid: true,
      error: "",
    },
    street: {
      isValid: true,
      error: "",
    },
    house: {
      isValid: true,
      error: "",
    },
    photo: {
      isValid: true,
      error: "",
    },
  });

  //cities list for choose
  const cities = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
  ];

  function editUser(e) {
    e.preventDefault();

    //validate the data
    validateUsername();
    validatePassword();
    validateVerifyPassword();
    validateName();
    validateBirthdate();
    validateCity();
    validateStreet();
    validateHouseNumber();
    validatePhoto();

    // Check if all validations passed
    const isValid =
      validation.username.isValid &&
      validation.password.isValid &&
      validation.password2.isValid &&
      validation.name.isValid &&
      validation.birthdate.isValid &&
      validation.city.isValid &&
      validation.street.isValid &&
      validation.house.isValid &&
      validation.photo.isValid;

    if (isValid) {
      // Update user details in session storage and local storage
      sessionStorage.setItem("connectedUser", JSON.stringify(user));
      localStorage.setItem("connectedUser", JSON.stringify(user));

      // Call editUsers from UserContext
      editUsers(user);
    } else {
      const errorMessages = Object.values(validation)
        .filter((field) => !field.isValid)
        .map((field) => field.error);

      // If there are validation errors, display an alert with error messages
      if (errorMessages.length > 0) {
        alert(errorMessages.join("\n"));
        return;
      }
    }
  }

  function validateUsername() {
    const regex = /^[a-zA-Z0-9 !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/;
    if (
      !user.username ||
      user.username.length > 60 ||
      !regex.test(user.username)
    ) {
      setValidation((prev) => ({
        ...prev,
        username: {
          isValid: false,
          error:
            "Username should contain only foreign letters, numbers, and special characters and should not exceed 60 characters.",
        },
      }));
    } else {
      setValidation((prev) => ({
        ...prev,
        username: {
          isValid: true,
          error: "",
        },
      }));
    }
  }

  function validatePassword() {
    const regexSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
    const regexCapitalLetter = /[A-Z]/;
    const regexNumber = /[0-9]/;

    if (
      !user.password ||
      user.password.length < 7 ||
      user.password.length > 12 ||
      !regexSpecialChar.test(user.password) ||
      !regexCapitalLetter.test(user.password) ||
      !regexNumber.test(user.password)
    ) {
      setValidation((prev) => {
        return {
          ...prev,
          password: {
            isValid: false,
            error:
              "Password must be between 7 and 12 characters and contain at least one special character, one capital letter, and one number.",
          },
        };
      });
    } else {
      setValidation((prev) => ({
        ...prev,
        password: {
          isValid: true,
          error: "",
        },
      }));
    }
  }

  function validateVerifyPassword() {
    if (user.password2 != user.password) {
      setValidation((prev) => {
        return {
          ...prev,
          password2: {
            isValid: false,
            error: "Passwords do not match.",
          },
        };
      });
    } else {
      setValidation((prev) => ({
        ...prev,
        password2: {
          isValid: true,
          error: "",
        },
      }));
    }
  }

  function validateName() {
    const regex = /^[a-zA-Z\s]*$/;
    if (!user.name || !regex.test(user.name)) {
      setValidation((prev) => {
        return {
          ...prev,
          name: {
            isValid: false,
            error: "Name should contain only letters and spaces.",
          },
        };
      });
    } else {
      setValidation((prev) => ({
        ...prev,
        name: {
          isValid: true,
          error: "",
        },
      }));
    }
  }

  function validateBirthdate() {
    const minDate = new Date("1900-01-01");
    const maxDate = new Date();
    const selectedDate = new Date(user.birthdate);
    if (selectedDate < minDate || selectedDate > maxDate) {
      setValidation((prev) => {
        return {
          ...prev,
          birthdate: {
            isValid: false,
            error: "Please select a reasonable birthdate.",
          },
        };
      });
    } else {
      setValidation((prev) => ({
        ...prev,
        birthdate: {
          isValid: true,
          error: "",
        },
      }));
    }
  }

  function validateCity() {
    if (!user.city || !cities.includes(user.city)) {
      setValidation((prev) => {
        return {
          ...prev,
          city: {
            isValid: false,
            error: "Please select a city from the list.",
          },
        };
      });
    } else {
      setValidation((prev) => ({
        ...prev,
        city: {
          isValid: true,
          error: "",
        },
      }));
    }
  }

  function validateStreet() {
    const regex = /^[\u0590-\u05FF\s]*$/;
    if (!user.street || !regex.test(user.street)) {
      setValidation((prev) => {
        return {
          ...prev,
          street: {
            isValid: false,
            error: "Street should contain only Hebrew letters.",
          },
        };
      });
    } else {
      setValidation((prev) => ({
        ...prev,
        street: {
          isValid: true,
          error: "",
        },
      }));
    }
  }

  function validateHouseNumber() {
    const regex = /^[0-9]*$/;
    if (!user.house || !regex.test(user.house) || user.house < 0) {
      setValidation((prev) => {
        return {
          ...prev,
          house: {
            isValid: false,
            error: "House number should be a positive integer.",
          },
        };
      });
    } else {
      setValidation((prev) => ({
        ...prev,
        house: {
          isValid: true,
          error: "",
        },
      }));
    }
  }

  function validatePhoto() {
    if (user.photo) {
      const fileType = user.photo.type;
      if (fileType !== "image/jpeg" && fileType !== "image/jpg") {
        setValidation((prev) => {
          return {
            ...prev,
            photo: {
              isValid: false,
              error: "Only jpg or jpeg files can be saved.",
            },
          };
        });
      } else {
        setValidation((prev) => {
          return {
            ...prev,
            photo: {
              isValid: true,
              error: "",
            },
          };
        });
      }
    }
  }

  function validateAdmin(user) {
    const storedUser = JSON.parse(sessionStorage.getItem("connectedUser"));
    if (storedUser.isAdmin) {
      navigate("/SystemAdmin");
    }
    else{
      alert("I wish you were the admin");
      navigate("/Profile");
    }
  }

  return (
    <>
      <h3>Edit Details</h3>
      <form onSubmit={editUser}>
        <input
          type="text"
          required
          placeholder="user name"
          value={user.username} // Set value attribute
          onChange={(e) =>
            setUser((prev) => ({ ...prev, username: e.target.value }))
          }
        />{" "}
        <br></br>
        <input
          type="password"
          required
          placeholder="password"
          value={user.password} // Set value attribute
          onChange={(e) =>
            setUser((prev) => ({ ...prev, password: e.target.value }))
          }
        />{" "}
        <br></br>
        <input
          type="password"
          required
          placeholder="verify password"
          value={user.password2} // Set value attribute
          onChange={(e) =>
            setUser((prev) => ({ ...prev, password2: e.target.value }))
          }
        />{" "}
        <br></br>
        <input
          type="text"
          required
          placeholder="name"
          value={user.name} // Set value attribute
          onChange={(e) =>
            setUser((prev) => ({ ...prev, name: e.target.value }))
          }
        />{" "}
        <br></br>
        <input
          type="text"
          required
          placeholder="last name"
          value={user.lastname} // Set value attribute
          onChange={(e) =>
            setUser((prev) => ({ ...prev, lastname: e.target.value }))
          }
        />{" "}
        <br></br>
        <label>birthdate:</label>
        <input
          type="date"
          required
          placeholder="birthdate"
          value={user.birthdate} // Set value attribute
          onChange={(e) =>
            setUser((prev) => ({ ...prev, birthdate: e.target.value }))
          }
        />{" "}
        <br></br>
        <input
          type="text"
          list="cities"
          required
          placeholder="city"
          value={user.city} // Set value attribute
          onChange={(e) =>
            setUser((prev) => ({ ...prev, city: e.target.value }))
          }
        />{" "}
        <datalist id="cities">
          {cities.map((city, index) => (
            <option key={index} value={city} />
          ))}
        </datalist>
        <br></br>
        <input
          type="text"
          required
          placeholder="street"
          value={user.street} // Set value attribute
          onChange={(e) =>
            setUser((prev) => ({ ...prev, street: e.target.value }))
          }
        />{" "}
        <br></br>
        <input
          type="number"
          required
          placeholder="house number"
          value={user.house} // Set value attribute
          onChange={(e) =>
            setUser((prev) => ({ ...prev, house: e.target.value }))
          }
        />{" "}
        <br></br>
        <input
          type="file"
          required
          placeholder="profile photo"
          onChange={(e) =>
            setUser((prev) => ({ ...prev, photo: e.target.files[0] }))
          }
        />{" "}
        <br></br>
        <button type="submit">Edit</button>
      </form>
      <button onClick={() => navigate("/Profile")}>Back To Profile</button>
      <button onClick={(user) => validateAdmin(user)}>Admin view </button>
    </>
  );
}
