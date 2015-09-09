var logoutConroler = (function() {
	var logout = function(context) {
		services.user.logout();
		context.redirect('#/');
	}

	return {
		logout: logout
	}
})();