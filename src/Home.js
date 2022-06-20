import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

export default function Home() {
  let navigate = useNavigate();

  return (
    <div>
      Home
      <button
        onClick={() => {
          navigate("/admin-dashboard");
        }}
      >
        ada
      </button>
    </div>
  );
}
