import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; 
import { Outlet } from 'react-router-dom';
import './VerticalNav.css'; 
import { ReactComponent as DashboardIcon } from '../../imgs/Dashboard.svg'; 
import { ReactComponent as DashboardActiveIcon } from '../../imgs/Dashboard-active.svg'; 
import { ReactComponent as ProjectsIcon } from '../../imgs/Project-list.svg'; 
import { ReactComponent as ProjectsActiveIcon } from '../../imgs/Project-list-active.svg'; 
import { ReactComponent as CreateIcon } from '../../imgs/create-project.svg'; 
import { ReactComponent as CreateActiveIcon } from '../../imgs/create-project-active.svg'; 
import { ReactComponent as LogoutIcon } from '../../imgs/Logout.svg'; 

const Navbar = () => {
    const [active, setActive] = useState('Dashboard'); 

    const renderIcon = (item) => {
        switch (item) {
            case 'Dashboard':
                return active === 'Dashboard' ? <DashboardActiveIcon /> : <DashboardIcon />;
            case 'Projects':
                return active === 'Projects' ? <ProjectsActiveIcon /> : <ProjectsIcon />;
            case 'Create':
                return active === 'Create' ? <CreateActiveIcon /> : <CreateIcon />;
            case 'LogoutIcon':
                return <LogoutIcon />;
            default:
                return null;
        }
    };

    return (
        <div className="navbar desktop-navbar">
            <ul className="nav-list">
                <li>
                    <NavLink 
                        to="/DashboardPage" 
                        className={({ isActive }) => isActive ? 'active' : ''} 
                        onClick={() => setActive('Dashboard')}
                    >
                        {renderIcon('Dashboard')}
                    </NavLink>
                </li>

                <li>
                    <NavLink 
                        to="/ProjectListing" 
                        className={({ isActive }) => isActive ? 'active' : ''} 
                        onClick={() => setActive('Projects')}
                    >
                        {renderIcon('Projects')}
                    </NavLink>
                </li>
                
                <hr />
                
                <li>
                    <NavLink 
                        to="/CreateProjectPage" 
                        className={({ isActive }) => isActive ? 'active' : ''} 
                        onClick={() => setActive('Create')}
                    >
                        {renderIcon('Create')}
                    </NavLink>
                </li>
                
                <li className="mt-5">
                    <NavLink 
                        to="/LoginPage" 
                        className={({ isActive }) => isActive ? 'active' : ''} 
                        onClick={() => setActive('LogoutIcon')}
                    >
                        {renderIcon('LogoutIcon')}
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
