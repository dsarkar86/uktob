import React, { useState } from "react";
import useForm from "../../useForm";
import validate from '../../FormValidationRules';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import axios from "axios";
import { config } from '../../constant';
const getRegisterUrl = config.url.API_URL+"/users/register";


function RegisterPage(props) {
	const [active, setActive] = useState(1);
	const {
		values,
		errors,
		handleChange,
		handleSubmit,
	} = useForm(register, validate, 'register',active,changeVal);
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');
	
	function changeVal(){
	}
	
	function register() {
		console.log('No errors, submit callback called!');
		console.log(values);
		const dataArray = new FormData();
		dataArray.append("firstname", values.firstname);
		dataArray.append("lastname", values.lastname);		
		dataArray.append("email", values.email);
		dataArray.append("password", values.password);
		axios.post(getRegisterUrl, dataArray)
		.then((response) => {
			console.log(response);
		// successfully uploaded response
			if(response.data.status === 1){
				
				window.scrollTo(0, 0);
				document.body.scrollTop = 0;
				const successMessage = response.data.msg;
				setSuccessMessage(successMessage);
				const timer = setTimeout(() => { 
				props.history.push('/login'); 
				}, 5000);
				return () => clearTimeout(timer);
			}else{
				window.scrollTo(0, 0);
				document.body.scrollTop = 0;
				const errorMessage = response.data.message;
				setErrorMessage(errorMessage);
				NotificationManager.error('',errorMessage);
			}
		})
		.catch((error) => {
		// error response
		});
	}

	
  /*const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  React.useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);*/
  
  return (
    <>
      {/* <ExamplesNavbar /> */}
		
		<div id="auth">        
			<div className="row h-100">
				<div className="col-lg-6 align-self-center">
					<div id="auth-right">
						<div className="logo-top text-center log-logo"><a href="/index">Logo</a></div>               
						<div className="log-page-left-text  text-center">
							<h2>Hey there!</h2>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam purus ligula, faucibus nec.</p>

						</div>
					</div>
				</div>


				<div className="col-lg-6 col-12 align-self-center">
					<div id="auth-left">
					   <h3 className="auth-title">Create your account</h3> 
						<div className="log-google text-center"><a href=""><img src={require("../../assets/images/local-img/google-icon.png")} alt=""></img><span>Continue with google</span></a></div>
						<form className="log-form-area mt-5" method="" onSubmit={handleSubmit}>
							{errorMessage && (
							  <span className="is-danger"> {errorMessage} </span>
							)}
							{successMessage && (
							  <span className="success"> {successMessage} </span>
							)}
							<div className="form-group position-relative has-icon-left mb-4">
								<div className="row">
									<div className="col-md-6">
										<label className="log-input-title">First name*</label>
										<input type="text" className="form-control form-control-xl" name="firstname" onChange={handleChange} value={values.firstname || ''} placeholder="First name" /> 
										{errors.firstname && ( <p classNameName="help is-danger">{errors.firstname}</p> )}										
									</div>
										<div className="col-md-6">
										<label className="log-input-title">Last Name*</label>
										<input type="text" className="form-control form-control-xl" name="lastname" onChange={handleChange} value={values.lastname || ''} placeholder="Last Name" />    
									</div>
								</div>
												
							</div>
							<div className="form-group position-relative has-icon-left mb-4">
								<label className="log-input-title">Email address*</label>
								<input type="email" className="form-control form-control-xl" name="email" onChange={handleChange} value={values.email || ''} placeholder="Enter Email" />                    
							</div> 
							<div className="form-group position-relative has-icon-left mb-4">
								<label className="log-input-title">Password* <span style={{fontSize:'12px', fontWeight:'normal', color:'#838383 '}}>(must be 6 or more characters)</span></label>
								<input type="password" className="form-control form-control-xl" name="password" onChange={handleChange} value={values.password || ''} placeholder="Enter password"/>                    
							</div> 



							<p><a className="forget-pass" href="auth-forgot-password.html">Forgot password?</a>.</p>
							<button type="submit" className="btn btn-primary btn-block btn-lg mt-5 log-btn-logpage">Continue</button>
						</form>
						<div className="text-center mt-4 text-lg fs-4">
							<p className="xtra-accouts">Already have an account?<a href={`${process.env.PUBLIC_URL}/login`} className="font-bold">Login</a>.</p>
							
						</div>
					</div>
				</div>


			</div>

		</div>
		<NotificationContainer/>
    </>
  );
}

export default RegisterPage;
