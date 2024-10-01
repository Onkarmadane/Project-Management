import React from 'react';
import './Dashboard.css'; // Make sure to create this CSS file
import logo from '../../imgs/Logo.svg'; // Update the path to your logo
import Chart from '../Chart/Chart';
import Chart1 from '../Chart/Chart1';
import VerticalNav from '../VerticalNav/VerticalNav'
import { ReactComponent as LogoutIcon } from '../../imgs/Logout.svg';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';


const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [totalProjects, setTotalProjects] = useState(0);
  const [closedProjects, setClosedProjects] = useState(0);
  const [runningProjects, setRunningProjects] = useState(0);
  const [closureDelay, setClosureDelay] = useState(0);
  const [cancelledProjects, setCancelledProjects] = useState(0);

  useEffect(() => {
    // Fetch project data from the API
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:3001/ProjectListing'); // Adjust the URL to your API
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    // Process the projects data to calculate totals
    if (projects.length > 0) {
      setTotalProjects(projects.length);
      setClosedProjects(projects.filter(project => project.status === 'Closed').length);
      setRunningProjects(projects.filter(project => project.status === 'Running').length);
      setCancelledProjects(projects.filter(project => project.status === 'Cancelled').length);

      // Calculate closure delay (projects running with end date less than today's date)
      const today = new Date();
      const delayedProjects = projects.filter(
        project => project.status === 'Running' && new Date(project.endDate) < today
      ).length;
      setClosureDelay(delayedProjects);
    }
  }, [projects]);


  return (
    <div className="dashboard-page" data-aos="fade-up" >
       <div className="header-container p-0 m-0">
            <div className="header-left p-4">
                <h1 className="header-title text-white Dashtext">Dashboard</h1>
            </div>
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" data-aos="zoom-in"/>
            </div>
            <div className="logout-icon-container ">
            <Link to="/LoginPage" >
                <LogoutIcon className="logout-icon" />
                </Link>
            </div>
        </div>
      <div className="card-group card-dock m-0" data-aos="flip-up" >
        <div className="card">
          <div className="card-body dash-dock">
            <p className="card-text"><small className="text-body-secondary">Total Projects</small></p>
            <h5 className="card-title dashtitle">{totalProjects}</h5>
          </div>
        </div>

        <div className="card" >
          <div className="card-body dash-dock">
            <p className="card-text"><small className="text-body-secondary">Closed</small></p>
            <h5 className="card-title dashtitle">{closedProjects}</h5>
          </div>
        </div>

        <div className="card" >
          <div className="card-body dash-dock">
            <p className="card-text"><small className="text-body-secondary">Running</small></p>
            <h5 className="card-title dashtitle">{runningProjects}</h5>
          </div>
        </div>

        <div className="card" >
          <div className="card-body dash-dock">
            <p className="card-text"><small className="text-body-secondary">Closure Delay</small></p>
            <h5 className="card-title dashtitle">{closureDelay}</h5>
          </div>
        </div>

        <div className="card" >
          <div className="card-body dash-dock">
            <p className="card-text"><small className="text-body-secondary">Cancelled</small></p>
            <h5 className="card-title dashtitle">{cancelledProjects}</h5>
          </div>
        </div>
      </div>

      {/* <Chart /> */}
      <Chart1 />

    </div>
  );
};

export default Dashboard;
