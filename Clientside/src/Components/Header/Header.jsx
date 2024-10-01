import React from 'react'

function Header() {
    return (
        <>
            <div className="header">
        <div className="header-left p-4">
          <button className="back-button" onClick={() => window.history.back()}>
        <img src={backBtn} alt="backBtn" />

          </button>
          <h1 className="header-title">Create Project</h1>
        </div>
      </div>
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
        </>
    )
}

export default Header