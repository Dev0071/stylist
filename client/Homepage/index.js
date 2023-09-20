/**
 * show different sections of the app based on the button clicked
 */
const baseUrl = 'http://localhost:5000/api/v1';
const mainContainer = document.querySelector('.main-container');
const postsContainer = document.querySelector('.feed-posts');
const errorP = document.querySelector('.errorupdate');

//GET user from local storage
const currentUser = JSON.parse(localStorage.getItem('user'));
const { userId, username } = currentUser;
const token = JSON.parse(localStorage.getItem('token'));

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

	// if (sectionId === 'home') {
	// 	mainContainer.innerHTML = '';
	// 	getPosts();
	// }
	// if (sectionId === 'explore') {
	// 	mainContainer.innerHTML = '';
	// 	getExplorePosts();
	// }
	// if (sectionId === 'notifications') {
	// 	mainContainer.innerHTML = '';
	// 	getNotifications();
	// }
	// if (sectionId === 'bookmarks') {
	// 	mainContainer.innerHTML = '';
	// 	getBookmarks();
	// }
	// if (sectionId === 'settings') {
	// 	mainContainer.innerHTML = '';
	// 	getSettings();
	// }
	// if (sectionId === 'fashion-tips') {
	// 	mainContainer.innerHTML = '';
	// 	getFashionTips();
	// }
}

const getPosts = async () => {
	postsContainer.innerHTML = '';
	try {
		const response = await fetch(`${baseUrl}/posts/`);
		const data = await response.json();
		const posts = data.posts;

		posts.forEach(async post => {
			const user = await getUser(post.whoPostedId);
			const time = timePassed(new Date(post.createdAt));
			const likesCount = await getPostLikes(post.postId);
			const postHtml = `  
			 <div id="post" data-postId ='${post.postId}' >
                            <div class="user-info">
							<div class="user" data-userId ='${post.whoPostedId}'>
                                    <div class="user-avatar-container">
                                        <img class="post-avatar"
                                            src='${
																							user.userimage ??
																							'https://www.pngitem.com/pimgs/m/272-2720656_user-profile-dummy-hd-png-download.png'
																						}'alt="">
                                    </div>
                                    <div class="user-name">
                                        <p>${user.username}</p>
                                        <p>${time}</p>
                                    </div>
                                </div>
                                <div class="post-options">
                                    <i class="material-icons-outlined">more_vert</i>
                                </div>
                            </div>
                            <div class="post-content">
							${
								post.media
									? ` <div class="post-media">
                                    <img src=${post.media}
                                        alt="">
                                </div>`
									: ''
							}
                               
                                <p>${post.details}
                                 
                                </p>
                            </div>
                            <div class="post-reactions">
                                <div class="reactions">
                                    <div class="reaction" onclick="likePost('${
																			post.postId
																		}', '${userId}', '${token}')">
                                        <i class="material-icons-outlined">thumb_up</i>
                                        <span class="reaction-counter" id='likes-count-${
																					post.postId
																				}'>${likesCount == 0 ? '' : likesCount}</span>
                                    </div>
                                    <div class="reaction" onclick="getPostComments('${
																			post.postId
																		}')">
                                        <i class="material-icons-outlined">comment</i>
                                        <span class="reaction-counter"></span>
                                    </div>
                                    <div class="reaction">
                                        <i class="material-icons-outlined">share</i>
                                        <span class="reaction-counter">0</span>
                                    </div>
                                </div>
                                <div class="save-post" onClick="savePost('${
																	post.postId
																}', '${userId}', '${token}')">
                                    <i class="material-icons-outlined">bookmark</i>
                                </div>
                            </div>
                        </div>
						<div class="comments-container" id='comments-container-${post.postId}'>
						 <div class="add-comment">
                                <input type="text" class='comment-input' placeholder="comment">
                                <button  class="comment-btn">Post</button>
                            </div>
                            <div class="comments" id = 'comments-${post.postId}'>
                                <div class="comment">
                                    <div class="user">
                                        <div class="user-avatar-container">
                                            <img class="comment-avatar"
                                                src="https://www.pngitem.com/pimgs/m/272-2720656_user-profile-dummy-hd-png-download.png" alt="">
                                        </div>
                                        <div class="user-name">
                                            <p>John Doe</p>
                                            <div class="comment-details">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, modi.</div>
                                        </div>
                                    </div>
                                 
                                    
                                </div>
                            </div></div>`;
			postsContainer.innerHTML += postHtml;
		});
	} catch (error) {
		console.log(error);
	}
};
// Add click event listeners to all buttons
buttons.forEach(button => button.addEventListener('click', toggleSection));

