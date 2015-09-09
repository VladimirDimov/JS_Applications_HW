var sammyApp = new Sammy('#content', function () {
	this.get('#/', function (context) {
		context.redirect('#/home');
	});

	this.get('#/home', function (context) {
		homeControler.home(context)
	});
	
	this.get('#/login', function(context) {
		loginControler.login(context);
	})
	
});

sammyApp.run('#/');