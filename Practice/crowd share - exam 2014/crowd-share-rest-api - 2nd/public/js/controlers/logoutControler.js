var logoutControler = (function () {
	function logout(context) {
		var currentUser = services.user.getCurrent();
		services.user.logout(currentUser)
			.then(function (res) {
				localStorage.removeItem('CURRENT_USER');
				toastr.success('User ' + currentUser.username + ' logged out!');
				context.redirect('#/');
			})
			.catch(function (err) {
				toastr.error(errorControler.formatError(err));
			})
	}

	return {
		logout: logout
	}
} ());