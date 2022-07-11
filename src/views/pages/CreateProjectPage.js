import React, { useState, useEffect } from "react";
import useForm from "../../useForm";
import validate from '../../FormValidationRules';
import { config } from '../../constant';
import axios from "axios";
//import { MultiStepForm, Step } from 'react-multi-form';

import LeftNavbar from "../../components/Navbars/LeftNavbar.js";
//import LoginPage from "./LoginPage.js";
import Step1 from '../../components/form-steper/Step1.js'
import Step2 from '../../components/form-steper/Step2.js'
import Step3 from '../../components/form-steper/Step3.js'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useNavigate } from "react-router";
import CreateProjectEditor from "./CreateProjectEditor";

const getCreateUrl = config.url.API_URL + "/project/create";

function CreateProjectPage(props) {
	// console.log("propsdata",props);

	const [active, setActive] = useState(1);
	const [successMessage, setSuccessMessage] = useState('');
	const {
		values,
		textCount,
		errors,
		handleChange,
		handleSubmit,
	} = useForm(create, validate, 'create', active, changeVal);
	const [errorMessage, setErrorMessage] = useState('');
	const [selectedIdeaStepThree, setselectedIdeaStepThree] = useState("")
	const [datavalues, setdatavalues] = useState(values)
	const [iseditorOpen, setiseditorOpen] = useState(false)
	const [selectedIdeaSteptwo, setselectedIdeaSteptwo] = useState("")
	function changeVal() {
	}
	function create() {
		if (active === 3) {
			//console.log('No errors, submit callback called!');
			//console.log(values);
			const data1 = new FormData();
			data1.append("user_id", localStorage.getItem('token'));
			data1.append("content_long", values.content_long);
			data1.append("keyword", values.keyword);
			data1.append("title", values.title);
			data1.append("paragraph", values.paragraph);
			axios.post(getCreateUrl, data1)
				.then((response) => {
					console.log(response);
					// successfully uploaded response
					if (response.data.status === 1) {
						const successMessage = response.data.message;
						setSuccessMessage(successMessage);
						const timer = setTimeout(() => {
							props.history.push('/documents');
						}, 5000);
						return () => clearTimeout(timer);
					} else {

						const errorMessage = response.data.message;
						setErrorMessage(errorMessage);
					}
				})
				.catch((error) => {
					// error response
				});
		}
	}
	const goToEditor = (e) => {
		// props.history.push({
		// 	pathname: "./create-project-edior",
		// 	state: {
		// 		leftdata: values,
		// 		data: selectedIdeaStepThree
		// 	}
		// }
		// )
		setiseditorOpen(true)
	}
	useEffect(() => {
		console.log("aaaaaaaaaaaaa", values);
		console.log("eeeeeeeeeeeeeeeeeeeee", datavalues);
		if (props.location.state) {

			setdatavalues(props.location.state.leftdata)
		}


	}, [])

	const callBack = (data) => {
		setselectedIdeaStepThree(data)
		values.paragraph=data
	}
	const callBackStepTwo = (data) => {
		setselectedIdeaSteptwo(data)
		values.title=data
	}
	const titleCallback =(data) =>{
		values.title=data
	}
	const keywordCallback =(data) =>{
		values.keyword=data
	}
	const contentLongCallback = (data) => {
		values.content_long=data
	}

	const formStepValidate = () => {
		if (Object.keys(values).length === 0) {
			NotificationManager.error('', 'Please fill in all the required fields');
		}
		else {
			setActive(active + 1);
		}
	}

	if (!localStorage.getItem('token')) {
		window.location.href = process.env.PUBLIC_URL + "/login";
	} else {
		return (

			<>
				{
					!iseditorOpen ?
						<div className="dashboard-main">
							<LeftNavbar />
							<div id="main">
								

								<div className="page-content">
									<div className="form-step-sec">
										<div className="page-heading">
											<div className="row">
												<div className="col-12 order-md-1 order-last">
													<h3>New long-form content</h3>
													<p className="text-subtitle text-muted">Follow the steps below to start your content</p>
												</div>
											</div>
										</div>

										<form className="form" method="post" onSubmit={handleSubmit} >
											{errorMessage && (
												<span className="text-danger"> {errorMessage} </span>
											)}
											{successMessage && (
												<span className="success"> {successMessage} </span>
											)}
											
												{
													/*
													active === 1 ?(	<Step1 values={values} textCount={textCount} errors={errors} onChange={handleChange} />
													): (active === 2 ? (<Step2 values={values} errors={errors} onChange={handleChange} />
													): (<Step3 values={values} errors={errors} onChange={handleChange} />))
													*/
													<>
													<div className="form-box-step p-4 mb-3">
														<Step1 values={values} textCount={textCount} errors={errors} onChange={handleChange} active={active} />
															
														<div class="log-box-set mt-4">															
															<button type="button" class="btn btn-primary btn-lg log-btn-logpage new-button" onClick={() => formStepValidate()} >Continue</button>
														</div>
                                                     </div>
													 <div className="form-box-step p-4 mb-3" style={(active > 1) ? { opacity: '1'} : { opacity: '.6',pointerEvents:'none'}}>                                                


														<Step2 values={values} errors={errors} onChange={handleChange} active={active} callBackStepTwo={callBackStepTwo} />
														<div class="log-box-set mt-4">
														{selectedIdeaSteptwo &&
															<button type="button" class="btn btn-primary btn-lg log-btn-logpage new-button" onClick={() => formStepValidate()}>Continue</button>
														}
														</div>
														</div>
														<div className="form-box-step p-4 mb-3" style={(active > 2) ? { opacity: '1'} : { opacity: '.6',pointerEvents:'none'}}>
														<Step3 values={values} errors={errors} onChange={handleChange} active={active} callBack={callBack} />
														<div class="log-box-set mt-4">
															{/* <button type="submit" class="btn btn-primary btn-lg log-btn-logpage new-button" onClick={() => formStepValidate()} disabled={(active === 3) ? false : true}>Submit</button> */}
														</div>
														</div>
													</>
												}

											{/* </div> */}
										</form>
										{
											selectedIdeaStepThree &&
											<button type="submit" className="btn btn-primary btn-lg log-btn-logpage new-button" style={{ float: "right" }} onClick={goToEditor}>open editor</button>


										}
										{/*<button type="submit" className="btn btn-primary btn-lg log-btn-logpage new-button" style={{ float: "right" }} onClick={goToEditor}>open editor</button>*/}
									</div>
								</div>
							</div>
						</div>
						:
						<CreateProjectEditor setiseditorOpen={setiseditorOpen} values={values} selectedIdeaStepThree={selectedIdeaStepThree} titleCallback={titleCallback} keywordCallback= {keywordCallback} contentLongCallback={contentLongCallback} requestto='add' />
				}

				<NotificationContainer />
			</>
		);
	}
}

export default CreateProjectPage;