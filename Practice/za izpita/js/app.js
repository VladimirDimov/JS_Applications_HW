var sammyApp = new Sammy('#content', function() {
	this.get('#/', function(context) {
		context.redirect('#/home');
	});

	this.get('#/home', homeControler.home);

	this.get('#/login', loginControler.loginOrRegister);
	
	this.get('#/logout', logoutControler.logout);

});

$(function() {
	sammyApp.run('#/');
});