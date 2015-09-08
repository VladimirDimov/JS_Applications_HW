var services = (function() {
	var user = {
		register: function(user) {
			var promise = new Promise(function(resolve, reject) {
				var url = 'user';
				$.ajax(url, {
					type: 'POST',
					contentType: 'application/json',
					data: JSON.stringify(user),
					success: function(res) {
						toastr['success']('User registered');
						resolve(res);
					},
					error: function(err) {
						toastr['error']('User not registered. ' + err.textMessage);
						reject(err);
					}
				});
			});

			return promise;
		},

		login: function(user) {
			var promise = new Promise(function(resolve, reject) {
				var url = 'auth';
				$.ajax(url, {
					type: 'POST',
					contentType: 'application/json',
					data: JSON.stringify(user),
					success: function(res) {
						toastr['success']('User logged in.');
						resolve(res);
					},
					error: function(err) {
						toastr['error']('User could not login. ' + err.textMessage);
						reject(err);
					}
				});
			});

			return promise;
		},

		setCurrentUser(user) {
			localStorage.setItem('CURRENT_USER', JSON.stringify(user));
		},

		getCurentUser() {
			return JSON.parse(localStorage.getItem('CURRENT_USER'));
		}
	};

	var posts = {
		add: function(post) {
			var currentUser = services.user.getCurentUser();

			var promise = new Promise(function(resolve, reject) {
				$.ajax('post', {
					method: 'POST',
					contentType: 'application/json',
					data: JSON.stringify(post),
					headers: {
						'X-SessionKey': currentUser.sessionKey
					},
					success: function(res) {
						toastr['success']('Post created!');
						resolve(res);
					},
					error: function(err) {
						toastr['error']('Could not create new post. ' + err.textMessage);
						reject(err);
					}
				});
			});

			return promise;
		},

		get: function(byUser, byPattern) {
			var url = 'post';
			var filterParameters = [];
			if (byUser) {
				filterParameters.push('user=' + byUser);
			} 

			if (byPattern) {
				filterParameters.push('pattern=' + byPattern);
			}

			if (filterParameters.length > 0) {
				url += '?' + filterParameters.join('&');
			};

			var promise = new Promise(function(resolve, reject) {
				$.ajax(url, {
					method: 'GET',
					contentType: 'json',
					success: function(res) {
						resolve(res);
					},
					error: function(err) {
						toastr['error']('Error loading posts');
						reject(err);
					}
				})
			});

			return promise;
		}
	}

	return {
		user: user,
		posts: posts
	}
}());