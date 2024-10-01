import React, { useEffect, useState } from 'react';
import './ProjectTable.css'; // Custom CSS for styling
import logo from '../../imgs/Logo.svg'; // Update the path to your logo
import backBtn from '../../imgs/back arrow.svg';
import Page from '../Pagination/Page';
import { ReactComponent as LogoutIcon } from '../../imgs/Logout.svg';
import axios from 'axios';
import { Link } from 'react-router-dom';


const ProjectTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priority, setPriority] = useState('Priority');
  const [ProjectListing, SetProjectListing] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:3001/ProjectListing');
        SetProjectListing(response.data);  
      } catch (err) {
        console.error(err);
      }
    };

    fetchProjects();
  }, []);

  const updateProjectStatus = (projectId, newStatus) => {
    // Update status in the ProjectListing state
    SetProjectListing((prevProjects) =>
      prevProjects.map((project) =>
        project._id === projectId ? { ...project, status: newStatus } : project
      )
    );
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  // const filteredProjects = ProjectListing.filter((project) =>
  //   project.name && project.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div className="form-container text-white" >
      <div className="header-container p-0 m-0" >
        <div className="header-left p-4">
          <h1 className="header-title text-white Dashtext">Project Listing</h1>
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

      <div className="card m-3 shadow-sm card1 formcard" data-aos="fade-up">
        <div className="card-body">
          <form>
            {/* Search Bar and Sort Dropdown */}
            <div className="d-flex justify-content-between mb-3">
              <input
                type="text"
                className="form-control w-25"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <div className="dropdown">
                <button
                  className="btn dropdown-toggle"
                  type="button"
                  id="sortDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Sort by : {priority}
                </button>
                <ul className="dropdown-menu" aria-labelledby="sortDropdown">
                  <li>
                    <button className="dropdown-item" onClick={() => setPriority('Recently-Viewed')}>
                      Recently Viewed
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={() => setPriority('Status')}>
                      Status
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={() => setPriority('Start-Date')}>
                      Start Date
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={() => setPriority('End-Date')}>
                      End Date
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {ProjectListing.length > 0 ? (
              <table className="table w-100 m-0 p-0">
                <thead>
                  <tr style={{ backgroundColor: '#EBF5FF' }} className="table-info">
                    <th>Project Name</th>
                    <th>Reason</th>
                    <th>Type</th>
                    <th>Division</th>
                    <th>Category</th>
                    <th>Priority</th>
                    <th>Dept.</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {ProjectListing.map((project) => (
                    <tr key={project._id}>
                      <td data-label="Project Name">
                        {project.projectTheme}
                        <div className="subtext">
                          {new Date(project.startDate).toLocaleDateString()} to {new Date(project.endDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td data-label="Reason">{project.reason}</td>
                      <td data-label="Type">{project.type}</td>
                      <td data-label="Division">{project.division}</td>
                      <td data-label="Category">{project.category}</td>
                      <td data-label="Priority">{project.priority}</td>
                      <td data-label="Dept.">{project.department}</td>
                      <td data-label="Location">{project.location}</td>
                      <td data-label="Status" className="text-secondary">
                      <b>{project.status}</b>
                      </td>
                      <td data-label="Action">
                        <div className="action-buttons">
                          <button
                            type="button"
                            className="btn btn-primary rounded-pill m-1 "
                            onClick={() => updateProjectStatus(project._id, 'Running')}
                          >
                            Start
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-primary rounded-pill m-1"
                            onClick={() => updateProjectStatus(project._id, 'Closed')}
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-primary rounded-pill m-1"
                            onClick={() => updateProjectStatus(project._id, 'Cancelled')}
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
             ) : (
              <div className="no-projects-message text-center">
                <p>No projects to display</p>
                <Link to="/CreateProjectPage" className='btn btn-primary hvr-buzz'>
                  Create New Project
                </Link>
              </div>
            )} 
          </form>
        </div>
      </div>
      <Page />
    </div>
  );
};

export default ProjectTable;
