import React, { useEffect } from 'react'
import ProjectTable from '../Components/ProjectTable/ProjectTable'

const ProjectListing = () => {
  useEffect(() => {
    document.title = 'Project Listing'
   })
  return (
    <div>
        <ProjectTable />
    </div>
  )
}

export default ProjectListing