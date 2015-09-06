var services = (function () {
	var user = {
		register: function (user) {
			var promise = new Promise(function (resolve, reject) {
				var url = 'api/users';

				$.ajax(url, {
					type: 'POST',
					contentType: 'application/json',
					data: JSON.stringify(user),
					success: function (res) {
						resolve(res);
					},
					error: function (err) {
						reject(err);
					}
				});
			});

			return promise;
		},

		login: function (user) {
			var promise = new Promise(function (resolve, reject) {
				var url = 'api/auth';

				$.ajax(url, {
					method: 'PUT',
					contentType: 'application/json',
					data: JSON.stringify(user),
					success: function (res) {
						resolve(res);
					},
					error: function (err) {
						console.log(err.textMessage);
						reject(err);
					}
				});
			});

			return promise;
		},

		getAll: function () {
			var promise = new Promise(function (resolve, reject) {
				var url = 'api/users';

				$.ajax(url, {
					type: 'GET',
					contentType: 'json',
					success: function (res) {
						resolve(res);
					},
					error: function (err) {
						reject(err);
					}
				});
			});

			return promise;
		},

		getCurrent: function () {
			var currentUser = localStorage.getItem('CURRENT_USER');
			if (currentUser) {
				return JSON.parse(currentUser);
			}
		}
	}

	var threads = {
		getAll: function () {
			var url = 'api/threads';
			var promise = new Promise(function (resolve, reject) {
				$.ajax(url, {
					type: 'GET',
					contentType: 'json',
					success: function (res) {
						resolve(res);
					},
					error: function (err) {
						reject(err);
					}
				})
			});

			return promise;
		},

		add: function (title) {
			var currentUser = getCurrentUser();

			var promise = new Promise(function (resolve, reject) {
				var url = 'api/threads';
				$.ajax(url, {
					method: 'POST',
					contentType: 'application/json',
					data: JSON.stringify({
						title: title
					}),
					headers: {
						'x-authKey': currentUser.authKey
					},
					success: function (res) {
						resolve(res);
					},
					error: function (err) {
						reject(err);
					}
				})
			});

			return promise;
		},

		getSelectedId: function () {
			return localStorage.getItem('SELECTED_THREAD_ID');
		},

		setSelectedId: function (id) {
			localStorage.setItem('SELECTED_THREAD_ID', id);
		},

		getThreadById: function (id) {
			var url = 'api/threads/' + id;

			var promise = new Promise(function (resolve, reject) {
				$.ajax(url, {
					method: 'GET',
					contentType: 'json',
					success: function (res) {
						resolve(res);
					},
					error: function (err) {
						reject(err);
					}
				});
			});

			return promise;
		},

		messages: {
			add: function (message) {
				var threadId = services.threads.getSelectedId();
				var url = 'api/threads/' + threadId + '/messages';

				var promise = new Promise(function (resolve, reject) {
					$.ajax(url, {
						method: 'POST',
						contentType: 'application/json',
						data: JSON.stringify({message}),
						headers: {
							'x-authKey': services.user.getCurrent().authKey
						},
						success: function (res) {
							resolve(res);
						},
						error: function (err) {
							reject(err);
						}
					});
				});
				
				return promise;
			}
		}
	}

	function getCurrentUser() {
		return JSON.parse(localStorage.getItem('CURRENT_USER'));
	}


	return {
		user: user,
		threads: threads
	}
})();