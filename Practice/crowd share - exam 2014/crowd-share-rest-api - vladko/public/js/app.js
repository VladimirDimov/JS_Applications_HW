
var sammyApp = new Sammy('#posts', function () {
	this.get('#/', function (context) {
		context.redirect('#/home');
	});

	this.get('#/home', function (context) {
		var currentUser = JSON.parse(localStorage.getItem('CURRENT_USER'));

		if (currentUser) {
			context.redirect('#/home/user');
		} else {
			templates.get('home')
				.then(function (template) {
					loadContent(template());
				});
		}
	});

	this.get('#/register', function (context) {
		templates.get('register')
			.then(function (template) {
				loadContent(template());
			})
			.then(function () {
				$('#btn-register').click(function () {
					var user = {
						username: $('#tb-username').val(),
						authCode: CryptoJS.SHA1($('#tb-username').val()).toString()
					}
					services.user.register(user);
				});
			});
	});

	this.get('#/login', function (context) {
		templates.get('login')
			.then(function (template) {
				loadContent(template());
			})
			.then(function () {
				$('#btn-login').click(function () {
					var user = {
						username: $('#tb-username').val(),
						authCode: CryptoJS.SHA1($('#tb-username').val()).toString()
					}

					services.user.login(user)
						.then(function (res) {
							services.user.setCurrentUser(res);
							context.redirect('#/home/user');
						})
				})
			})

	});

	this.get('#/logout', function (context) {
		localStorage.removeItem('CURRENT_USER');
		context.redirect('#/home');
	});

	this.get('#/post/create', function (context) {
		templates.get('create-post')
			.then(function (template) {
				loadContent(template());
			})
			.then(function () {
				$('#btn-create').click(function() {
					
				});
			})
	});

	this.get('#/home/user', function (context) {
		templates.get('user-homepage')
			.then(function (template) {
				loadContent(template());
			});
	});
});

sammyApp.run('#/');

function loadContent(content) {
	var promise = new Promise(function (resolve, reject) {
		$('#posts')
			.empty()
			.append(content);
	});

	return promise;
}
