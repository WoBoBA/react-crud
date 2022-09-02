import { Routes, Route } from "react-router-dom";
import Navbar from './Navbar';
import Users from './Users';
import UsersCreate from "./UsersCreate";
import UserUpdate from "./UserUpdate";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/create" element={<UsersCreate />} />
        <Route path="/update/:id" element={<UserUpdate />} />
      </Routes>
    </div>
  );
}

export default App;
