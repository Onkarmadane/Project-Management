import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './BottomNav.css'; // Separate CSS for bottom navigation
import { ReactComponent as DashboardIcon } from '../../imgs/Dashboard.svg'; // Your SVG path
import { ReactComponent as DashboardActiveIcon } from '../../imgs/Dashboard-active.svg'; // Active SVG path
import { ReactComponent as ProjectsIcon } from '../../imgs/Project-list.svg'; // Your SVG path
import { ReactComponent as ProjectsActiveIcon } from '../../imgs/Project-list-active.svg'; // Active SVG path
import { ReactComponent as CreateIcon } from '../../imgs/create-project.svg'; // Your SVG path
import { ReactComponent as CreateActiveIcon } from '../../imgs/create-project-active.svg'; // Active SVG path

const BottomNav = () => {
    const [active, setActive] = useState('Dashboard');

    const renderIcon = (item) => {
        switch (item) {
            case 'Dashboard':
                return active === 'Dashboard' ? <DashboardActiveIcon /> : <DashboardIcon />;
            case 'Projects':
                return active === 'Projects' ? <ProjectsActiveIcon /> : <ProjectsIcon />;
            case 'Create':
                return active === 'Create' ? <CreateActiveIcon /> : <CreateIcon />;
            default:
                return null;
        }
    };

    return (
        <div className="mobile-bottom-navbar"> {/* Only visible on mobile */}
            <ul className="mobile-nav-list">
                <li className={active === 'Dashboard' ? 'active' : ''}>
                    <NavLink 
                        to="/DashboardPage" 
                        className={({ isActive }) => (isActive ? 'active' : '')} 
                        onClick={() => setActive('Dashboard')}
                    >
                        {renderIcon('Dashboard')}
                    </NavLink>
                </li>
                <li className={active === 'Projects' ? 'active' : ''}>
                    <NavLink 
                        to="/ProjectListing" 
                        className={({ isActive }) => (isActive ? 'active' : '')} 
                        onClick={() => setActive('Projects')}
                    >
                        {renderIcon('Projects')}
                    </NavLink>
                </li>
                <li className={active === 'Create' ? 'active' : ''}>
                    <NavLink 
                        to="/CreateProjectPage" 
                        className={({ isActive }) => (isActive ? 'active' : '')} 
                        onClick={() => setActive('Create')}
                    >
                        {renderIcon('Create')}
                    </NavLink>
                </li>
                {/* <li className={active === 'Create' ? 'active' : ''}>
                <NavLink 
                        to="/LoginPage" 
                        className={({ isActive }) => isActive ? 'active' : ''} 
                        onClick={() => setActive('LogoutIcon')}
                    >
                        {renderIcon('LogoutIcon')}
                    </NavLink>
                </li> */}
            </ul>
        </div>
    );
};

export default BottomNav;
