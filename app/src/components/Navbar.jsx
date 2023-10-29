import React from 'react'
import linkedin from "../images/linkedin.png";
import github from "../images/github-logo.png";
import "../css/ImagePanel.css";

const Navbar = () => {
  
  return (
    <nav className=''>
      <ul>
        <li>
          <a
            href={`${process.env.REACT_APP_LINKED_URL}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedin} alt="linkedin link" />
          </a>
        </li>
        <li className='font-poppins font-medium cursor-pointer text-[16px] "text-secondary"'>
        <a
            href={`${process.env.REACT_APP_GIT_URL}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            <img src={github} alt="git hub link" />
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar