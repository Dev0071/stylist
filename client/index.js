/**
 * show different sections of the app based on the button clicked
 */
console.log('index.js');

const homeButton = document.querySelector('.home');
const exploreButton = document.querySelector('.explore');
const notificationsButton = document.querySelector('.notifications');
const bookmarksButton = document.querySelector('.bookmarks');
const settingsButton = document.querySelector('.settings');
const fashionTipsButton = document.querySelector('.fashion-tips');
console.log(homeButton);

homeButton.addEventListener('click', function () {
	// hideAllSections();
	// feedSection.style.display = 'block';
	homeButton.classList.add('active');
	exploreButton.classList.remove('active');
	notificationsButton.classList.remove('active');
	bookmarksButton.classList.remove('active');
	settingsButton.classList.remove('active');
	fashionTipsButton.classList.remove('active');
});

exploreButton.addEventListener('click', function () {
	// hideAllSections();
	// exploreSection.style.display = 'block';
	homeButton.classList.remove('active');
	exploreButton.classList.add('active');
	notificationsButton.classList.remove('active');
	bookmarksButton.classList.remove('active');
	settingsButton.classList.remove('active');
	fashionTipsButton.classList.remove('active');
});

notificationsButton.addEventListener('click', function () {
	// hideAllSections();
	// notificationsSection.style.display = 'block';
	homeButton.classList.remove('active');
	exploreButton.classList.remove('active');
	notificationsButton.classList.add('active');
	bookmarksButton.classList.remove('active');
	settingsButton.classList.remove('active');
	fashionTipsButton.classList.remove('active');
});

bookmarksButton.addEventListener('click', function () {
	// hideAllSections();
	// wardrobeSection.style.display = 'block';
	homeButton.classList.remove('active');
	exploreButton.classList.remove('active');
	notificationsButton.classList.remove('active');
	bookmarksButton.classList.add('active');
	settingsButton.classList.remove('active');
	fashionTipsButton.classList.remove('active');
});

settingsButton.addEventListener('click', function () {
	// hideAllSections();
	// settingsSection.style.display = 'block';
	homeButton.classList.remove('active');
	exploreButton.classList.remove('active');
	notificationsButton.classList.remove('active');
	bookmarksButton.classList.remove('active');
	settingsButton.classList.add('active');
	fashionTipsButton.classList.remove('active');
});

fashionTipsButton.addEventListener('click', function () {
	// hideAllSections();
	// fashionTipsSection.style.display = 'block';
	homeButton.classList.remove('active');
	exploreButton.classList.remove('active');
	notificationsButton.classList.remove('active');
	bookmarksButton.classList.remove('active');
	settingsButton.classList.remove('active');
	fashionTipsButton.classList.add('active');
});

homeButton.click();
