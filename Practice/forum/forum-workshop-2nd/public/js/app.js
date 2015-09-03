var sammyApp = new Sammy('#content', function() {
	this.get('#/', function(context) {
		context.redirect('#/home');
	});

	this.get('#/home', function() {
		templates.get('home')
			.then(function(template) {
				services.user.getAll()
					.then(function(res) {
						var users = res.result;
						replaceContent(template(users));
					});
			});

		var currentUser = services.user.getCurrent();

		if (currentUser) {
			$('#user-options').show();
		} else {
			$('#user-options').hide();
		}
	});

	this.get('#/threads', function(context) {
		var allThreads;
		services.threads.getAll(function(res) {
				allThreads = res;
			})
			.then(function(threadsObj) {
				allThreads = threadsObj.result;

				templates.get('threads')
					.then(function(template) {
						replaceContent(template(allThreads));
					});
			});
	});

	this.get('#/login', function(context) {
		templates.get('login')
			.then(function(template) {
				replaceContent(template);

				$('#btn-submit').click(function() {
					var username = $('#tb-username').val();
					var password = $('#tb-password').val();

					var user = {
						username: username,
						passHash: CryptoJS.SHA1(password).toString()
					};

					services.user.login(user)
						.then(function(userRes) {
							console.log(userRes);
							localStorage.setItem('CURRENT_USER', JSON.stringify(userRes));
							context.redirect('#/');
						});
				})
			});
	});

	this.get('#/logout', function(context) {
		var currentUserJson = localStorage.getItem('CURRENT_USER');
		if (currentUserJson) {
			localStorage.removeItem('CURRENT_USER');
		};
		context.redirect('#/');
	});

	this.get('#/register', function(context) {
		templates.get('register')
			.then(function(template) {
				replaceContent(template);

				$('#btn-submit').click(function() {
					var username = $('#tb-username').val();
					var password = $('#tb-password').val();
					var passwordRepeat = $('#tb-password-repeat').val();

					if (password !== passwordRepeat) {
						throw new Error('The passwords in the two inputs must equal.')
					};

					var user = {
						username: username,
						passHash: CryptoJS.SHA1(password).toString()
					};

					services.user.register(user)
						.then(function(userRes) {
							console.log(userRes);
							localStorage.setItem('CURRENT_USER', JSON.stringify(userRes));
							context.redirect('#/');
						});
				})
			});
	});
});

function replaceContent(template) {
	$('#content').html(template);
}

sammyApp.run('#/home');