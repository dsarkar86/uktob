import React from "react";
import { useState } from 'react'


function IndexNavbar() {
	const [isActive, setActive] = useState(false);
	
	const toggleClass = () => {
		setActive(!isActive);
	};

	// className={isActive ? 'your_className': null} onClick={toggleClass} 	

	return (
		<header id="header" className="index-header">
			<div className="nav-main">
				<div className="logo-top"><a href={`${process.env.PUBLIC_URL}/index`}>LOGO</a></div>

				<div className="nav-right">
					{/* <div className=""> */}
						<ul className={isActive ? 'nav-middle active': 'nav-middle'}>
							<li className="nav-item active"> <a className="nav-link" href={`${process.env.PUBLIC_URL}/pricing`}>Pricing</a> </li>
							<li className="nav-item"><a className="nav-link" href={`${process.env.PUBLIC_URL}/contact`} > Contact </a></li>
							<li className="nav-item dropdown">
								<a className="nav-link  dropdown-toggle" href={`${process.env.PUBLIC_URL}/resources`} data-bs-toggle="dropdown">Resources</a>                    
							</li>
							<li className="nav-item"><a className="nav-link" href={`${process.env.PUBLIC_URL}/login`}>Login</a></li>
						</ul>
					{/* </div> */}
					<div className="nav-right">
						<div className="menu-buttn">
							<a href={`${process.env.PUBLIC_URL}/register`} className="new-button nav-btn">Start Free Trial</a>
						</div>
						<div className={isActive ? 'hamburger active': 'hamburger'} onClick={toggleClass}>
							<div className="line"></div>
							<div className="line"></div>
							<div className="line"></div>
						</div>
					</div>
				</div>


			</div>    
		</header>
	);
}			
			
export default IndexNavbar;