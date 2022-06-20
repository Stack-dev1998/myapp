import React, { useState, useEffect, useLayoutEffect } from "react";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";
export default function Signup() {
  const [loginModal, setLoginModal] = useState({
    email: "",
    password: "",
  });

  const userCollectionRef = collection(db, "users");

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setLoginModal({ ...loginModal, [name]: value });
  };
  const handleOnLogin = async (e) => {
    e.preventDefault();
    const data = await getDocs(userCollectionRef);
    console.log("data", data);
  };
  return (
    <div>
      <h1>Signup form</h1>

      <form>
        <div>
          <label>email</label>
          <input
            type={"email"}
            name="email"
            value={setLoginModal.email}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label>password</label>
          <input
            type={"password"}
            name="password"
            value={setLoginModal.password}
            onChange={handleOnChange}
          />
        </div>

        <button onClick={(e) => handleOnLogin(e)}>Login</button>
      </form>
    </div>
  );
}
