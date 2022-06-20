import { useState, useEffect, useLayoutEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate,useNavigate } from "react-router-dom";
 

import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";

import "./App.css";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const userCollectionRef = collection(db, "users");

  useEffect(() => {
    async function getUsers() {
      const data = await getDocs(userCollectionRef);
      data.docs.map((el) => {
        if (el.data().isAdmin) {
          setIsAdmin(true);
        }
      });
    }
    getUsers();
  }, []);

  const getPrivateRoutes = () => {
    if (isAdmin) {
      return (
        <Route path={"/admin-dashboard"} exact element={<AdminDashboard />} />
      );
    }
    return <Route path={"/user-dashboard"} exact element={<UserDashboard />} />;
  };
  return (
    <div className="App">
      <BrowserRouter>
     

        <Routes>
          <Route path={"/"} exact element={<Home />} />
          <Route path={"/signup"} exact element={<Signup />} />
          <Route path={"/login"} exact element={<Login />} />
          {getPrivateRoutes()}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
