import React from 'react'
import Dashboard from '../Components/Dashboard/Dashboard';
import { useEffect } from 'react';



const DashboardPage = () => {
    useEffect(() => {
        document.title = 'Dashboard'
       })
    return (
        <>
        
        <Dashboard />
        </>
    )
}

export default DashboardPage