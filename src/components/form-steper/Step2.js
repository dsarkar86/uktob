import React, { useState } from 'react';
//import Input from './input';
import axios from "axios";
import {NotificationContainer, NotificationManager} from 'react-notifications';


const API_KEY = "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";
const URL = "https://api.openai.com/v1/engines/davinci-instruct-beta/completions";
const userPrompt = "Gnerate Ideas ";



export default function Step2(props) {
	
	//const propsvalue =props.values.content_long;
	// console.log('propsvalue',propsvalue);
	

	const [command, setCommand] = useState("");
	const [allGenIdeas, setAllGenIdeas] = useState([]);
	const [isDisabled, setIsDisabled] = useState(false);
	const [selectedGIText, setSelectedGIText] = useState("");



	///////title value////
	const [title,settitle]=useState('');
	console.log(title);

	const [step2ideas,setStep2ideas]=useState(0);
	
	
	
	

	function handleChange(event) {
		// Here, we invoke the callback with the new value
		console.log(event.target.value);
		settitle(event.target.value);
		setCommand(event.target.value);
		
		props.onChange(event);
		props.callBackStepTwo(event.target.value);
		

	}
	async function GenCopy(userCommand) {
		const CallAPI = (userCommand) => {
			return {
				prompt: `${userCommand}`,
				temperature: .7,
				max_tokens: 20,
				top_p: .3,
				n:8,
				frequency_penalty: 1,
				presence_penalty: 1,
				stop: ["##", "English"],
			};
		};

		const data = CallAPI(userCommand.trim());
		const varHeaders = {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${API_KEY}`
		}
		/*
		const result = await axios.post(URL, data, {
			headers: varHeaders
		})
		.then((response) => {
			if(response)
			{
				console.log("response==>", response);
			}			
		})
		.catch((error) => {
			console.log("error==>", error);
		})
		return result;
		*/
		return new Promise((resolve, reject) => {
			axios.post(URL, data, { headers: varHeaders})
			.then(function (response) {
				resolve(response);
				setIsDisabled(false);
			})
			.catch(function (error) {
				reject(error);
				setIsDisabled(false);
			});
		});
	}
	const fnGenerateIdeas = async () => {

		
		if (command.trim() === "") 
		{   
			console.log(props.values.content_long);
			// return(NotificationManager.error('', 'Please fill the Title fields to get the Ideas'));
			setCommand(props.values.content_long);
		}
		setIsDisabled(true);
		let result = await GenCopy(props.values.content_long.trim());
		if(result.data.choices.length > 0)
		{
			setStep2ideas(1);
			setAllGenIdeas(result.data.choices);
			setIsDisabled(false);
	
		}
		
		
	}
	const fnSelectedText = (text) => {
		setSelectedGIText(text);
		setStep2ideas(0);
		//console.log("fnSelectedText==>",allGenIdeas[textIndex])	
		props.callBackStepTwo(text)	
	}

	


	return (
		<>
			<div className="step-count pb-2">Step 2 of 3</div>
			<div className="log-box-set">
				<div className="row">
					<div className="col-md-12"><div className="step-heading">Title*</div></div>
					<div className="col-md-12 mb-3"><div className="step-heading-sub">Write your own title or let us help you generate ideas.</div></div>
				</div>
				<div className="form-group mb-3 mt-2">
					<textarea className="form-control" disabled={isDisabled} id="exampleFormControlTextarea1" rows="2" name="title"  onChange={handleChange} value={title  ? title : props.values.title} ></textarea>
					{props.errors.title && (<p className="help text-danger">{props.errors.title}</p>)}
				</div>
			</div>
			<div className="step-count pb-2" style={{cursor:'pointer', pointerEvents:isDisabled?'none':'visible'}} onClick={fnGenerateIdeas}>Generate ideas{(isDisabled)?<i className="fa fa-spinner fa-spin"></i>:''}</div>
			
            {
				(step2ideas===1)?

			

			<div className="form-group">

				{
					(allGenIdeas)?					
						allGenIdeas.map((value, index) => (
							<div className="form-group" style={{cursor:'pointer',border:'1px solid #e8e8e8'}} >{value.text.replaceAll(/\n/g,'').substring(0, 50)+"..."} <button className="btn btn-outline-primary m-2" onClick={() => fnSelectedText(value.text)}>Use This One</button></div>
						))
					:
						null
				}
        
			</div>
			:""}
			<NotificationContainer/>
		</>
	)
}