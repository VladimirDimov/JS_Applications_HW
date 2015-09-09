var services = (function() {
	var user = {
			register: function(user) {
				var promise = new Promise(function(resolve, reject) {
					var url = 'api/users';

					$.ajax(url, {
						type: 'POST',
						contentType: 'application/json',
						data: JSON.stringify(user),
						success: function(res) {
							resolve(res);
						},
						error: function(err) {
							reject(err);
						}
					});
				});

				return promise;
			},

			login: function(user) {
				var promise = new Promise(function(resolve, reject) {
					var url = 'api/users/auth';

					$.ajax(url, {
						method: 'PUT',
						contentType: 'application/json',
						data: JSON.stringify(user),
						success: function(res) {
							resolve(res);
						},
						error: function(err) {
							reject(err);
						}
					});
				});

				return promise;
			},

			logout: function() {
				localStorage.removeItem('CURRENT_USER');
			},

			getCurrent: function() {
				var currentUser = localStorage.getItem('CURRENT_USER');
				if (currentUser) {
					return JSON.parse(currentUser);
				}
			},

			setCurrent: function(user) {
				localStorage.setItem('CURRENT_USER', JSON.stringify(user));
			},

			getAll: function() {
				var promise = new Promise(function(resolve, reject) {
					var url = 'api/users';

					$.ajax(url, {
						type: 'GET',
						contentType: 'json',
						success: function(res) {
							resolve(res);
						},
						error: function(err) {
							reject(err);
						}
					});
				});

				return promise;
			}
		},

		todos = {
			getAll: function() {
				var promise = new Promise(function(resolve, reject) {
					var currentUser = services.user.getCurrent();
					$.ajax('api/todos', {
						method: 'GET',
						contentType: 'json',
						headers: {
							'x-auth-key': currentUser.authKey
						},
						success: function(res) {
							resolve(res);
						},
						error: function(err) {
							reject(err);
						}
					})
				});

				return promise;
			},

			add: function(todo) {
				var promise = new Promise(function(resolve, reject) {
					var user = services.user.getCurrent();

					$.ajax('api/todos', {
						method: 'POST',
						contentType: 'application/json',
						headers: {
							'x-auth-key': user.authKey
						},
						data: JSON.stringify(todo),
						success: function(res) {
							resolve(res);
						},
						error: function(err) {
							reject(err);
						}
					});
				});

				return promise;
			},

			update: function(todo) {
				var promise = new Promise(function(resolve, reject) {
					$.ajax('api/todos/' + todo.id, {
						method: 'PUT',
						contentType: 'application/json',
						data: JSON.stringify(todo),
						headers: {
							'x-auth-key': services.user.getCurrent().authKey
						},
						success: function(res) {
							resolve(res);
						},
						error: function(err) {
							reject(err);
						}
					})
				});

				return promise;
			}
		}

	return {
		user: user,
		todos: todos
	}
})();