import React,{ useState } from "react";
//import { Link } from "react-router-dom";


function LeftNavbar(props) {
	const logout = () => {
		window.localStorage.clear();
		window.location.href = process.env.PUBLIC_URL+"/login";
	}
	
	const [toggle,setToggle]=useState(0);
	
	return (
		<>
		<header className="mb-3 active">
			<a href="javascript:void(0)" onClick={() => setToggle(0)} className="burger-btn d-block d-xl-none">
				<i className="bi bi-justify fs-3" ></i>
			</a>
		</header>
		<div id="sidebar" className={(toggle === 0)? "active":""}>
            <div className="sidebar-wrapper active">
                <div className="sidebar-header">
                    <div className="justify-content-between">
                        <div className="logo-dashboard">
                            <div className="row">
                                <div className="dash-board-logo-box col-md-4">
                                    <a href={`${process.env.PUBLIC_URL}/index`}><span>logo</span></a>
                                </div>
            
                                <div className="left-search-box  col-md-6">
                                     <span><img src={require("../../assets/images/local-img/search-icon.png")} alt="" /></span>
                                </div> 
                            </div>
                        </div>
             
            
                        <div className="toggler">
                            <a href="javascript:void(0)" onClick={() => setToggle(1)} className="sidebar-hide d-xl-none d-block"><i className="bi bi-x bi-middle"></i></a>
                        </div>
                    </div>
                </div>
                <div className="sidebar-menu">
                    <div className="left-log-name">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="log-img-side-sec">
                                    <img src={require("../../assets/images/faces/1.jpg")} alt="Face 1" />
                                </div>
                                <div className="ms-3 log-name">
                                    <h5>Test camp</h5>                    
                                </div>
                            </div>
                            <div className="col-md-4">
                               <a href={`${process.env.PUBLIC_URL}/settings`} className="sett-left float-right"><i className="fa fa-cog" aria-hidden="true"></i></a>
                            </div>
                        </div>
                    </div>
                    <ul className="menu">
                        <div className="personal-left-sec">
                            <div className="title-menu-one">PROJECT</div>
                            <li className="sidebar-item  has-sub mt-0 pl-0 pb-3">
                                <a href="#" className="sidebar-link left-main-title pt-0 pl-0 pr-0">                    
                                    <span className="ml-0">Personal</span>
                                </a>
                                <ul className="submenu" style={{display: 'none'}}>
                                    <li className="submenu-item ">
                                        <a href={`${process.env.PUBLIC_URL}/settings`}>Settings</a>
                                    </li>
                                    <li className="submenu-item ">
                                        <span onClick={logout} >Logout</span>
                                    </li>
                                </ul>
                            </li>
                        </div>            
                        <li className="sidebar-title">
                            <a href={`${process.env.PUBLIC_URL}/dashboard`} title="" className="sidebar-title-inner">
                                <i className="fa fa-address-card" aria-hidden="true"></i><span>Dashboard</span>
                            </a>
                        </li> 

                        <li className="sidebar-item no-sub">                            
                            <a href={`${process.env.PUBLIC_URL}/templates`} className="sidebar-link p-0">
                                <i className="fa fa-file-text" aria-hidden="true"></i>
                                <span>Template</span>
                            </a>
                        </li>

                        <li className="sidebar-item">
                            <a href={`${process.env.PUBLIC_URL}/documents`} className="sidebar-link" style={{display:"inline"}}>
                                <i className="fa fa-file-text" aria-hidden="true"></i>    
                                <span>Documents</span>															
                            </a>
							<a href={`${process.env.PUBLIC_URL}/create-project`} className="">
                                <i className="fa fa-plus" aria-hidden="true"></i>															
                            </a>
                            <ul className="submenu">
                                <li className="submenu-item ">
                                    <a href="#">
										<i className="fa fa-trash" aria-hidden="true"></i>
										<span>Trash</span>
									</a>
                                </li>                             
                            </ul>
                        </li>

                        <li className="sidebar-item">
                            <a href={`${process.env.PUBLIC_URL}/outputs`} className="sidebar-link">
                                <i className="fa fa-envelope" aria-hidden="true"></i>    
                                <span>All Outputs</span>
                            </a>
                            <ul className="submenu">
                                <li className="submenu-item ">
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <a href="#">Favorites</a>
                                </li>
								<li className="submenu-item ">
                                    <i className="fa fa-flag" aria-hidden="true"></i>
                                    <a href="#">Flagged</a>
                                </li>
								<li className="submenu-item ">
                                    <i className="fa fa-trash" aria-hidden="true"></i>
                                    <a href="#">Trash</a>
                                </li>								
                            </ul>
                        </li>
                    </ul>
                </div>
                <button className="sidebar-toggler btn x"><i data-feather="x"></i></button>
            </div>
        </div>
		</>
	);
}			
			
export default LeftNavbar;