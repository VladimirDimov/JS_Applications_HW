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
				var currentUser = services.user.getCurrent();

				$.ajax(url, {
					type: 'GET',
					contentType: 'json',
					headers: {
						'x-auth-key': currentUser.authKey
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

	var cookies = (function () {
		function getAll() {
			var currentUser = services.user.getCurrent();

			var promise = new Promise(function (resolve, reject) {
				var url = 'api/cookies';
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

		function share(cookie) {
			var currentUser = services.user.getCurrent();

			var promise = new Promise(function (resolve, reject) {
				var url = 'api/cookies';
				$.ajax(url, {
					type: 'POST',
					contentType: 'application/json',
					data: JSON.stringify(cookie),
					headers: {
						'x-auth-key': currentUser.authKey
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

		function vote(id, voteType) {
			var currentUser = services.user.getCurrent();

			var promise = new Promise(function (resolve, reject) {
				var url = 'api/cookies/' + id;
				var dataOfRequest = {
					type: voteType
				};

				$.ajax(url, {
					type: 'PUT',
					contentType: 'application/json',
					data: JSON.stringify(dataOfRequest),
					headers: {
						'x-auth-key': currentUser.authKey
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

		function getFortune() {
			var currentUser = services.user.getCurrent();

			var promise = new Promise(function (resolve, reject) {
				var url = 'api/my-cookie';
				$.ajax(url, {
					type: 'GET',
					contentType: 'application/json',
					headers: {
						'x-auth-key': currentUser.authKey
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

		return {
			getAll: getAll,
			share: share,
			vote: vote,
			getFortune: getFortune
		}
	} ());

	return {
		user: user,
		cookies: cookies
	}
})();