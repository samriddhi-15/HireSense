import React from "react";
import { useState } from "react";
import "./Dashboard.css"
import DashProfile from "./DashProfile";
import DashProgress from "./DashProgress";
import DashStatRow from "./DashStatRow";
import DashTasks from "./DashTasks";
import DashTopBar from "./DashTopBar";
import DashTracker from "./DashTracker";
import Footer from "../layouts/Footer";

function Dashboard() {

     const [activeNav, setActiveNav] = useState('Dashboard');
    return (
     <>
      <div className="db">
      <div className="db__noise" />
      <div className="db__blob db__blob--1" />
      <div className="db__blob db__blob--2" />

      <div className="db__body">
        <h1 className="db__welcome">
          Welcome back, <span className="db__welcome-name">HireSense.</span> 👋
        </h1>

        <DashStatRow />

        <div className="db__grid">
          <DashProfile />
          <DashProgress />
          <DashTracker />
          <DashTasks />
        </div>
      </div>
    </div>
     </>   
    )
}

export default Dashboard;