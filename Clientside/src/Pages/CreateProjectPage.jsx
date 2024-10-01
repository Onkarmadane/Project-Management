import React from 'react'
import CreateProject from '../Components/CreateProject/CreateProject'
import { useEffect } from 'react'

const CreateProjectPage = () => {
   useEffect(() => {
    document.title = 'Create Page'
   })
  return (
    <div>
        <CreateProject />
    </div>
  )
}

export default CreateProjectPage;