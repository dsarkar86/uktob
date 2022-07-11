import React, { useState, useEffect } from "react";

// core components
//import ExamplesNavbar from "../../components/Navbars/ExamplesNavbar.js";
import LeftNavbar from "../../components/Navbars/LeftNavbar.js";
import axios from "axios";
import { config } from '../../constant';
const getProjectUrl = config.url.API_URL+"/project/list";

function DocumentPage(props) {
	const [projects, setProjectData] = useState([]);
	const getProjectsWithAxios = async () => {
		const data1 = new FormData();
		data1.append("user_id", localStorage.getItem('token'));
		axios.post(getProjectUrl,data1)
		.then((response) => {
			console.log(response);
			const projects = response.data.projects;
			setProjectData(projects);				
		})
		.catch((error) => {
		// error response
		});
	};
	
	useEffect(() => {
		
		getProjectsWithAxios();
	}, []);	
	
	if(!localStorage.getItem('token')){
		window.location.href = process.env.PUBLIC_URL+"/login";
	}else{
	
	return (
		<div className="dashboard-main">
		<LeftNavbar />
		<div id="main">
            
            
			<div className="page-heading">
				<div className="row">
					<div className="col-12 col-md-9 order-md-1 order-last">
						<h3>Documents</h3>
						<p className="text-subtitle text-muted">It’s like Google docs without the writer’s block</p>
					</div>
					<div className="col-12 col-md-3 order-md-2 order-first" style={{textAlign: 'right'}}>
						<a href={`${process.env.PUBLIC_URL}/create-project`} className="btn btn-primary btn-lg log-btn-logpage new-button">Create New</a>
					</div>
				</div>
			</div>
			<div className="page-content">
				<section className="row">
					{ 
					projects && projects.map((project,index)=>( 
					<div className="col-sm-3" >
						<a href={`${process.env.PUBLIC_URL}/edit-project/`+project.id}>
						<div className="home-graph-box box-new p-3 mb-4" style={{height:"150px"}}>
							<div className="row">
								<div className="col-md-8"><div className="box-icon-round"><i className="fa fa-file-text" aria-hidden="true"></i></div></div>
							</div>
							<div className="box-title mt-3 mb-2"></div>
							<p>{project.title.toString().substring(0,50)}</p>
						</div>
						</a>
					</div>
					))}					

					

				</section>
			</div>

            
        </div>
		</div>
	);
	}
}

export default DocumentPage;