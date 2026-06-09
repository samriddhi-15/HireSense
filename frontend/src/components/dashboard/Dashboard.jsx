import React from "react";
import { useState, useEffect } from "react";
import "./Dashboard.css"
import DashProfile from "./DashProfile";
import DashProgress from "./DashProgress";
import DashStatRow from "./DashStatRow";
import DashTasks from "./DashTasks";
import DashTopBar from "./DashTopBar";
import DashTracker from "./DashTracker";
import Footer from "../layouts/Footer";
import axios from 'axios'

function Dashboard() {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [dashboardData, setDashboardData] =
    useState(null);
  const [progressData, setProgressData] =
    useState(null);

  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const user =
          JSON.parse(localStorage.getItem("user"));

        if (!user?._id) return;

        const dashboardRes = await axios.get(
          `http://localhost:4000/api/dashboard/${user._id}`
        );

        setDashboardData(
          dashboardRes.data.dashboard
        );

        const progressRes = await axios.get(
          `http://localhost:4000/api/progress/${user._id}`
        );

        setProgressData(
          progressRes.data.progress
        );

      } catch (error) {
        console.log(error);
      }

    };

    fetchDashboard();

  }, []);

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

          <DashStatRow
            dashboardData={dashboardData}
          />

          <div className="db__grid">
            <DashProfile
              dashboardData={dashboardData}
            />
            <DashProgress
              dashboardData={dashboardData}
              progressData={progressData}
            />
            <DashTracker
              dashboardData={dashboardData}
            />
            <DashTasks />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard;