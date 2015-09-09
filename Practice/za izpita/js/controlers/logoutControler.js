var logoutControler = (function() {
	function logout(context) {
		localStorage.removeItem('CURRENT_USER');
		context.redirect('#/');
	}
	
	return {
		logout: logout
	}
}());