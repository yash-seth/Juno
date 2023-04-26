import React from 'react'
import "./VitLogo.css"

function VitLogo() {
  return (
    <div className="VitLogoMain">
      <div id="VIT_logo">
      <img
          src={require("../../../../Assets/VIT_logo.png")}
          alt="VIT-logo"
          id="VIT-Logo"
                />
        </div>
    </div>
  )
}

export default VitLogo