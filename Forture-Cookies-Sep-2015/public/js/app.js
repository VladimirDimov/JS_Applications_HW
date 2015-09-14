var sammyApp = new Sammy('#content', function() {
	this.get('#/', function(context) {
		context.redirect('#/home');
	});

	this.get('#/home', homeControler.home);
	this.get('#/home/:category', homeControler.selectCategory);

	this.get('#/login', loginControler.loginOrRegister);	
	this.get('#/logout', logoutControler.logout);
	
	this.get('#/users', usersControler.view);
	
	this.get('#/cookies/view', cookiesControler.getAll);	
	this.get('#/cookies/add', cookiesControler.add);
	this.get('#/cookies/my-cookie', cookiesControler.getFortune);

});

$(function() {
	sammyApp.run('#/');
});