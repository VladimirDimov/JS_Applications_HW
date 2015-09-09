loginControler = (function () {
	return {
		login: function (context) {
			templates.get('login')
				.then(function (template) {
					helpers.loadContent(template());
					
					$('#btn-register').on('click', function() {
						var user = {
							username: $('#tb-username').val(),
							passHash: CryptoJS.SHA1($('#tb-password').val()).toString()
						}
						
						services.user.register(user)
							.then(function(res) {
								toastr.success('User registered');
							})
							.catch(function(err) {
								toastr.error('Unsuccessful registration')
							});
					});
					
					$('#btn-login').on('click', function() {
						var user = {
							username: $('#tb-username').val(),
							passHash: CryptoJS.SHA1($('#tb-password').val()).toString()
						}
						
						services.user.login(user)
							.then(function(res) {
								toastr.success('User logged in');
							})
							.catch(function(err) {
								toastr.error('Unsuccessful login')
							});
					});
				})
		}
	}
} ());