// Initially, click the default button (e.g., "Home")
document.querySelectorAll('.home').forEach(homeButton => homeButton.click(), getPosts());

const getUser = async userId => {
	try {
		const response = await fetch(`${baseUrl}/users/${userId}`);
		const data = await response.json();
		const user = data.User;
		return user;
	} catch (error) {
		console.log(error);
	}
};

const timePassed = date => {
	const now = new Date();
	const diff = Math.abs(now - date);
	const days = Math.floor(diff / (1000 * 60 * 60 * 24));
	const hours = Math.floor(diff / (1000 * 60 * 60));
	const minutes = Math.floor(diff / (1000 * 60));
	const seconds = Math.floor(diff / 1000);
	if (days > 0) {
		return `${days} days ago`;
	} else if (hours > 0) {
		return `${hours} hours ago`;
	} else if (minutes > 0) {
		return `${minutes} minutes ago`;
	} else {
		return `${seconds} seconds ago`;
	}
};

const savePost = async (postId, userId, token) => {
	try {
		const response = await fetch(`${baseUrl}/posts/save`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ postId, userId }),
		});

		if (response.ok) {
			errorP.style.display = 'block';
			errorP.textContent = 'Post saved successfully';
			errorP.style.backgroundColor = 'green';
			setTimeout(() => {
				clearError();
			}, 2000);
		} else {
			errorP.style.display = 'block';
			errorP.textContent = 'please login to save post';
			errorP.style.backgroundColor = 'red';
			setTimeout(() => {
				clearError();
			}, 2000);
		}
	} catch (error) {
		console.log(error);
		console.log('error saving post');
	}
};

// clear error message
const clearError = () => {
	errorP.style.display = 'none';
};

const likePost = async (postId, userId, token) => {
	try {
		const response = await fetch(`${baseUrl}/posts/like`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ postId, userId }),
		});

		if (response.ok) {
			const responseData = await response.json();
			errorP.style.display = 'block';
			errorP.textContent = responseData.message;
			errorP.style.backgroundColor = 'green';
			setTimeout(() => {
				clearError();
			}, 2000);

			const likesCount = await getPostLikes(postId);
			const likesCountSpan = document.querySelector(`#likes-count-${postId}`);
			likesCountSpan.textContent = likesCount ? likesCount : '';
		} else {
			errorP.style.display = 'block';
			errorP.textContent = 'please login to like a post';
			errorP.style.backgroundColor = 'red';
			setTimeout(() => {
				clearError();
			}, 2000);
		}
	} catch (error) {}
};

const getPostLikes = async postId => {
	try {
		const response = await fetch(`${baseUrl}/posts/likesCount`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ postId }),
		});

		if (response.ok) {
			const responseData = await response.json();
			return responseData.likesCount;
		} else {
			console.log('error getting likes');
		}
	} catch (error) {
		console.log(error);
	}
};

const getPostComments = async postId => {
	const commentsContainer = document.querySelector(`#comments-container-${postId}`);
	commentsContainer.classList.toggle('show-comments');
	const commentsCo = document.querySelector(`#comments-${postId}`);
	commentsCo.innerHTML = '';
	try {
		const response = await fetch(`${baseUrl}/comments/${postId}`);
		const data = await response.json();
		console.log(data);
	
		if(data.length > 0){
			data.forEach(async comment => {
				const user = await getUser(comment.whoCommentedId);
				const commentHtml = ` <div class="comment">
									<div class="user">
										<div class="user-avatar-container">
											<img class="comment-avatar"
												src="https://www.pngitem.com/pimgs/m/272-2720656_user-profile-dummy-hd-png-download.png" alt="">
										</div>
										<div class="user-name">
											<p>${user.username}</p>
											<div class="comment-details">${comment.commentDetails}</div>
										</div>
									</div>
									<div class="comment-options">
										<i class="material-icons-outlined">more_vert</i>
									</div>
								</div>`;
				commentsCo.innerHTML += commentHtml;
			});
		} else {
			commentsCo.innerHTML = 'No comments yet';
		}
	} catch (error) {
		console.log(error);
	}
};
