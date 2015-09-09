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
				var url = 'api/users';

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
	}

	return {
		user: user
	}
})();