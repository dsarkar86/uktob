import React, { useState, useEffect } from "react";

// core components
//import ExamplesNavbar from "../../components/Navbars/ExamplesNavbar.js";
import LeftNavbar from "../../components/Navbars/LeftNavbar.js";
//import LoginPage from "./LoginPage.js";
import axios from "axios";
import { config } from '../../constant';

const getOutputUrl = config.url.API_URL+"/output/outputs";

function OutputPage(props) {
	
	const [outputs, setOutputData] = useState([]);
	const dataArr = { user: localStorage.getItem('token')}
	const getOutputsWithAxios = async () => {
		axios.post(getOutputUrl,dataArr)
		.then((response2) => {
			console.log(response2);
			const outputs = response2.data.outputs;
			setOutputData(outputs);				
		})
		.catch((error) => {
		// error response
		});
	};
	
	function fnSelectedText(copy_text){
		//document.execCommand('copy');
		navigator.clipboard.writeText(copy_text);
	}
	
	useEffect(() => {
		getOutputsWithAxios();
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
						<h3>All Outputs</h3> 
						<h5>All your generated content is saved here</h5>						
					</div>

					{/*<div className="col-12 col-md-12 mt-4">
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
					</div>*/}
				</div>
			</div>
			<div className="page-content">
				<section className="row">
					{ 
					outputs && outputs.map((output,index)=>( 
						<div className="col-md-3">
							<div className="home-graph-box box-new p-3 mb-4" style={{height:"150px"}}>
								<div className="row">
									<div className="col-md-8">
										<div className="box-title mt-3 mb-2">Generated</div>
									</div>
									<div className="col-md-4 text-right">							
										<div className="box-icon " style={{display:"inline",marginRight:"5px"}}>
											<a href="javascript:void(0)" onClick={fnSelectedText(output.generated_text)}><i className="fa fa-clone" aria-hidden="true"></i></a>
										</div>
										{
										output.is_favorite ?(
										<div className="box-icon badge-pro" style={{display:"inline"}}>
											<i className="fa fa-star" aria-hidden="true"></i>
										</div>
										):(
										<div className="box-icon" style={{display:"inline"}}>
											<i className="fa fa-star" aria-hidden="true"></i>
										</div>
										)
										}
									</div>
								</div>
								
								<p>{output.generated_text.replaceAll("\\n", "").substr(0, 80)} ...</p>
							</div>
						</div>
					))}
					
				</section>
			</div>            
        </div>
		</div>
	);
	}
}

export default OutputPage;