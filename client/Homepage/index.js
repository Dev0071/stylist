/**
 * show different sections of the app based on the button clicked
 */
console.log('index.js');


// Get references to the buttons and their corresponding content sections
const buttons = document.querySelectorAll(
	'.home, .explore, .notifications, .bookmarks, .settings, .fashion-tips',
);

// Function to toggle the active state of buttons and show/hide content
function toggleSection(event) {
	const target = event.currentTarget;

	// Remove the "active" class from all buttons
	buttons.forEach(button => button.classList.remove('active'));

	// Add the "active" class to the clicked button
	target.classList.add('active');

	// You can define the corresponding content sections here and toggle their visibility
	// Example:
	// const section = document.querySelector('.your-section-class');
	// section.style.display = 'block'; // Show the section
}

// Add click event listeners to all buttons
buttons.forEach(button => button.addEventListener('click', toggleSection));

// Initially, click the default button (e.g., "Home")
document.querySelectorAll('.home').forEach(homeButton => homeButton.click());

