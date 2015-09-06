import 'bower_components/jquery/dist/jquery.min.js';


var services = {
	user: {
		register: function (user) {
			var promise = new Promise(function (resolve, reject) {
				var url = 'api/users'
				$.ajax(url, {
					method: 'POST',
					contentType: 'application/json',
					data: JSON.stringify(user),
					success: function (res) {
						console.log(res);
						resolve(res);
					},
					error: function (err) {
						reject(err);
					}
				})
			});

			return promise;
		},

		login: function (user) {
			var promise = new Promise(function (resolve, reject) {
				var url = 'api/auth'
				$.ajax(url, {
					method: 'PUT',
					contentType: 'application/json',
					data: JSON.stringify(user),
					success: function (res) {
						console.log(res);
						resolve(res);
					},
					error: function (err) {
						reject(err);
					}
				})
			});

			return promise;
		},
		
		setCurrent: function(user) {
			localStorage.setItem('CURRENT_USER_USERNAME', user.username);
			localStorage.setItem('CURRENT_USER_AUTHKEY', user.authKey);
		}
	}
}


export {
services
}