import React from "react";

// core components
//import ExamplesNavbar from "../../components/Navbars/ExamplesNavbar.js";
import LeftNavbar from "../../components/Navbars/LeftNavbar.js";
//import LoginPage from "./LoginPage.js";
//import axios from "axios";
//import { config } from '../../constant';

function DashboardPage(props) {
	

	if(!localStorage.getItem('token')){
		//return (<><LoginPage {...props} /></>);
	   //props.history.push(process.env.PUBLIC_URL+'/login');
	   window.location.href = process.env.PUBLIC_URL+"/login";
	}else{
		return (
		<div className="dashboard-main">
		<LeftNavbar />
		<div id="main">
            
            <div className="page-heading">
                <h3>Dashboard</h3>
            </div>
            <div className="page-content">
                <section className="row">
                    <div className="col-sm-9">
						<div className="home-graph-box p-4 mb-4">
							<img src={require("../../assets/images/local-img/graph-home.jpg")} alt="Face 1" />
						</div>
            
						<div className="home-graph-box p-4">
							<h5 className="mb-4"><span>Favorite Template</span><i className="fa fa-angle-right" aria-hidden="true"></i></h5>
							<div className="row">
		
								<div className="col-md-3 text-center">
									<div className="tmplate-box">
										<div className="tmplate-box-circle"><i className="fa fa-lightbulb-o" aria-hidden="true"></i></div>
										<p>Creative story</p>
									</div>    
								</div>
								<div className="col-md-3 text-center">
									<div className="tmplate-box">
										<div className="tmplate-box-circle"><i className="fa fa-lightbulb-o" aria-hidden="true"></i></div>
										<p>Blog post topic ideas</p>
									</div>    
								</div>
		
								<div className="col-md-3 text-center">
									<div className="tmplate-box">
										<div className="tmplate-box-circle"><i className="fa fa-lightbulb-o" aria-hidden="true"></i></div>
										<p>Explain it to a child</p>
									</div>    
								</div>
		
								<div className="col-md-3 text-center">
									<div className="tmplate-box">
										<div className="tmplate-box-circle"><i className="fa fa-lightbulb-o" aria-hidden="true"></i></div>
										<p>Facebook add heading</p>
									</div>    
								</div>
							</div>
						</div>
                    </div>
                    <div className="col-sm-3">
                        <div className="home-graph-box p-4 text-center mb-4">
                            <h5><span>Join the community</span></h5>
                            <p>Learn from over 15,000 other experts leading the AI copywriting and content creation space.</p>
                            <p><a href=""><span>Open Facebook group</span><i className="fa fa-long-arrow-right" aria-hidden="true"></i></a></p>
                        </div>
            
                        <div className="home-graph-box reverse-color p-4 text-center mb-4">
                            <div className="progress-btn">
                                <i className="fa fa-square" aria-hidden="true"></i>
                                <i className="fa fa-square" aria-hidden="true"></i>
                                <i className="fa fa-square color-reverse" aria-hidden="true"></i>
                                <i className="fa fa-square color-reverse" aria-hidden="true"></i>
                            </div>
                            <h5><span>Join the community</span></h5>
                            <p>Learn from over 15,000 other experts leading the.</p>
                            <p><a href=""><span>Learn more</span><i className="fa fa-long-arrow-right" aria-hidden="true"></i></a></p>
                        </div>
            
                    </div>
                </section>
            </div>
        </div>
		</div>
		);
	}
}

export default DashboardPage;
