import PropTypes from 'prop-types'
import React from 'react'

const Logo = ({ size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Open Book Frame */}
    <path
      d="M4 7C4 5.34315 5.34315 4 7 4H15V28H7C5.34315 28 4 26.6569 4 25V7Z"
      fill="#00f2ff"
      fillOpacity="0.1"
      stroke="#00f2ff"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M28 7C28 5.34315 26.6569 4 25 4H17V28H25C26.6569 28 28 26.6569 28 25V7Z"
      fill="#00f2ff"
      fillOpacity="0.1"
      stroke="#00f2ff"
      strokeWidth="2"
      strokeLinejoin="round"
    />

    {/* Minimal Diagram Elements */}
    <rect x="7" y="9" width="5" height="4" rx="1" fill="#00f2ff" />
    <rect x="20" y="19" width="5" height="4" rx="1" fill="#00f2ff" />

    {/* Connector Path */}
    <path
      d="M12 11H16V21H20"
      stroke="#00f2ff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Arrow Tip */}
    <path
      d="M18.5 19L20.5 21L18.5 23"
      stroke="#00f2ff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

Logo.propTypes = {
  size: PropTypes.number
}

export default Logo
