import React,{useState, useEffect} from 'react'
// import LeftNavbar from "../../components/Navbars/LeftNavbar.js";
//import { Editor, EditorState, RichUtils } from "draft-js";
//import BlockStyleToolbar, {
//  getBlockStyle
//} from "../blockStyles/BlockStyleToolbar";

function Simplepage(){

    let [editorstate,seteditorstate]=useState("<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, hic magni. Numquam, quam? Placeat porro molestiae deleniti, neque est adipisci voluptate? At maiores maxime doloremque sequi vel fuga veniam repellat</p>");

    const [selectString,setselectString]=useState("");
    

    function hendleOnChange(e){
        seteditorstate(e.target.value);
    }

    
    function onBoldClick(event){
       setselectString( window.getSelection().toString());
       let strValue= window.getSelection().toString();       
       console.log(editorstate);
       console.log('select value',strValue);
       editorstate=editorstate.replace(strValue,'<b>'+strValue+'</b>');	   
       seteditorstate(editorstate);       
    };
	
	function onItalicClick(event){;
       let strValue= window.getSelection().toString();  
       editorstate=editorstate.replace(strValue,'<i>'+strValue+'</i>');	   
       seteditorstate(editorstate);       
    };
	
	function onUnderlineClick(event){
       let strValue= window.getSelection().toString();     
       editorstate=editorstate.replace(strValue,'<u>'+strValue+'</u>');	   
       seteditorstate(editorstate);       
    };
	
	function onHeader1Click(event){
       setselectString( window.getSelection().toString());
       let strValue= window.getSelection().toString();       
       editorstate=editorstate.replace(strValue,'<h1>'+strValue+'</h1>');	   
       seteditorstate(editorstate);       
    };
	
	function onHeader2Click(event){
       setselectString( window.getSelection().toString());
       let strValue= window.getSelection().toString();       
       editorstate=editorstate.replace(strValue,'<h2>'+strValue+'</h2>');	   
       seteditorstate(editorstate);       
    };
	
	function onHeader3Click(event){
       setselectString( window.getSelection().toString());
       let strValue= window.getSelection().toString();       
       editorstate=editorstate.replace(strValue,'<h3>'+strValue+'</h3>');	   
       seteditorstate(editorstate);       
    };
    
    /*useEffect(() => {
		seteditorstate(editorstate);
		console.log('editor state',editorstate);
	}, [editorstate]);*/

    return(
        <>

<div className="container-fluid">
        <div className="row">
            <div className="col-lg-12 d-flex bor-b">
                <div>
                    <a href="#"><i className="fa-solid fa-arrow-left"></i></a> 
                    &nbsp;Cotton Shirt the perfect wardrope
                </div>
                <div className="flex-items">
                    <div className="icon-box bg-1 cl-1">
                        <i className="fa-regular fa-eye"></i>
                   </div>
                   <div className="icon-box bg-2">
                        <i className="fa-solid fa-book-open"></i>
                    </div>
                </div>
            </div>
        </div>
        

    </div>

   
    <section id="sideNav">
        <div className="box-list">
            <div className="boxes">
                <div className="dd-flex">
                    <div>Company / Product name*</div>
                    <div className="limit">0/80</div>
                </div>
                <div>
                    <textarea className="prod-text" name="productName" id="productName" rows="2"></textarea>
                </div>
            </div>
    
            <div className="boxes mt-3">
                <div className="dd-flex">
                    <div>Product description*</div>
                    <div className="limit">0/600</div>
                </div>
                <div>
                    <textarea className="prod-text" name="productDescription" id="productDescription" rows="3"></textarea>
                </div>
            </div>
    
            <div className="boxes mt-3">
                <div className="dd-flex">
                    <div>Tone of voice</div>
                    <div className="limit">0/80</div>
                </div>
                <div>
                    <textarea className="prod-text" name="tVoice" id="tVoice" rows="2"></textarea>
                </div>
            </div>

            <div className="boxes mt-3">
                <div className="dd-flex">
                    <div>Output Length</div>
                </div>
                <div className="size-btns">
                    <div className="icon-set-size">S</div>
                    <div className="icon-set-size">M</div>
                    <div className="icon-set-size">L</div>
                </div>
            </div>

        </div>

        <div className="buttons">
            <button className="btn btn_main cl-1">compose</button>
            <div className="icon-box bg-2 h-40">
                <i className="fa-solid fa-arrows-rotate"></i>
            </div>
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
                <button className="btn icon-set"><i className="fa fa-link"></i></button>
				<button className="btn icon-set"><i className="fa fa-list"></i></button>
                <button className="btn icon-set"><i className="fa fa-list-ol"></i></button>
                <button className="btn icon-set"><i className="fa fa-image"></i></button>
            </div>
            <div className="editor-btns">
                {/* <!-- <button className="btn icon-set"><i className="fa-solid fa-ellipsis"></i></button> --> */}
                
                <button className="btn icon-set btns-rht"><i className="fa-solid fa-rotate-left"></i></button>
                <button className="btn icon-set btns-rht cl-g"><i className="fa-solid fa-shield"></i></button>
                <button className="btn icon-set btns-info btns-rht"><i className="fa-solid fa-circle-info"></i></button>
            </div>
        </div>
        
        <section id="mainTextArea">
            
            <div name="text" className="main-text-area" id="" onChange={hendleOnChange} dangerouslySetInnerHTML={{ __html: editorstate  }}></div>
        </section>
        
    </main>

        </>
    )
}
export default Simplepage;
