/**
 * show different sections of the app based on the button clicked
 */

const mainContainer = document.querySelector('.main-container');


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
	// mainContainer.innerHTML = '';


	// Determine the corresponding content section based on the clicked button
	const sectionId = target.getAttribute('data-sectionId'); 
	const sections = document.querySelectorAll('.section'); 
	// Hide all content sections
	sections.forEach(section => (section.style.display = 'none'));

	// Show the corresponding content section
	const sectionToShow = document.querySelector(`#${sectionId}`);
	if (sectionToShow) {
		sectionToShow.style.display = 'block';

	}
}

// Add click event listeners to all buttons
buttons.forEach(button => button.addEventListener('click', toggleSection));

// Initially, click the default button (e.g., "Home")
document.querySelectorAll('.home').forEach(homeButton => homeButton.click());
