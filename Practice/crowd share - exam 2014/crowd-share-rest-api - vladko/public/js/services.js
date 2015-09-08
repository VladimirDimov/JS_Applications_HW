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

		setCurrentUser(user) {
			localStorage.setItem('CURRENT_USER', JSON.stringify(user));
		}
	};

	return {
		user: user
	}
} ());