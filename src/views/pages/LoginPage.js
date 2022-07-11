import React, { useState } from "react";
import useForm from "../../useForm";
import validate from '../../FormValidationRules';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { GoogleLogin } from 'react-google-login';

// core components
//import IndexNavbar from "../../components/Navbars/IndexNavbar.js";
//import DefaultFooter from "../../components/Footers/DefaultFooter.js";
import axios from "axios";
import { config } from '../../constant';
//const getLoginUrl = "http://localhost/admin/api/login";
//const getLoginUrl = "http://my-demo.xyz/visa/api/login";
const getLoginUrl = config.url.API_URL+"/users/login";


function LoginPage(props) {
	
	const [active, setActive] = useState(1);
	const {
		values,
		errors,
		handleChange,
		handleSubmit,
	} = useForm(login, validate, 'login',active,changeVal);
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');
	const [token, setToken] = useState();
	
	function changeVal(){
	}
	
	function login() {
	    
		//e.preventDefault();
		//alert(`Submitting Name`);
		const dataArray = new FormData();	
		dataArray.append("email", values.email);
		dataArray.append("password", values.password);
		axios.post(getLoginUrl,dataArray)
		.then((response) => {
			//console.log("response",response);
			
			if(response.data.status === 1){
				const token = response.data.token;
				setToken(token);
				localStorage.setItem('token', token);
				props.history.push('/dashboard');
			}else{
				const errorMessage = response.data.message;
				setErrorMessage(errorMessage);
				NotificationManager.error('',errorMessage);
			}
		})
		.catch((error) => {
		// error response
		});
		//setToken(token);
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
  const responseGoogle = (response) => {
	console.log(response);
  }
  
  return (
    <>
      {/* <ExamplesNavbar /> */}
		
		<div id="auth">        
			<div className="row h-100">
				<div className="col-lg-6 align-self-center">
					<div id="auth-right">
						<div className="logo-top text-center log-logo"><a href="/index">Logo</a></div>
						<div className="log-img  text-center"> <img src={require("../../assets/images/local-img/log-logo.svg").default} alt=""></img></div>
						<div className="log-page-left-text  text-center">
							<h2>Welcome back!</h2>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam purus ligula, faucibus nec.</p>

						</div>
					</div>
				</div>
				<div className="col-lg-6 col-12 align-self-center">
					<div id="auth-left">
					   <h3 className="auth-title">Log in to your account</h3> 
						{/*<div className="log-google text-center"><a href=""><img src={require("../../assets/images/local-img/google-icon.png")} alt=""></img><span>Continue with google</span></a></div>*/}
						<GoogleLogin
							clientId="1081082384352-hscdkrddemddbunlu7s9c0d2j1eo6ntv.apps.googleusercontent.com"
							render={renderProps => (
							
							<div className="log-google text-center"><a onClick={renderProps.onClick} disabled={renderProps.disabled}><img src={require("../../assets/images/local-img/google-icon.png")} alt=""></img><span>Continue with google</span></a></div>
							)}
							buttonText="Login"
							onSuccess={responseGoogle}
							onFailure={responseGoogle}
							cookiePolicy={'single_host_origin'}
						/>
						{errorMessage && (
										  <p className="error"> {errorMessage} </p>
										)}
						<form action="" method="" onSubmit={handleSubmit} className="log-form-area mt-5">
							<div className="form-group position-relative has-icon-left mb-4">
								<label htmlFor="" className="log-input-title">Email address*</label>
								<input type="text" className="form-control form-control-xl" placeholder="Email address" name="email" onChange={handleChange} value={values.email || ''} />
								
							</div>
							<div className="form-group position-relative has-icon-left mb-4">
								<label htmlFor="" className="log-input-title">Password*</label>
								<input type="password" className="form-control form-control-xl" placeholder="Enter password" name="password" onChange={handleChange} value={values.password || ''} />                    
							</div>          
							<p><a className="forget-pass" href="/forgot-password" >Forgot password?</a>.</p>
							<button className="btn btn-primary btn-block btn-lg mt-5 log-btn-logpage">Login</button>
						</form>
						<div className="text-center mt-4 text-lg fs-4">
							<p className="xtra-accouts">Don't have an account? <a href={`${process.env.PUBLIC_URL}/register`} className="font-bold">Sign up</a>.</p>
							
						</div>
					</div>
				</div>
			</div>
		</div>
		<NotificationContainer/>
    </>
  );
}

export default LoginPage;
