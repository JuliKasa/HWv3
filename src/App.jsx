import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import EditDetails from "./components/EditDetails";
import SystemAdmin from "./components/SystemAdmin"

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Register" element={<Register />}></Route>
          <Route path="/Profile" element={<Profile/>}/>
          <Route path="/EditDetails" element={<EditDetails/>} />
          <Route path="/SystemAdmin" element={<SystemAdmin/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}
