import React, { useState, useEffect } from "react";

// core components
//import ExamplesNavbar from "../../components/Navbars/ExamplesNavbar.js";
import LeftNavbar from "../../components/Navbars/LeftNavbar.js";
//import LoginPage from "./LoginPage.js";
import axios from "axios";
import { config } from '../../constant';
const getTypeUrl = config.url.API_URL+"/template/templatetypes";
const getTemplateUrl = config.url.API_URL+"/template/templates";

function TemplatePage(props) {
	const [types, setTypeData] = useState([]);
	const getTypeWithAxios = async () => {
		axios.post(getTypeUrl)
		.then((response) => {
			console.log(response);
			const types = response.data.type;
			setTypeData(types);				
		})
		.catch((error) => {
		// error response
		});
	};
	const [templates, setTemplateData] = useState([]);
	const getTemplateWithAxios = async () => {
		axios.post(getTemplateUrl)
		.then((response2) => {
			console.log(response2);
			const templates = response2.data.templates;
			setTemplateData(templates);				
		})
		.catch((error) => {
		// error response
		});
	};
	
	useEffect(() => {
		
		getTypeWithAxios();
		getTemplateWithAxios();
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
					<div className="col-12">
						<h3>Templates</h3>               
					</div>

					 <div className="col-12 col-md-12 mt-4">
						<div className="row">
							<div className="col-md-3">
							<div className="form-group position-relative has-icon-left inner-box-serarch">
								<input type="text" className="form-control" placeholder="Search" />
								<div className="form-control-icon">
								   <i className="fa fa-search" aria-hidden="true"></i>
								</div>
							</div>
							</div>
							 <div className="col-md-9 text-right">
								<fieldset className="form-group float-right inner-box-select">
									<select className="form-select" id="basicSelect">
										<option>All</option>
										{ 
										types && types.map((typ,index)=>( 
										<option key={index} value={typ.id}>{typ.name}</option> 
										))}
										
									</select>
								</fieldset>
							 </div>
						</div>
					</div>
				</div>
			</div>
			<div className="page-content">
				<section className="row">
					{ 
					templates && templates.map((template,index)=>( 
						<div className="col-md-3">
							<a href={`${process.env.PUBLIC_URL}/create-template-content/`+template.id}>
							<div className="home-graph-box box-new p-3 mb-4">
								<div className="row">
									<div className="col-md-8">
										<div className="box-icon-round">
											<i className={template.icon} aria-hidden="true"></i>
										</div>
									</div>
									<div className="col-md-4 text-right">
									{
										template.is_pro ?(
											<div className="box-icon badge-pro">
												<span>PRO</span>
											</div>
										):('')
									}
									{
										template.is_favorite ?(
											<div className="box-icon badge-pro">
												<i className="fa fa-star" aria-hidden="true"></i>
											</div>
										):('')
									}
									</div>
								</div>
								<div className="box-title mt-3 mb-2">{template.title}</div>
								<p>{template.description.toString().substring(0,50)} ...</p>
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

export default TemplatePage;