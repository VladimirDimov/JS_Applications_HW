var data = (function () {
	var users = {
		register: function (user) {
			var promise = new Promise(function (resolve, reject) {
				$.ajax({
					url: 'api/users',
					type: 'POST',
					data: JSON.stringify(user),
					contentType: 'application/json',
					success: function (res) {
						resolve(res);
						userLocalStorageInfoUpdate(res);
					},
					error: function (error) {
						reject(error);
					}
				});
			});

			return promise;
		},

		login: function (user) {
			var promise = new Promise(function (resolve, reject) {
				$.ajax({
					url: 'api/auth',
					type: 'PUT',
					data: JSON.stringify(user),
					contentType: 'application/json',
					success: function (res) {
						userLocalStorageInfoUpdate(res);
						resolve(res);
					},
					error: function (error) {
						reject(error);
					}
				});
			});

			return promise;
		},

		logout: function (user) {
			var promise = new Promise(function (resolve, reject) {
				localStorage.removeItem('CURRENT_USERNAME');
				localStorage.removeItem('CURRENT_AUTH_KEY');
				resolve();
			});

			return promise;
		},

		find: function () {

		}
	}

	function userLocalStorageInfoUpdate(userObj) {
		if (!userObj.username || !userObj.authKey) {
			throw new Error('User info cannot be stored in local storage.');
		}

		localStorage.setItem('CURRENT_USERNAME', userObj.username);
		localStorage.setItem('CURRENT_AUTH_KEY', userObj.authKey);
	}

	var threads = {
		get: function () {
			var promise = new Promise(function (resolve, reject) {
				$.getJSON('api/threads', function (res) {
					resolve(res);
				});
			});

			return promise;
		},

		add: function (threadToAdd) {
			var promise = new Promise(function (resolve, reject) {
				$.ajax('api/threads', {
					method: 'POST',
					data: JSON.stringify(threadToAdd),
					contentType: 'application/json',
					headers: {
						'x-authKey': localStorage.getItem('CURRENT_AUTH_KEY')
					},
					success: function (res) {
						resolve(res);
					}
				})
			});
			
			return promise;
		},

		getById: function () {

		}
	}

	return {
		users: users,
		threads: threads
	}
} ());