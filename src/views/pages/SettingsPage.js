import React, { useState, useEffect } from "react";
import useForm from "../../useForm";
import validate from '../../FormValidationRules';
// core components
//import ExamplesNavbar from "../../components/Navbars/ExamplesNavbar.js";
import LeftNavbar from "../../components/Navbars/LeftNavbar.js";
import LoginPage from "./LoginPage.js";
import axios from "axios";
import { config } from '../../constant';
//const getTypeUrl = config.url.API_URL+"/template/templatetypes";
//const getTemplateUrl = config.url.API_URL+"/template/templates";

const getUserUrl = config.url.API_URL+"/users/user";
const updateUserUrl = config.url.API_URL+"/users/update";

function SettingsPage(props) {
	const [pills, setPills] = useState("1");

	/*function handleChange(event) {
		//props.onChange(event.target.name,event.target.value);
	}*/
	const [active, setActive] = useState(1);
	const [values, setValues] = useState({});
	
	
	/*const {
		values,
		errors,
		handleChange,
		handleSubmit,
	} = useForm(register, validate, 'register',active,changeVal);
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');*/
	function changeVal(){
	}
	/*function register() {
		console.log('No errors, submit callback called!');
		
		console.log(values);
		const dataArray = new FormData();
		dataArray.append("id", values.id);
		dataArray.append("firstname", values.firstname);
		dataArray.append("lastname", values.lastname);
		dataArray.append("accounttype", values.accountType);		
		dataArray.append("email", values.email);
		dataArray.append("password", values.password);
		axios.post(updateUserUrl, dataArray)
		.then((response) => {
			console.log(response);
		// successfully uploaded response
			if(response.data.status === 1){	
				window.scrollTo(0, 0);
				document.body.scrollTop = 0;			
				const successMessage = response.data.msg;
				setSuccessMessage(successMessage);
				const timer = setTimeout(() => { setSuccessMessage('');; }, 5000);
				return () => clearTimeout(timer);
				
			}else{
				window.scrollTo(0, 0);
				document.body.scrollTop = 0;
				const errorMessage = response.data.msg;
				setErrorMessage(errorMessage);
				const timer = setTimeout(() => { setErrorMessage('');; }, 5000);
				return () => clearTimeout(timer);
			}
		})
		.catch((error) => {
		// error response
		});
	}*/
	
	const [user, setUser] = useState({});
	const getUser = async () => {
		if(localStorage.getItem('token')){
			const res = await axios.post(getUserUrl,{ id:localStorage.getItem('token')});
			const user = res.data.user;
			setUser(res.data.user);
			/*values.id = user[0].id;
			values.firstname = user[0].first_name;
			values.lastname = user[0].last_name;
			values.email = user[0].email;
			values.accountType = user[0].account_type;
			values.password = user[0].password_text;
			values.confirmPassword = user[0].password_text;*/
			console.log(user);
			//console.log(values);
		}
		
	};
	
	function handleChange(event) {
		setUser(user => ({ ...user, [event.target.name]: event.target.value }));
	}
	
	
	const updateCompanyInfo = async () => {
		const dataArr = { 
			user: localStorage.getItem('token'), 
			form: 1,
			company_name: user.company_name,
			website: user.website,
			email: user.email			
		}
		axios.post(updateUserUrl,dataArr)
		.then((response2) => {
			console.log(response2);
			alert("Company Data updated successfully.");				
		})
		.catch((error) => {
		// error response
		});
	};
	
	const updatePersonalInfo = async () => {
		const dataArr = { 
			user: localStorage.getItem('token'), 
			form: 1,
			first_name: user.first_name,
			last_name: user.last_name		
		}
		axios.post(updateUserUrl,dataArr)
		.then((response3) => {
			console.log(response3);
			alert("Personal Data updated successfully.");				
		})
		.catch((error) => {
		// error response
		});
	};
	
	const updatePasswordInfo = async () => {
		const dataArr = { 
			user: localStorage.getItem('token'), 
			form: 1,
			password: user.password			
		}
		axios.post(updateUserUrl,dataArr)
		.then((response4) => {
			console.log(response4);
			alert("Password updated successfully");				
		})
		.catch((error) => {
		// error response
		});
	};
	
	useEffect(() => {
		getUser();
	}, []);

	
	
	if(!localStorage.getItem('token')){
		return (<><LoginPage {...props} /></>);
	   props.history.push(process.env.PUBLIC_URL+'/login');
	}else{
	return (
		<div className="dashboard-main">
		<LeftNavbar />
		<div id="main">
            
            <div className="page-heading">
                <h3>Settings</h3>
                <div className="setting-wizard-btns d-flex mt-3">
                    <div className={"wizard-btns workplace" + (pills === "1" ? " active" : "")} onClick={(e) => { e.preventDefault(); setPills("1"); }}>Workplace</div>
                    <div className={"wizard-btns" + (pills === "2" ? " active" : "")} onClick={(e) => { e.preventDefault(); setPills("2"); }}>Personal</div>
                    <div className={"wizard-btns" + (pills === "3" ? " active" : "")} onClick={(e) => { e.preventDefault(); setPills("3"); }}>Team</div>
                    <div className={"wizard-btns bill" + (pills === "4" ? " active" : "")} onClick={(e) => { e.preventDefault(); setPills("4"); }}>Usage & billing</div>

                </div>
            </div>
            <div className="page-content">
                <section className={"row justify-content-center wizard-box" + (pills === "1" ? " active" : "")} >

                    
                    <div className="col-lg-7 col-md-8 mt-3">
                        <div className="w-card">
                            <div className="w-title">Company information</div>
                            <div className="ws-title">Tell us about your business</div>
                            <form action="" id="companyInformation">
                                <div className="img-div">
                                    <img src={require("../../assets/images/faces/1.jpg")} alt="not found" />
                                </div>
                                <div className="form-field">
                                    <div className="input-group">
                                        <label htmlFor="companyName">Company Name</label>
                                        <input type="text" name="company_name" placeholder="Exp: Text camp" onChange={handleChange} value={user.company_name || ''} required />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="companyName">Primary website domain</label>
                                        <input type="text" name="website" placeholder="exp: https://www.testcamp.com" onChange={handleChange} value={user.website || ''} required />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="companyName">Billing email</label>
                                        <input type="email" name="email" placeholder="exp: jhon@mail.com" onChange={handleChange} value={user.email || ''} required />
                                    </div>

                                    <button className="btn btn-sub mt-4" type="button" name="companyInfoSubmit" onClick={updateCompanyInfo}>Save</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </section>

                
                <section id="personalInformation" className={"wizard-box" + (pills === "2" ? " active" : "")} >
                    <div className="row justify-content-center">
                        <div className="col-lg-7 col-md-8 mt-3">
                            <div className="w-card">
                                <div className="w-title">Personal information</div>
                                <div className="ws-title">Tell us a little about yourself</div>
                                <form action="" id="personalInformation">
                                    <div className="p-form-field">
                                        <div className="input-group">
                                            <label htmlFor="companyName">First Name</label>
                                            <input type="text" name="first_name" placeholder="exp: Emma" onChange={handleChange} value={user.first_name || ''} required />
                                        </div>
                                        <div className="input-group">
                                            <label htmlFor="companyName">Last Name</label>
                                            <input type="text" name="last_name" placeholder="exp: Stone" onChange={handleChange} value={user.last_name || ''} required />
                                        </div>
                                    </div>
                                    
                                    <button className="btn btn-sub mt-4" type="submit" name="personalInfoSubmit" onClick={updatePersonalInfo}>Save</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-7 col-md-8 mt-3">
                            <div className="w-card">
                                <div className="w-title">Authentication</div>
                                <div className="ws-title">Add or update your password</div>
                                <form action="" id="updatePassword">
                                   
                                        <div className="input-group">
                                            <label htmlFor="companyName">New password</label>
                                            <input type="password" name="password" placeholder="*********" onChange={handleChange} required />
                                        </div>
                                        

                                        <button className="btn btn-sub-2 mt-4" type="submit" name="updatePassword" onClick={updatePasswordInfo} >Update password</button>
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </section>                
                <section className={"wizard-box" + (pills === "1" ? " active" : "")} ></section>                
                <section className={"wizard-box" + (pills === "1" ? " active" : "")} ></section>

            </div>            
        </div>
		</div>
	);
	}
}

export default SettingsPage;