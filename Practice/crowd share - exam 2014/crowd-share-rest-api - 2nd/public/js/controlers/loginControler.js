loginControler = (function () {
	return {
		loginOrRegister: function (context) {
			templates.get('login')
				.then(function (template) {
					context.$element().html(template());
					
					$('#btn-register').on('click', function() {
						var user = {
							username: $('#tb-username').val(),
							authCode: CryptoJS.SHA1($('#tb-password').val()).toString()
						}
						
						validator.validateStringLength(user.username, 6, 40, 'username');
						
						services.user.register(user)
							.then(function(res) {
								toastr.success('User successfully registered');
								context.redirect('#/');
							})
							.catch(function(err) {
								toastr.error('Unsuccessful registration!\n' + errorControler.formatError(err));
							});
					});
					
					$('#btn-login').on('click', function() {
						var user = {
							username: $('#tb-username').val(),
							authCode: CryptoJS.SHA1($('#tb-password').val()).toString()
						}
						
						services.user.login(user)
							.then(function(res) {
								services.user.setCurrent(res);
								toastr.success('User successfully logged in!');
								context.redirect('#/');
							})
							.catch(function(err) {
								toastr.error('Unsuccessful login!\n' + errorControler.formatError(err));
							});
					});
				})
		}
	}
} ());