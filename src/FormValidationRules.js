export default function validate(values,callback,step) {
	let errors = {};
	//console.log(step);
	if(callback === "login"){
		if (!values.email) {
			errors.email = 'Email address is required';
		} else if (!/\S+@\S+\.\S+/.test(values.email)) {
			errors.email = 'Email address is invalid';
		}
		//password validations
		if (!values.password) {
			errors.password = 'Password is required';
		} else if (values.password.length < 6) {
			errors.password = 'Password must be 6 or more characters';
		}
	}else if(callback === "register"){
		if (!values.firstname) {
			errors.firstname = 'First name is required';
		}else if(!isNaN(values.firstname)){
			errors.firstname = 'First Name should be string type.';
		}else if(values.firstname.length < 3){
			errors.firstname = 'Atleast 3 characters required.';
		}else if(values.firstname.length > 32){
			errors.firstname = 'Atmost 32 characters allowed.';
		}
		if (!values.lastname) {
			errors.lastname = 'Last name is required';
		}else if(!isNaN(values.lastname)){
			errors.lastname = 'Last Name should be string type.';
		}else if(values.lastname.length < 3){
			errors.lastname = 'Atleast 3 characters required.';
		}else if(values.lastname.length > 32){
			errors.lastname = 'Atmost 32 characters allowed.';
		}
		
		if (!values.email) {
			errors.email = 'Email address is required';
		} else if (!/\S+@\S+\.\S+/.test(values.email)) {
			errors.email = 'Email address is invalid';
		}
		//password validations
		if (!values.password) {
			errors.password = 'Password is required';
		} else if (values.password.length < 6) {
			errors.password = 'Password must be 6 or more characters';
		}
		/*if (!values.confirmPassword) {
			errors.confirmPassword = 'Password is required';
		} else if (values.password !== values.confirmPassword) {
			errors.confirmPassword = 'Password and confirm password should be same.';
		}*/
	}else if(callback === "create"){
		if (!values.content_long) {
			errors.content_long = 'Please enter a description';
		} else if (values.content_long.length > 600) {
			errors.content_long = 'Description cannot be more than 600 characters';
		}
		
		if (!values.keyword) {
			errors.keyword = 'Please enter keyword';
		} else if (values.keyword.length > 3) {
			errors.keyword = 'Keyword must be 3 character long';
		}
		else if (values.keyword.length < 3) {
			errors.keyword = 'Keyword must be 3 character long';
		}
		
		if (!values.title) {
			errors.title = 'Please enter the title';
		} 
		
		if (!values.paragraph) {
			errors.paragraph = 'Please enter Intro paragraph';
		} else if (values.content_long.length > 600) {
			errors.paragraph = 'Intro paragraph cannot be more than 600 characters';
		}
	}
	
	return errors;
};