var sammyApp = new Sammy('#posts', function() {
	this.get('#/', function(context) {
		context.redirect('#/home');
	});

	this.get('#/home', function(context) {
		var currentUser = JSON.parse(localStorage.getItem('CURRENT_USER'));

		if (currentUser) {
			context.redirect('#/home/user');
		} else {
			templates.get('home')
				.then(function(template) {
					loadContent(template());
				});
		}
	});

	this.get('#/register', function(context) {
		templates.get('register')
			.then(function(template) {
				loadContent(template());
			})
			.then(function() {
				$('#btn-register').click(function() {
					var user = {
						username: $('#tb-username').val(),
						authCode: CryptoJS.SHA1($('#tb-username').val()).toString()
					}
					services.user.register(user);
				});
			});
	});

	this.get('#/login', function(context) {
		templates.get('login')
			.then(function(template) {
				loadContent(template());
			})
			.then(function() {
				$('#btn-login').click(function() {
					var user = {
						username: $('#tb-username').val(),
						authCode: CryptoJS.SHA1($('#tb-username').val()).toString()
					}

					services.user.login(user)
						.then(function(res) {
							services.user.setCurrentUser(res);
							context.redirect('#/home/user');
						})
				})
			})

	});

	this.get('#/logout', function(context) {
		localStorage.removeItem('CURRENT_USER');
		context.redirect('#/home');
	});

	this.get('#/post/create', function(context) {
		templates.get('create-post')
			.then(function(template) {
				loadContent(template());
			})
			.then(function() {
				$('#btn-create').click(function() {
					var newPost = {
						title: $('#tb-title').val(),
						body: $('#tb-body').val()
					}
					services.posts.add(newPost)
						.then(function(res) {
							console.log(res);
							// TODO: post created
						})
				});
			})
	});

	this.get('#/post/get', function(context) {
		var filteredPosts;

		getPosts(null, null, 2, 0)
			.then(function(res) {
				filteredPosts = res;
				return templates.get('posts')
			})
			.then(function(template) {
				loadContent(template(filteredPosts));

				$('#btn-filter-posts').click(function() {
					var byUser = $('#tb-filter-user').val() || '#';
					var byPattern = $('#tb-filter-pattern').val() || '#';
					var pageSize = $('#page-size').val();
					var pageNumber = $('#page-number').val();

					context.redirect('#/post/get/' +
						byUser + '/' + byPattern + '/' + pageSize + '/' + pageNumber);
				});
			})
	});

	this.get('#/post/get/:byUser/:byPattern/:pageSize/:pageNumber', function(context) {
		var filteredPosts;
		var byUser = context.params.byUser;
		var byPattern = context.params.byPattern;
		var pageSize = context.params.pageSize;
		var pageNumber = context.params.pageNumber;


		getPosts(byUser, byPattern, pageSize, pageNumber)
			.then(function(res) {
				filteredPosts = res;
				return templates.get('posts')
			})
			.then(function(template) {
				loadContent(template(filteredPosts));

				$('#btn-filter-posts').click(function() {
					var byUser = $('#tb-filter-user').val() || '#';
					var byPattern = $('#tb-filter-pattern').val() || '#';
					var pageSize = $('#page-size').val();
					var pageNumber = $('#page-number').val();

					context.redirect('#/post/get/' +
						byUser + '/' + byPattern + '/' + pageSize + '/' + pageNumber);
				});
			})
	});

	this.get('#/home/user', function(context) {
		templates.get('user-homepage')
			.then(function(template) {
				loadContent(template());
			});
	});
});

sammyApp.run('#/');

function loadContent(content) {
	var promise = new Promise(function(resolve, reject) {
		$('#posts')
			.empty()
			.append(content);
	});

	return promise;
}

function getPosts(byUser, byPattern, pageSize, pageNumber) {
	var promise = new Promise(function(resolve, reject) {
		var posts;
		if (byUser === '#') {
			byUser = null
		};
		if (byPattern === '#') {
			byPattern = null
		};

		pageSize = Number(pageSize);
		pageNumber = Number(pageNumber) - 1;

		services.posts.get(byUser, byPattern)
			.then(function(res) {
				posts = res;
				var leftIndex = pageSize * pageNumber;
				var rightIndex = leftIndex + pageSize;
				posts = posts.slice(leftIndex, rightIndex);
				resolve(posts);
			});
	});

	return promise;
}