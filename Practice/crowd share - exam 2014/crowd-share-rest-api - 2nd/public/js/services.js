var services = (function () {
	var user = {
		register: function (user) {
			var promise = new Promise(function (resolve, reject) {
				var url = 'user';

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
				var url = 'auth';

				$.ajax(url, {
					method: 'POST',
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

		logout: function (user) {
			var promise = new Promise(function (resolve, reject) {
				var url = 'user';
				$.ajax(url, {
					type: 'PUT',
					contentType: 'text',
					data: 'true',
					headers: {
						'X-SessionKey': user.sessionKey
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
		},

		getCurrent: function () {
			var currentUser = localStorage.getItem('CURRENT_USER');
			if (currentUser) {
				return JSON.parse(currentUser);
			}
		},

		setCurrent: function (user) {
			localStorage.setItem('CURRENT_USER', JSON.stringify(user));
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
		}
	};

	var posts = function () {
		function getAll() {
			var promise = new Promise(function (resolve, reject) {
				var url = 'post';
				$.ajax(url, {
					type: 'GET',
					contentType: 'application/json',
					data: JSON.stringify(),
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

		function add(post) {
			var promise = new Promise(function (resolve, reject) {
				var url = 'post';
				$.ajax(url, {
					type: 'POST',
					contentType: 'application/json',
					data: JSON.stringify(post),
					headers: {
						'X-SessionKey': services.user.getCurrent().sessionKey
					},
					success: function (res) {
						resolve(res);
					},
					error: function (err) {
						reject(err);
					}
				});
			});

			return promise
		}

		var getFiltered = function (byUsername, byPattern) {
			var url = 'post';
			var parameters = [];

			if (byUsername) {
				parameters.push('user=' + byUsername);
			}

			if (byPattern) {
				parameters.push('pattern=' + byPattern);
			}

			if (parameters.length > 0) {
				url += '?';
				url += parameters.join('&');
			}

			var promise = new Promise(function (resolve, reject) {
				$.ajax(url, {
					type: 'GET',
					contentType: 'application/json',
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

		return {
			getAll: getAll,
			add: add,
			getFiltered: getFiltered
		}
	}

	return {
		user: user,
		posts: posts(),
	}
})();