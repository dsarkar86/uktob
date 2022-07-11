import React,{useState, useEffect} from 'react';
//import { useHistory } from "react-router";
// import LeftNavbar from "../../components/Navbars/LeftNavbar.js";
//import { Editor, EditorState, RichUtils } from "draft-js";
//import BlockStyleToolbar, {
//  getBlockStyle
//} from "../blockStyles/BlockStyleToolbar";
import { config } from '../../constant';
import axios from "axios";

const API_KEY = "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";
const URL = "https://api.openai.com/v1/engines/davinci-instruct-beta/completions";
const getCreateUrl = config.url.API_URL + "/project/create";

const CreateProjectEditor = (props) => {
	//let history = useHistory();
	const goback=(e)=>{		
		props.setiseditorOpen(false)		
    }
	let [textLength,setTextLength]=useState(200);
	let [contentLong,setContentLong]=useState('');
	let [keyword,setKeyword]=useState('');
	let [title,setTitle]=useState('');

    const content_long_handleChange=(e)=>{
        setContentLong(e.target.value)
    }
    const keyword_handleChange=(e)=>{
        setKeyword(e.target.value)
    }
    const title_handleChange=(e)=>{
		setTitle(e.target.value)
    }
	
    //let [editorstate,seteditorstate]=useState("<p>In some countries, such as the United States, 'ice cream' applies only to a specific variety, and most governments regulate the commercial use of the various terms according to the relative quantities of the main ingredients, notably the amount of cream.</p>");
    let [editorstate,seteditorstate]=useState(props.values.paragraph);
    let [editorstate2,seteditorstate2]=useState(props.values.paragraph);

    const [selectString,setselectString]=useState("");
    

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
    function clearClick(event){
    document.execCommand('removeFormat', false, null);
};
    /*useEffect(() => {
		seteditorstate(editorstate);
		console.log('editor state',editorstate);
	}, [editorstate]);*/
	
	async function GenCopy(userCommand,tokens) {
		const CallAPI = (userCommand) => {
			return {
				prompt: `${userCommand}`,
				temperature: .2,
				max_tokens: tokens,
				top_p: .2,
				n:1,
				frequency_penalty: 1,
				presence_penalty: 1,
				stop: ["##", "English"],
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
	
	const fnGenerateIdeasCompose = async () => {
					
		//let result = await GenCopy(props.values.title.trim(),600);
		console.log(editorstate2);
		let result = await GenCopy(editorstate2,textLength);
		if(result.data.choices.length > 0)
		{
			console.log(result.data.choices[0].text);
			seteditorstate(result.data.choices[0].text);
			//console.log(result.data.choices[0].text);
			//setValue(result.data.choices[0].text);
			//console.log(result.data.choices[0].text);
			const data1 = new FormData();
			data1.append("user_id", localStorage.getItem('token'));
			data1.append("content_long", contentLong);
			data1.append("keyword", keyword);
			data1.append("title", title);
			data1.append("paragraph", result.data.choices[0].text);
			data1.append("requestto", props.requestto);
			if(props.requestto === 'edit'){
				data1.append("id",props.pid);
			}
			axios.post(getCreateUrl, data1)
				.then((response) => {
					console.log(response);
					// successfully uploaded response
					if (response.data.status === 1) {
						//const successMessage = response.data.message;
						//setSuccessMessage(successMessage);
						const timer = setTimeout(() => {
							//props.history.push("/documents");
							//window.location.href = `${process.env.PUBLIC_URL}/documents`;
							//props.history.push('/documents');
						}, 5000);
						return () => clearTimeout(timer);
					} else {

						//const errorMessage = response.data.message;
						//setErrorMessage(errorMessage);
					}
				})
				.catch((error) => {
					// error response
				});
			
		}	
		
	}
	
	const fnGenerateIdeasSmall = async () => {					
		/*let result = await GenCopy(editorstate,200);
		if(result.data.choices.length > 0)
		{
			console.log(result.data.choices[0].text);
			seteditorstate(result.data.choices[0].text);
		}*/
		setTextLength(200);	
					
	}
	
	const fnGenerateIdeasMedium = async () => {					
		setTextLength(400);	
				
	}
	
	const fnGenerateIdeasLarge = async () => {					
		setTextLength(600);	
		
	}

	useEffect(() => {
		if(props.values.title){
			console.log(props);
			setContentLong(props.values.content_long);
			setKeyword(props.values.keyword);
			setTitle(props.values.title);
			seteditorstate(props.values.paragraph);
		}
	}, [props]);	

    return(
        <>

	<div className="container-fluid">
        <div className="row">
            <div className="col-lg-12 d-flex bor-b">
                <div>
				{props.requestto==='add'?(<>
                    <div onClick={(e)=>goback(e)}><i className="fa fa-arrow-left"></i></div> <span>{title}</span></>
				):(
					<><a href={`${process.env.PUBLIC_URL}/documents`}><i className="fa fa-arrow-left"></i></a><span style={{marginLeft:'10px'}}>{title}</span></>
				)}
                    
                </div>
                <div className="flex-items">
                    <div className="icon-box bg-1 cl-1">
                        <i className="fa fa-eye"></i>
                   </div>
                   <div className="icon-box bg-2">
                        <i className="fas fa-book-open"></i>
                    </div>
                </div>
            </div>
        </div>
        

    </div>

   
    <section id="sideNav">
        <div className="box-list">
            <div className="boxes">
                <div className="dd-flex">
                    <div>Title</div>
                    <div className="limit">0/150</div>
                </div>
                <div>
                    <textarea className="prod-text" name="productName" id="productName" rows="2" onChange={title_handleChange} value={title}></textarea>
                </div>
            </div>
    
            <div className="boxes mt-3">
                <div className="dd-flex">
                    <div>Description</div>
                    <div className="limit">0/600</div>
                </div>
                <div>
                    <textarea className="prod-text" name="productDescription" id="productDescription" rows="3" onChange={content_long_handleChange} value={contentLong}></textarea>
                </div>
            </div>
    
            <div className="boxes mt-3">
                <div className="dd-flex">
                    <div>Tone of voice</div>
                    <div className="limit">0/60</div>
                </div>
                <div>
                    <textarea className="prod-text" name="tVoice" id="tVoice" rows="2"></textarea>
                </div>
            </div>
			
			<div className="boxes mt-3">
                <div className="dd-flex">
                    <div>Keywords</div>
                    <div className="limit">0/3</div>
                </div>
                <div>
                    <textarea className="prod-text" name="keywords" id="keywords" rows="2" onChange={keyword_handleChange} value={keyword}></textarea>
                </div>
            </div>
			
            <div className="boxes mt-3">
                <div className="dd-flex">
                    <div>Output Length</div>
                </div>
                <div className="size-btns">
                    <div className={textLength==200?"icon-set-size active":"icon-set-size"} onClick={fnGenerateIdeasSmall}>S</div>
                    <div className={textLength==400?"icon-set-size active":"icon-set-size"} onClick={fnGenerateIdeasMedium}>M</div>
                    <div className={textLength==600?"icon-set-size active":"icon-set-size"} onClick={fnGenerateIdeasLarge}>L</div>
                </div>
            </div>

        </div>

        <div className="buttons">
            <button className="btn btn_main cl-1" onClick={fnGenerateIdeasCompose}>Compose</button>
            
        </div>

    </section>


<main>
        <div className="btn-section">
            <div className="editor-btns">
                <button className="btn icon-set active" onClick={onHeader1Click}><b>H1</b></button>
                <button className="btn icon-set" onClick={onHeader2Click}><b>H2</b></button>
                <button className="btn icon-set" onClick={onHeader3Click}><b>H3</b></button>
                <button className="btn icon-set" onClick={onBoldClick}><b>B</b></button>
                <button className="btn icon-set" onClick={onItalicClick}><b><i>I</i></b></button>
                <button className="btn icon-set" onClick={onUnderlineClick}><b><u>U</u></b></button>
					{/*<button className="btn icon-set"><i className="fa fa-link"></i></button>*/}
				<button className="btn icon-set" onClick={onUnorderedlistClick}><i className="fa fa-list"></i></button>
                <button className="btn icon-set" onClick={onOrderedlistClick}><i className="fa fa-list-ol"></i></button>
                <button className="btn icon-set" onClick={clearClick}><b><u>Clear</u></b></button> 
					{/*<button className="btn icon-set"><i className="fa fa-image"></i></button>*/}
            </div>
            <div className="editor-btns">
                {/* <!-- <button className="btn icon-set"><i className="fa-solid fa-ellipsis"></i></button> --> */}
                
                <button className="btn icon-set btns-rht" onClick={undoClick}><i className="fa fa-rotate-left"></i></button>
                <button className="btn icon-set btns-rht cl-g"><i className="fa fa-shield"></i></button>
                <button className="btn icon-set btns-info btns-rht"><i className="fa fa-circle-info"></i></button>
            </div>
        </div>
        
        <section id="mainTextArea">
            
            <div contentEditable="true" name="text" className="main-text-area" id="" onInput={hendleOnChange} dangerouslySetInnerHTML={{ __html: editorstate  }}></div>
        </section>
        
    </main>

        </>
    )
}
export default CreateProjectEditor;
