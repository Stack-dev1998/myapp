import React, { useState, useEffect, useLayoutEffect } from "react";
import { db } from "./firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
export default function Signup() {
  const [signupModal, setSignupModal] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: false,
  });
  const [confirmPassword, setConfirmPassword] = useState();
  const userCollectionRef = collection(db, "users");
  let navigate = useNavigate();

  useLayoutEffect(() => {
    async function getUsers() {
      let isAdminCreated =false;
      const data = await getDocs(userCollectionRef);
      data.docs.map((el) => {
        if (el.data().isAdmin) {
          isAdminCreated = true
        }
      });
    setSignupModal({ ...signupModal,isAdmin: !isAdminCreated });
       
    }
    getUsers();
  }, []);

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "confirmPassword") {
      setConfirmPassword(value);
      return;
    }
    if (name === "isAdmin") {
      const { checked } = e.target;
      setSignupModal({ ...signupModal, [name]: checked });
      return;
    }
    setSignupModal({ ...signupModal, [name]: value });
  };

  const singupHandler = async (e) => {
    e.preventDefault();

    addDoc(userCollectionRef, signupModal);
    navigate("/login");
  };
  return (
    <div>
      <h1>Signup form</h1>
      <form method="POST">
       { signupModal.isAdmin && <input
          type="checkbox"
          name="isAdmin"
          checked={signupModal.isAdmin}
          onChange={handleOnChange}
        />}
        <label>Name</label>
        <input
          type={"text"}
          name="name"
          value={signupModal.name}
          onChange={handleOnChange}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={signupModal.email}
          onChange={handleOnChange}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={signupModal.password}
          onChange={handleOnChange}
        />

        <label>Confirm password</label>

        <input
          type="password"
          name="confirmPassword"
          value={signupModal.confirmPassword}
          onChange={handleOnChange}
        />

        <button onClick={(e) => singupHandler(e)}>Signup </button>
      </form>
    </div>
  );
}
