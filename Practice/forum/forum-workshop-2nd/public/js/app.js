var sammyApp = new Sammy('#content', function () {
	this.get('#/', function (context) {
		context.redirect('#/home');
	});

	this.get('#/threads/id', function (context) {
		templates.get('threadId')
			.then(function (template) {
				var selectedThreadId = services.threads.getSelectedId();

				services.threads.getThreadById(selectedThreadId)
					.then(function (res) {
						var selectedThread = res.result;
						$('#content').html(template(selectedThread));
						$('#btn-send').click(function () {
							var message = $('#tb-message').val();
							services.threads.messages.add(message)
								.then(function (res) {
									console.log(res);
								});
						})
					});
			})
	});

	this.get('#/threads/add', function (context) {
		templates.get('addThread')
			.then(function (template) {
				replaceContent(template());

				$('#btn-add-thread').click(function () {
					var title = $('#tb-thread-title').val();
					if (!title) { return; }

					services.threads.add(title)
						.then(function (res) {
							// navigate to the new thread
						});
				});
			})
			.then(function () {

			})
	});

	this.get('#/home', function () {
		templates.get('home')
			.then(function (template) {
				services.user.getAll()
					.then(function (res) {
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

	this.get('#/threads', function (context) {
		var allThreads;
		var numberOfThreads;

		services.threads.getAll(function (res) {
			allThreads = res;
		})
			.then(function (threadsObj) {
				allThreads = threadsObj.result;
				numberOfThreads = allThreads.length;
			})
			.then(function () {
				return templates.get('threads');
			})
			.then(function (template) {
				replaceContent(template(allThreads));
			})
			.then(function () {
				$('.btn-more').click(function (ev) {
					var threadId = parseInt($(ev.target).prev().html());
					services.threads.setSelectedId(threadId);
					context.redirect('#/threads/id');
				})
			});
	});

	this.get('#/login', function (context) {
		templates.get('login')
			.then(function (template) {
				replaceContent(template);

				$('#btn-submit').click(function () {
					var username = $('#tb-username').val();
					var password = $('#tb-password').val();

					var user = {
						username: username,
						passHash: CryptoJS.SHA1(password).toString()
					};

					services.user.login(user)
						.then(function (userRes) {
							console.log(userRes);
							localStorage.setItem('CURRENT_USER', JSON.stringify(userRes));
							context.redirect('#/');
						});
				})
			});
	});

	this.get('#/logout', function (context) {
		var currentUserJson = localStorage.getItem('CURRENT_USER');
		if (currentUserJson) {
			localStorage.removeItem('CURRENT_USER');
		};
		context.redirect('#/');
	});

	this.get('#/register', function (context) {
		templates.get('register')
			.then(function (template) {
				replaceContent(template);

				$('#btn-submit').click(function () {
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
						.then(function (userRes) {
							console.log(userRes);
							localStorage.setItem('CURRENT_USER', JSON.stringify(userRes));
							context.redirect('#/');
						});
				})
			});
	});
});

function replaceContent(template) {
	var promise = new Promise(function (resolve, reject) {
		$('#content').html(template);
	});

	return promise;
}

sammyApp.run('#/home');