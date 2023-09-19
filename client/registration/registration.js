// changes the sign in and sign up forms
const base_url = 'http://localhost:5000';
const base_url2 = 'http://127.0.0.1:5500';
const sign_in_btn = document.querySelector('#sign-in-btn');
const sign_up_btn = document.querySelector('#sign-up-btn');
const container = document.querySelector('.container');

sign_up_btn.addEventListener('click', () => {
	container.classList.add('sign-up-mode');
});

sign_in_btn.addEventListener('click', () => {
	container.classList.remove('sign-up-mode');
});

// register a user

const signUp = document.querySelector('#signUpbtn');
signUp.addEventListener('click', () => {
	validateSignUp();
});
// sign in a user

const signIn = document.querySelector('#logInbtn');
signIn.addEventListener('click', () => {
	validateLogIn();
});
// forms validation

const signUpName = document.querySelector('#sign-up-name');
const signUpEmail = document.querySelector('#sign-up-email');
const signUpPassword = document.querySelector('#sign-up-password');
const logInEmail = document.querySelector('#sign-in-email');
const logInPassword = document.querySelector('#sign-in-password');
const errorDiv = document.querySelector('.sign-up-error');
const errorDiv2 = document.querySelector('.sign-in-error');

const validateSignUp = () => {
	inputValidator(signUpEmail);
	inputValidator(signUpName);
	inputValidator(signUpPassword);
	if (
		isUsernameValid(signUpName.value) &&
		isEmailValid(signUpEmail.value) &&
		isPasswordValid(signUpPassword.value)
	) {
		registerUser();
	}
};

signUpName.addEventListener('input', () => {
	if (!isUsernameValid(signUpName.value)) {
		errorDiv.style.display = 'block';
		errorDiv.textContent =
			' username must be at least 4 characters long and contains alphanumeric characters only';
		signUpName.parentElement.style.borderBottom = '3px solid red';
		return;
	} else {
		errorDiv.style.display = 'none';
		signUpName.parentElement.style.borderBottom = '';
	}
});

signUpEmail.addEventListener('input', () => {
	if (!isEmailValid(signUpEmail.value)) {
		errorDiv.style.display = 'block';
		errorDiv.textContent = 'Please fill in a valid email address';
		signUpEmail.parentElement.style.borderBottom = '3px solid red';
		return;
	} else {
		errorDiv.style.display = 'none';
		signUpEmail.parentElement.style.borderBottom = '';
	}
});

signUpPassword.addEventListener('input', () => {
	if (!isPasswordValid(signUpPassword.value)) {
		errorDiv.style.display = 'block';
		errorDiv.textContent =
			'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character';
		signUpPassword.parentElement.style.borderBottom = '3px solid red';
		return;
	} else {
		errorDiv.style.display = 'none';
		signUpPassword.parentElement.style.borderBottom = '';
	}
});

//input validators?
const inputValidator = input => {
	if (input.value === '') {
		errorDiv.style.display = 'block';
		errorDiv.textContent = 'Please fill in the missing field(s)';
		input.parentElement.style.borderBottom = '3px solid red';
	} else {
		errorDiv.style.display = 'none';
		input.parentElement.style.borderBottom = '';
	}
	return;
};
// check if the email is valid
const isEmailValid = email => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};
// check if the password is valid
const isPasswordValid = password => {
	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	return passwordRegex.test(password);
};
// check if the username is valid
const isUsernameValid = username => {
	const usernameRegex = /^[a-zA-Z0-9]{4,}$/;
	return usernameRegex.test(username);
};

// function to register a user

const registerUser = async () => {
	try {
		const email = signUpEmail.value;
		const password = signUpPassword.value;
		const username = signUpName.value;
		const user = { email, password, username };
		const response = await fetch(`${base_url}/api/v1/users/register`, {
			method: 'POST',
			body: JSON.stringify(user),
			headers: { 'Content-Type': 'application/json' },
		});
		if (response.ok) {
			const responseData = await response.json();
			localStorage.setItem('user', JSON.stringify(responseData.User));
			console.log(responseData.User);
			errorDiv.style.display = 'block';
			errorDiv.textContent = 'Registration successful, redirecting...';
			errorDiv.style.backgroundColor = 'green';
			setTimeout(() => {
				clearForm();
				clearError();
				window.location.href = `${base_url2}/client/Homepage/index.html`;
			}, 2000);
		} else {
			errorDiv.style.display = 'block';
			errorDiv.textContent = 'account with that email already exists, please log in';
			clearForm();
			setTimeout(() => {
				clearError();
			}, 3000);
		}
	} catch (error) {
		console.log(error);
	}
};

// login a user

const validateLogIn = () => {
	inputValidator(logInEmail);
	inputValidator(logInPassword);
	if (isEmailValid(logInEmail.value) && isPasswordValid(logInPassword.value)) {
		loginUser();
	}
};

const loginUser = async () => {
	try {
		const email = logInEmail.value;
		const password = logInPassword.value;
		const user = { email, password };
		const response = await fetch(`${base_url}/api/v1/users/login`, {
			method: 'POST',
			body: JSON.stringify(user),
			headers: { 'Content-Type': 'application/json' },
		});
		if (response.ok) {
			const responseData = await response.json();
			localStorage.setItem('user', JSON.stringify(responseData.User));
			console.log(responseData.User);
			errorDiv2.style.display = 'block';
			console.log(errorDiv2.textContent);
			errorDiv2.textContent = 'Login successful, redirecting...';
			errorDiv2.style.backgroundColor = 'green';
			setTimeout(() => {
				clearForm();
				clearError();
				window.location.href = `${base_url2}/client/Homepage/index.html`;
			}, 2000);
		} else {
			errorDiv2.style.display = 'block';
			errorDiv2.textContent = 'invalid email or password';
			clearForm();
			setTimeout(() => {
				clearError();
			}, 3000);
		}
	} catch (error) {
		console.log(error);
	}
};


// clear form fields
const clearForm = () => {
	document.forms[0].reset();
	document.forms[1].reset();
};

// clear error message
const clearError = () => {
	errorDiv.style.display = 'none';
};
