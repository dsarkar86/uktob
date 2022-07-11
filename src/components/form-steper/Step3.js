import React, { useState } from 'react';
//import Input from './input';
import axios from "axios";
import {NotificationContainer, NotificationManager} from 'react-notifications';

const API_KEY = "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";
const URL = "https://api.openai.com/v1/engines/davinci-instruct-beta/completions";
const userPrompt = "Gnerate Ideas ";


export default function Step3(props) {
	const step3propsvalue=props.values.title;

	const [command, setCommand] = useState("");
	const [allGenIdeas, setAllGenIdeas] = useState([]);
	const [isDisabled, setIsDisabled] = useState(false);
	const [selectedGIText, setSelectedGIText] = useState("");

	const [step3ideas,setStep3ideas]=useState(0);

	function handleChange(event) {
        // Here, we invoke the callback with the new value
		//console.log(event.target.type);
		setCommand(event.target.value)
		props.onChange(event);
		props.callBack(event.target.value);
    }

	async function GenCopy(userCommand) {
		const CallAPI = (userCommand) => {
			return {
				prompt: `${userCommand}`,
				temperature: .9,
				max_tokens: 200,
				top_p: .5,
				n:3,
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
			setCommand(step3propsvalue);
			// return(NotificationManager.error('', 'Please fill the Title fields to get the Ideas'));
		}
		setIsDisabled(true);
		let result = await GenCopy(props.values.title.trim());
		if(result.data.choices.length > 0)
		{
			setStep3ideas(1);
			setAllGenIdeas(result.data.choices);
			
		}
	}
	const fnSelectedText = (text) => {
		setSelectedGIText(text);
		setStep3ideas(0);
	props.callBack(text)	
	}
	
	return (
	<>
		<div className="step-count pb-2">Step 3 of 3</div>
		<div className="log-box-set">
			<div className="row">
				<div className="col-md-9"><div className="step-heading">Intro Paragraph</div></div>
				<div className="col-md-3 text-right"><div className="letter-count">0/600</div></div>
			</div>
			<div className="form-group mb-3 mt-2">                            
				<textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="paragraph" onChange={handleChange} value={selectedGIText  ? selectedGIText : props.values.paragraph} ></textarea>
				{props.errors.paragraph && ( <p className="help text-danger">{props.errors.paragraph}</p> )}
			</div>
		</div>                    
		<div className="step-count pb-2" style={{cursor:'pointer', pointerEvents:isDisabled?'none':'visible'}} onClick={fnGenerateIdeas}>Generate ideas{(isDisabled)?<i className="fa fa-spinner fa-spin"></i>:''}</div>
			
		{
				(step3ideas===1)?

			<div className="form-group">
				{
					(allGenIdeas)?					
						allGenIdeas.map((value, index) => (
							<div className="form-group" style={{cursor:'pointer',border:'1px solid grey'}}>{value.text.replaceAll(/\n/g,'').substring(0, 100)+"..."} <button className="btn btn-outline-primary m-2" onClick={() => fnSelectedText(value.text)}>Use This One</button> </div>
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