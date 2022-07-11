import React, {useState} from 'react'
import RichTextEditor from 'react-rte';
import { config } from '../../constant';
import axios from "axios";

const API_KEY = "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";
const URL = "https://api.openai.com/v1/engines/davinci-instruct-beta/completions";
const getCreateUrl = config.url.API_URL + "/project/create";

const CreateProjectEditor = (props) => {
    console.log("props", props);
	const [value,setValue] = useState(props.selectedIdeaStepThree)
    const goback=(e)=>{
        props.setiseditorOpen(false)
    }

    const content_long_handleChange=(e)=>{
        props.contentLongCallback(e.target.value)
    }
    const keyword_handleChange=(e)=>{
        props.keywordCallback(e.target.value)
    }
    const title_handleChange=(e)=>{
       props.titleCallback(e.target.value)
    }
	
	const [editorValue, setEditorValue] =  useState(RichTextEditor.createValueFromString(value, 'markdown'));
	const toolbarConfig = {
		// Optionally specify the groups to display (displayed in the order listed).
		display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN'],
		INLINE_STYLE_BUTTONS: [		  
		  
		  {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
		  {label: 'Italic', style: 'ITALIC'},
		  {label: 'Underline', style: 'UNDERLINE'}
		],
		BLOCK_TYPE_DROPDOWN: [
		  {label: 'Normal', style: 'unstyled'},
		  {label: 'Heading Large', style: 'header-one'},
		  {label: 'Heading Medium', style: 'header-two'},
		  {label: 'Heading Small', style: 'header-three'}
		],
		BLOCK_TYPE_BUTTONS: [
		  {label: 'UL', style: 'unordered-list-item'},
		  {label: 'OL', style: 'ordered-list-item'}
		]
	  };
	const editorHandleChange = value => {
		setValue(value.toString("markdown"));
		setEditorValue(value);
		console.log(value.toString("markdown"));
	};
	
	async function GenCopy(userCommand) {
		const CallAPI = (userCommand) => {
			return {
				prompt: `${userCommand}`,
				temperature: .2,
				max_tokens: 500,
				top_p: .2,
				n:1,
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
		
		return new Promise((resolve, reject) => {
			axios.post(URL, data, { headers: varHeaders})
			.then(function (response) {
				resolve(response);
			})
			.catch(function (error) {
				reject(error);
			});
		});
	}
	
	const fnGenerateIdeas = async () => {
					
		let result = await GenCopy(props.values.title.trim());
		if(result.data.choices.length > 0)
		{
			//console.log(result.data.choices[0].text);
			//setValue(result.data.choices[0].text);
			console.log(result.data.choices[0].text);
			setEditorValue(RichTextEditor.createValueFromString(result.data.choices[0].text,'markdown'));	
		}	
		
	}

    return (
       
        <div className="dashboard-main editorrow">
			<div className="editor_heading">
				
				<div className="editor_heading_div" onClick={(e)=>goback(e)}><i className="fa fa-arrow-left" aria-hidden="true"></i>{props.values.title}</div>
				
			</div>
           
            <div className="contnr">
                <div className="row ">
					<div className="col-md-3 left-bar">
						<div className="row">
							<div className="col-md-9">
								<div className="step-heading">Title</div>
							</div>
							<div className="col-md-12 form-group mb-1 mt-1">
								<textarea className="form-control" onChange={title_handleChange}>{props.values.title}</textarea>
							</div>
							<div className="col-md-3 offset-md-9 text-right">
								<div className="step-heading">0/150</div>
							</div>
						</div>
						
						
						<div className="row">
							<div className="col-md-9">
								<div className="step-heading">Description</div>
							</div>
							<div className="col-md-12 form-group mb-1 mt-1">
								<textarea className="form-control" onChange={content_long_handleChange}>{props.values.content_long}</textarea>
							</div>
							<div className="col-md-3 offset-md-9 text-right">
								<div className="step-heading">0/600</div>
							</div>
						</div>
						
						<div className="row">
							<div className="col-md-9">
								<div className="step-heading">Tone of voice</div>
							</div>
							<div className="col-md-12 form-group mb-1 mt-1">
								<textarea className="form-control" rows="1" onChange={content_long_handleChange}></textarea>
							</div>
							<div className="col-md-3 offset-md-9 text-right">
								<div className="step-heading">0/60</div>
							</div>
						</div>
						
						<div className="row">
							<div className="col-md-9">
								<div className="step-heading">Keywords</div>
							</div>
							<div className="col-md-12 form-group mb-1 mt-1">
								<textarea className="form-control" rows="1" onChange={keyword_handleChange}>{props.values.keyword}</textarea>
							</div>
							<div className="col-md-3 offset-md-9 text-right">
								<div className="step-heading">0/3</div>
							</div>
						</div>
						<div className="row output_length">
							<div className="col-md-9">
								<div className="step-heading">Output Length</div>
							</div>
							<div className="col-md-12 form-group mb-1 mt-1 ">
								<button className="btn btn-primary output_btn">S</button>
								<button className="btn btn-primary output_btn">M</button>
								<button className="btn btn-primary output_btn">L</button>
							</div>
							
						</div>
						<div className="row">							
							<div className="col-md-12 form-group mb-1 mt-1">
								<button className="btn btn-primary output_btn" onClick={fnGenerateIdeas}>Compose</button>
							</div>
							
						</div>
						<p></p>
						<p></p>
						
						{/* <p>{props.values.paragraph}</p> */}
					</div>
					<div className="col-md-9 editor_body">
						
						<RichTextEditor
						  value={editorValue}
						  onChange={editorHandleChange}
						  required
						  id="body-text"
						  name="bodyText"
						  type="string"
						  multiline
						  variant="filled"
						  toolbarConfig={toolbarConfig}
						  style={{ minHeight: "500px" }}
						/>
								
					</div>
				</div>
            </div>
        </div>
    )
}

export default CreateProjectEditor