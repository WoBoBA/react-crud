import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Users from "./Users";
import UsersCreate from "./UsersCreate";
import UserUpdate from "./UserUpdate";
import Login from "./Login";
import Profile from "./Profile";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user" element={<Users />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<UsersCreate />} />
        <Route path="/update/:id" element={<UserUpdate />} />
      </Routes>
    </div>
  );
}

export default App;
