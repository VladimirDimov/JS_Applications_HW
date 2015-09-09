loginControler = (function () {
	return {
		loginOrRegister: function (context) {
			templates.get('login')
				.then(function (template) {
					context.$element().html(template());
					
					$('#btn-register').on('click', function() {
						var user = {
							username: $('#tb-username').val(),
							passHash: CryptoJS.SHA1($('#tb-password').val()).toString()
						}
						
						services.user.register(user)
							.then(function(res) {
								toastr.success('User successfully registered');
								context.redirect('#/');
							})
							.catch(function(err) {
								toastr.error('Unsuccessful registration!\n' + err.responseText);
							});
					});
					
					$('#btn-login').on('click', function() {
						var user = {
							username: $('#tb-username').val(),
							passHash: CryptoJS.SHA1($('#tb-password').val()).toString()
						}
						
						services.user.login(user)
							.then(function(res) {
								toastr.success('User successfully logged in!');
								services.user.setCurrent(res.result);
								context.redirect('#/');
							})
							.catch(function(err) {
								toastr.error('Unsuccessful login!\n' + err.responseText);
							});
					});
				})
		}
	}
} ());