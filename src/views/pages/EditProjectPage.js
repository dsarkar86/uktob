import React, { useState, useEffect } from "react";
import useForm from "../../useForm";
import validate from '../../FormValidationRules';
import { config } from '../../constant';
import axios from "axios";
//import { MultiStepForm, Step } from 'react-multi-form';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useNavigate } from "react-router";
import CreateProjectEditor from "./CreateProjectEditor";
const getProjectDetailsUrl = config.url.API_URL+"/project/edit";


function EditProjectPage(props) {
	const [iseditorOpen, setiseditorOpen] = useState(false);
	const [values, setValues] = useState([]);
	const [project, setProjectData] = useState([]);
	//console.log(props.match.params.id);
	const getProjectsWithAxios = async () => {
		const data1 = new FormData();
		data1.append("id", props.match.params.id);
		axios.post(getProjectDetailsUrl,data1)
		.then((response) => {
			console.log(response);
			const project = response.data.projects[0];
			setProjectData(project);				
		})
		.catch((error) => {
		// error response
		});
	};
	useEffect(() => {
		if(props.match.params.id){
		getProjectsWithAxios();
		}
	}, []);	
	
	if(!localStorage.getItem('token')){
		window.location.href = process.env.PUBLIC_URL+"/login";
	}else{
		return (
			<>
			<CreateProjectEditor setiseditorOpen={setiseditorOpen} values={project} requestto='edit' pid={props.match.params.id} />
			</>
		);
	}
}

export default EditProjectPage;;