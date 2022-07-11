import React from 'react';
//import Input from './input';

export default function Step1(props) {
	
	function handleChange(event) {
        // Here, we invoke the callback with the new value
		//console.log(event.target.type);
		props.onChange(event);
		
    }
	
	return (
	<>
	
		<div className="step-count pb-2">Step 1 of 3</div>
		<div className="log-box-set">
			<div className="row">
				<div className="col-md-9"><div className="step-heading">Describe the content you want to create*</div></div>
				<div className="col-md-3 text-right"><div className="letter-count">{props.textCount.content_long ? props.textCount.content_long : 0}/600</div></div>
			</div>
			<div className="form-group mb-3 mt-2">                            
				<textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="content_long" onChange={handleChange} value={props.values.content_long || ''} ></textarea>
				{props.errors.content_long && ( <p className="help text-danger">{props.errors.content_long}</p> )}
			</div>
		</div>
                    
		<div className="log-box-set">
			<div className="row">
				<div className="col-md-9"><div className="step-heading">Keyword (Optional) <i className="fa fa-question-circle" aria-hidden="true"></i></div></div>
				<div className="col-md-3 text-right"><div className="letter-count">0/3</div></div>
			</div>
			<div className="form-group mb-3 mt-2">                            
				<textarea className="form-control" id="exampleFormControlTextarea1" rows="1" name="keyword" onChange={handleChange} value={props.values.keyword || ''} disabled={(props.active > 1) ? true : false }></textarea>
				{props.errors.keyword && ( <p className="help text-danger">{props.errors.keyword}</p> )}
			</div>
		</div>
	
	</>
	)
}