import React,{useState, useEffect} from 'react';
import { config } from '../../constant';
import axios from "axios";

const API_KEY = "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";
//const URL = "https://api.openai.com/v1/engines/davinci-instruct-beta/completions";
const URL = "https://api.openai.com/v1/engines/text-davinci-002/completions";
const getTemplateUrl = config.url.API_URL+"/template/templates";
const getTemplateParamsUrl = config.url.API_URL+"/template/templateparameters";
const getTonesUrl = config.url.API_URL+"/template/tones";
const postGenTextsUrl = config.url.API_URL+"/choices/add";

const TemplateContentPage = (props) => {
	let [editorstate,seteditorstate]=useState('');
    let [editorstate2,seteditorstate2]=useState('');
    let [command,setCommand]=useState('');
    let [temperature,setTemperature]=useState('1');
    let [top_p,setTop_p]=useState('1');
	let [max_tokens,setMax_tokens]=useState('1');
    let [frequency_penalty,setFrequency_penalty]=useState('0');
	let [presence_penalty,setPresence_penalty]=useState('0');
    let [stop,setStop]=useState('');
    let [outputNo,setOutputNo]=useState(3);
	let [tone,setTone]=useState('');

    const [selectString,setselectString]=useState("");
    const [templates, setTemplateData] = useState([]);
	const getTemplateWithAxios = async () => {
		
		axios.post(getTemplateUrl)
		.then((response2) => {
			console.log(response2);
			console.log(typeof(props.match.params.id));
			const templates = response2.data.templates;
			setTemplateData(templates);				
		})
		.catch((error) => {
		// error response
		});
	};
	
	const [templateParams, setTemplateParams] = useState([]);
	const getTemplateParamsWithAxios = async () => {
		const data1 = new FormData();
		data1.append("id", props.match.params.id);
		axios.post(getTemplateParamsUrl,data1)
		.then((response) => {
			console.log(response);
			const params = response.data.params;
			setTemplateParams(params);
			setTemperature(response.data.template[0].temperature);
			setTop_p(response.data.template[0].top_p);
			setMax_tokens(response.data.template[0].max_tokens);
			setFrequency_penalty(response.data.template[0].frequency_penalty);
			setPresence_penalty(response.data.template[0].presence_penalty);
			setStop(response.data.template[0].stop);
		})
		.catch((error) => {
		// error response
		});
	};
	
	const [tones, setTones] = useState([]);
	const getTonesWithAxios = async () => {
		
		axios.get(getTonesUrl)
		.then((response3) => {
			console.log(response3);
			const res = response3.data.tones;
			setTones(res);				
		})
		.catch((error) => {
		// error response
		});
	};

    function hendleOnChange(e){
		console.log(e.currentTarget.textContent);
		
        seteditorstate2(e.currentTarget.textContent);
		
    }

    
    function onBoldClick(event){
		document.execCommand("bold");
		console.log()
       /*setselectString( window.getSelection().toString());
       let strValue= window.getSelection().toString();       
       console.log(editorstate);
       console.log('select value',strValue);
       editorstate=editorstate.replace(strValue,'<b>'+strValue+'</b>');	   
       seteditorstate(editorstate);*/       
    };
	
	function onItalicClick(event){
		document.execCommand("italic");
       /*let strValue= window.getSelection().toString();  
       editorstate=editorstate.replace(strValue,'<i>'+strValue+'</i>');	   
       seteditorstate(editorstate); */      
    };
	
	function onUnorderedlistClick(event){
		document.execCommand("insertUnorderedList");
       /*editorstate='<ul><li>'+editorstate+'</li></ul>';	   
       seteditorstate(editorstate);*/       
    };
	
	function onOrderedlistClick(event){
		document.execCommand("insertOrderedList");
       /*editorstate='<ol><li>'+editorstate+'</li></ol>';	   
       seteditorstate(editorstate); */      
    };
	
	function onUnderlineClick(event){
		document.execCommand("underline");
       /*let strValue= window.getSelection().toString();     
       editorstate=editorstate.replace(strValue,'<u>'+strValue+'</u>');	   
       seteditorstate(editorstate); */      
    };
	
	function onHeader1Click(event){
		document.execCommand('formatBlock', false, 'h1');
       /*setselectString( window.getSelection().toString());
       let strValue= window.getSelection().toString();       
       editorstate=editorstate.replace(strValue,'<h1>'+strValue+'</h1>');	   
       seteditorstate(editorstate);  */     
    };
	
	function onHeader2Click(event){
		document.execCommand('formatBlock', false, 'h2');
       /*setselectString( window.getSelection().toString());
       let strValue= window.getSelection().toString();       
       editorstate=editorstate.replace(strValue,'<h2>'+strValue+'</h2>');	   
       seteditorstate(editorstate);  */     
    };
	
	function onHeader3Click(event){
		document.execCommand('formatBlock', false, 'h3');
       /*setselectString( window.getSelection().toString());
       let strValue= window.getSelection().toString();       
       editorstate=editorstate.replace(strValue,'<h3>'+strValue+'</h3>');	   
       seteditorstate(editorstate);*/       
    };
    
	function undoClick(event){
       document.execCommand("undo");       
    };
	function handleOnChange(e){
		console.log(e.target.name);
		let cmd = command+'\\n\\n'+e.target.name+':'+e.target.value;
        setCommand(cmd);
	
    }
	function handleOnChangeTone(e){
		console.log(e.target.value);		
		setTone(e.target.value);;
    }
	function handleOnOutChange(e){
		console.log(e.target.value);		
        let outp = e.target.value;
		setOutputNo(outp);
    }
	function fnSelectedText(copy_text){
		//document.execCommand('copy');
		navigator.clipboard.writeText(copy_text);
	}
	/*****************************************generate copy section ************************/
	async function GenCopy(userCommand) {
		if(tone !== ''){
			userCommand='\\n\\nTone of voice:'+tone;
		}
		const CallAPI = (userCommand) => {
			return {
				prompt: `${userCommand}`,
				temperature: parseFloat(temperature),
				max_tokens: parseInt(max_tokens),
				top_p: parseFloat(top_p),
				n:parseInt(outputNo),
				frequency_penalty: parseInt(frequency_penalty),
				presence_penalty: parseInt(presence_penalty),
				stop: stop,
			};
		};

		const data = CallAPI(userCommand);
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
	const [allGenIdeas, setAllGenIdeas] = useState([]);
	const fnGenerateIdeas = async () => {
					
		//let result = await GenCopy(props.values.title.trim(),600);
		console.log(editorstate2);
		let result = await GenCopy(command);
		if(result.data.choices.length > 0)
		{
			console.log(result.data.choices);	
			setAllGenIdeas(result.data.choices);
			
			let choicesData = {
				choices : JSON.stringify(result.data.choices),
				template : props.match.params.id,
				user : localStorage.getItem('token')
			};
			axios.post(postGenTextsUrl, choicesData)
			.then(function (response4) {
				console.log('GenText',response4);
			})
			.catch(function (error) {
				//reject(error);
			});
		}	
		
	}
	/*****************************************generate copy section ************************/
	
	
	useEffect(() => {
		getTemplateWithAxios();
		getTemplateParamsWithAxios();
		getTonesWithAxios();
	}, []);
	
	if(!localStorage.getItem('token')){
		window.location.href = process.env.PUBLIC_URL+"/login";
	}else{
	return (
		<>

		<div className="container-fluid" >
			<div className="row" >
				<div className="col-lg-12 d-flex bor-b">
					<div>					
						<a href={`${process.env.PUBLIC_URL}/templates`}><i className="fa fa-arrow-left"></i>Back</a>						
					</div>
				</div>
			</div>
		</div>

		<div className="row" style={{marginRight:"0px",marginLeft:"0px" }}>
			<div className="col-md-2" style={{borderRight:"1px solid #0002",paddingTop:"20px"}}>
			{ 
			templates && templates.map((template,index)=>( 
			<div key={index} style={template.id == props.match.params.id?{backgroundColor:"#F5F5F5"}:{backgroundColor:"#FFFFFF"}}>
				<a href={`${process.env.PUBLIC_URL}/create-template-content/`+template.id}>					
					<div className="box-title pt-2 pb-2">
						<div style={{width:"20px",display:"inline-block",color:"#2C5F5B"}}><i className={template.icon} aria-hidden="true"></i></div>
						<span style={{marginLeft:"5px"}}>{template.title}</span>
					</div>
				</a>
			</div>
			))}
			</div>
			<div className="col-md-5" style={{borderRight:"1px solid #0002",paddingTop:"40px", paddingLeft:"25px"}}>
		
				<div className="box-list">
					{ 
					templateParams && templateParams.map((tp,i)=>(
					<div key={i} className="boxes mt-2">
						<div className="dd-flex">
							<div>{tp.parameter}</div>
							<div className="limit">0/{tp.text_length}</div>
						</div>
						<div>
							{tp.type==='input'?(<input type="text" className="prod-text" name={tp.parameter} id={'parameter'+tp.id+'_'+tp.is_required} defaultValue={tp.value} onBlur={handleOnChange} />):
							(<textarea className="prod-text" name={tp.parameter} id={'parameter'+tp.id+'_'+tp.is_required} rows="2" defaultValue={tp.value} onBlur={handleOnChange}></textarea>)
							}
						</div>
					</div>
					))}
			
					{/*<div className="boxes mt-3">
						<div className="dd-flex">
							<div>Description</div>
							<div className="limit">0/600</div>
						</div>
						<div>
							<textarea className="prod-text" name="productDescription" id="productDescription" rows="3" ></textarea>
						</div>
					</div>*/}
			
					<div className="boxes mt-3">
						<div className="dd-flex">
							<div>Tone of voice</div>							
						</div>
						<div>
							<select className="prod-text" name="tone" id="tone" rows="2" onChange={handleOnChangeTone}>
							
							{ tones && tones.map((tone,t)=>(
							<option key={t} value={tone.name}>{tone.name}</option>
							))}
							</select>
						</div>
						
					</div>
				</div>
				
				<div className="buttons" style={{marginTop:"20px"}}>
					<div style={{display:"inline"}}>
						<div className="dd-flex">
							<div style={{display:"inline",marginTop:"10px",paddingTop:"10px",paddingRight:"10px"}}>Outputs : </div>
							<input type="number" style={{width:"50px"}} className="prod-text" name="outputs" id="outputs" defaultValue="3" onChange={handleOnOutChange} />							
						</div>
					</div>
					<button className="btn btn_main cl-1 mt-3" onClick={fnGenerateIdeas}>Create Copy</button>					
				</div>
				
				<div className="form-group">

				{
					(allGenIdeas)?					
						allGenIdeas.map((value, index) => (
							<div className="form-group" style={{cursor:'pointer',border:'1px solid #e8e8e8'}} >
								<div style={{borderTop:"1px solid #e8e8e8",padding:"10px"}}>{value.text.substring(0,parseInt(max_tokens))}</div>
								<div style={{borderTop:"1px solid #e8e8e8",padding:"10px"}}>
								<button className="btn btn-outline-primary m-2" onClick={() => fnSelectedText(value.text)}>Copy</button> 
								</div>
							</div>
						))
					:
						null
				}

				</div>
			</div>
			<div className="col-md-5" style={{paddingLeft:"0px",paddingRight:"0px"}}>
				<div className="btn-section">
					<div className="editor-btns">
						<button className="btn icon-set active" onClick={onHeader1Click}><b>H1</b></button>
						<button className="btn icon-set" onClick={onHeader2Click}><b>H2</b></button>
						<button className="btn icon-set" onClick={onBoldClick}><b>B</b></button>
						<button className="btn icon-set" onClick={onItalicClick}><b><i>I</i></b></button>
						<button className="btn icon-set" onClick={onUnderlineClick}><b><u>U</u></b></button>
						<button className="btn icon-set" onClick={onUnorderedlistClick}><i className="fa fa-list"></i></button>
							{/*<button className="btn icon-set"><i className="fa fa-image"></i></button>*/}
						<button className="btn icon-set btns-rht" onClick={undoClick}><i className="fa fa-rotate-left"></i></button>
					</div>

				</div>
				
				<div id="mainTextArea">					
					<div contentEditable="true" name="text" className="main-text-area" id="editor"  ></div>
				</div>
			</div>
		</div>

        </>
	);
	}
}

export default TemplateContentPage;