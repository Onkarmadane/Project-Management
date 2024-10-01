import React from 'react';
import './CreateProject.css'; // Custom CSS for styling (add background image here)
import logo from '../../imgs/Logo.svg'; // Update the path to your logo
// import backBtn from '../../imgs/back arrow.svg';
import { ReactComponent as LogoutIcon } from '../../imgs/Logout.svg';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const CreateProjectForm = () => {
  // State to manage form input
  const [projectTheme, setprojectTheme] = useState();
  const [reason, setreason] = useState();
  const [type, settype] = useState();
  const [division, setdivision] = useState();
  const [department, setdepartment] = useState();
  const [category, setcategory] = useState();
  const [priority, setpriority] = useState();
  const [startDate, setstartDate] = useState();
  const [endDate, setendDate] = useState();
  const [location, setlocation] = useState();
  const currentDate = new Date().toISOString().split('T')[0];


  const SubmitForm = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/CreateProjectPage', { projectTheme, reason, type, division, department, category, priority, startDate, endDate, location })
      .then(result => console.log(result), window.alert("Project Reccord Updated Sucessfully"))
      .catch(err => {
        console.log(err);

        // Show error alert in case of failure
        window.alert("Error submitting the form. Please try again.");
      });
    e.target.reset();
  }



  return (
    <div className="form-container text-white" >
      <div className="header-container p-0 m-0">
        <div className="header-left p-4">
          <h1 className="header-title text-white Dashtext">Create Project</h1>
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
      <div className="card shadow-sm formcard" data-aos="fade-up">
        <div className="card-body">
          <form className="form1" onSubmit={SubmitForm}>
            <div className="form-group mb-3 d-flex">
              <textarea
                name="projectTheme"
                className="form-control"
                placeholder="Enter Project Theme"
                rows="3"
                style={{ resize: 'none' }}
                onChange={(e) => setprojectTheme(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="row">
              {/* Reason */}
              <div className="col-sm-4 mb-3">
                <label>Reason</label>
                <select
                  id='reason'
                  name="reason"
                  className="form-control"
                  onChange={(e) => setreason(e.target.value)}
                  required

                >
                  <option value="">Select Reason</option>
                  <option value="For Business">For Business</option>
                  <option value="For Personal">For Personal</option>
                  <option value="For Educational">For Educational</option>
                </select>
              </div>

              {/* Type */}
              <div className="col-sm-4 mb-3">
                <label>Type</label>
                <select
                  name="type"
                  className="form-control"
                  onChange={(e) => settype(e.target.value)}
                  required

                >
                  <option value="">Select Type</option>
                  <option>Internal</option>
                  <option>External</option>
                </select>
              </div>

              {/* Division */}
              <div className="col-sm-4 mb-3">
                <label>Division</label>
                <select
                  name="division"
                  className="form-control"
                  onChange={(e) => setdivision(e.target.value)}
                  required

                >
                  <option value="">Select Division</option>
                  <option>Filters</option>
                  <option>Analytics</option>
                  <option>Development</option>
                </select>
              </div>

              {/* Department */}
              <div className="col-sm-4 mb-3">
                <label>Department</label>
                <select
                  name="department"
                  className="form-control"
                  onChange={(e) => setdepartment(e.target.value)}
                  required
                >
                  <option value="">Select Department</option>
                  <option>Strategy</option>
                  <option>Marketing</option>
                  <option>Finance</option>
                </select>
              </div>

              {/* Category */}
              <div className="col-sm-4 mb-3">
                <label>Category</label>
                <select
                  name="category"
                  className="form-control"
                  onChange={(e) => setcategory(e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  <option>Quality A</option>
                  <option>Quality B</option>
                  <option>Quality C</option>
                </select>
              </div>

              {/* Priority */}
              <div className="col-sm-4 mb-3">
                <label>Priority</label>
                <select
                  name="priority"
                  className="form-control"
                  onChange={(e) => setpriority(e.target.value)}
                  required

                >
                  <option value="">Select Priority</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>

              {/* Start Date */}
              <div className="col-sm-4 mb-3">
                <label>Start Date as per Project Plan</label>
                <input
                  type="date"
                  name="startDate"
                  className="form-control"
                  onChange={(e) => setstartDate(e.target.value)}
                  min={currentDate}
                  required

                />
              </div>

              {/* End Date */}
              <div className="col-sm-4 mb-3">
                <label>End Date as per Project Plan</label>
                <input
                  type="date"
                  name="endDate"
                  className="form-control"
                  onChange={(e) => setendDate(e.target.value)}
                  min={currentDate}
                  required

                />
              </div>

              {/* Location */}
              <div className="col-sm-4 mb-3">
                <label>Location</label>
                <select
                  name="location"
                  className="form-control"
                  onChange={(e) => setlocation(e.target.value)}
                  required
                >
                  <option value="">Select Location</option>
                  <option>Pune</option>
                  <option>Mumbai</option>
                  <option>Bangalore</option>
                </select>
              </div>

              {/* Status */}
              <div className="status d-inline-flex m-0 align-middle">
                <label className="m-0 p-0">Status:</label>
                <p className="form-control-plaintext p-0">
                  <b>Registered</b>
                </p>
              </div>
            </div>

            {/* Save Project Button */}
            <div className="save-button-container">
              <button type="submit" className="btn btn-primary rounded-5 hvr-buzz">
                Save Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectForm;