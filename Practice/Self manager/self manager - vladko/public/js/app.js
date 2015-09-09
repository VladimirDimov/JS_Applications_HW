var sammyApp = new Sammy('#content', function() {
	this.get('#/', function(context) {
		context.redirect('#/home');
	});

	this.get('#/home', homeControler.home);

	this.get('#/login', loginControler.loginOrRegister);

	this.get('#/logout', logoutConroler.logout)

	this.get('#/todos/get/all', todosControler.get.all);

	this.get('#/todos/add', todosControler.add);

});

$(function() {
	sammyApp.run('#/');
});