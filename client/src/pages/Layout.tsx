import Navbar from "../components/Navbar";
import "../styles/layout.scss"
import { Navigate, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export {Layout};