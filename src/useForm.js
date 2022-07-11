import { useState, useEffect } from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const useForm = (callback, validate, name, step, fldOnChange) => {

	const [values, setValues] = useState({});
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [textCount, setTextCount] = useState(0);

	useEffect(() => {
		if (Object.keys(errors).length === 0 && isSubmitting) 
		{
			callback();
		}
		if(Object.keys(errors).length > 0)
		{   console.log(errors);
			NotificationManager.error('','Please fill in all the required fields');
		}		
	}, [errors]);

	const handleSubmit = (event) => {
		if (event) event.preventDefault();		
		setErrors(validate(values,name,step));
		setIsSubmitting(true);
		// if(validate(values,name,step).email === "Email address is required")
		// {
		// 	return(
		// 		NotificationManager.error('','Email address is required')
		// 	);
		// }
		// if(validate(values,name,step).password === "Password is required")
		// {
		// 	return(
		// 		NotificationManager.error('','Password is required')
		// 	);
		// }
	};

	const handleChange = (event) => {
		event.persist();
		if(event.target.type === 'checkbox'){
			//console.log(event.target.checked);
			setValues(values => ({ ...values, [event.target.name]: event.target.checked }));
		}else{			
			if(event.target.name === 'content_long' && event.target.value.split('').length > 600)
			{
				setTextCount(values => ({ ...values, [event.target.name]: 600 }));
				setValues(values => ({ ...values }));
				NotificationManager.error('','Sorry! can not exceed more than 600 words.');
			}
			else
			{
				setValues(values => ({ ...values, [event.target.name]: event.target.value }));
				setTextCount(values => ({ ...values, [event.target.name]: event.target.value.split('').length}));
			}

			if(event.target.name === 'travel_purpose'){
				fldOnChange(event.target.value);
			}
		}
	};

	return {
		handleChange,
		handleSubmit,
		values,
		textCount,
		errors,
	}
};

export default useForm;