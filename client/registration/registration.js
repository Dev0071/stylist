// changes the sign in and sign up forms
const base_url = 'http://localhost:5000/api/v1';
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
console.log(signIn);

// forms validation

const signUpName = document.querySelector('#sign-up-name');
const signUpEmail = document.querySelector('#sign-up-email');
const signUpPassword = document.querySelector('#sign-up-password');
const logInEmail = document.querySelector('#sign-in-email');
const logInPassword = document.querySelector('#sign-in-password');
const errorDiv = document.querySelector('.sign-up-error');
console.log(errorDiv.textContent);


const validateSignUp = () => {
	if (signUpName.value === '') {
		errorDiv.style.display = 'block';
		errorDiv.textContent = 'Please fill in your name';
		signUpName.parentElement.style.borderBottom = '3px solid red';
		return;
	}
	if (signUpEmail.value === '') {
		errorDiv.style.display = 'block';
		errorDiv.textContent = 'Please fill in your email address';
		signUpEmail.parentElement.style.borderBottom = '3px solid red';
		return;
	}
	if (signUpPassword.value === '') {
		errorDiv.style.display = 'block';
		errorDiv.textContent = 'Please fill in your password';
		signUpPassword.parentElement.style.borderBottom = '3px solid red';
		return;
	}
	if (!isEmailValid(signUpEmail.value)) {
		errorDiv.style.display = 'block';
		errorDiv.textContent = 'Please fill in a valid email address';
		signUpEmail.parentElement.style.borderBottom = '3px solid red';
		return;
	} else {
		registerUser();
	}
};

// function to register a user

const registerUser = async () => {
	try {
		const email = signUpEmail.value;
		const password = signUpPassword.value;
		const username = signUpName.value;
		const user = { email, password, username };
		const response = await fetch(`${base_url}/users/register`, {
			method: 'POST',
			body: JSON.stringify(user),
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			const responseData = await response.json();
			console.log(responseData);
			// window.location.replace('/dashboard');
		}

	} catch (error) {
		console.log(error);
	}
};

// check if the email is valid
const isEmailValid = email => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};
