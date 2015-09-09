var postsControler = (function () {
	function getAll(context) {
		var allPosts;
		services.posts.getAll()
			.then(function (res) {
				allPosts = res;
				showPosts(allPosts, context);
			})
	}

	function showPosts(posts, context) {
		for (var i in posts) {
			posts[i].dateFormatted = helpers.formatDate(posts[i].postDate);
		}
		templates.get('posts')
			.then(function (template) {
				context.$element().html(template(posts));

				if (services.user.getCurrent) {
					$('#fm-add-post').show();
				} else {
					$('#fm-add-post').hide();
				}

				$('#btn-add').on('click', function () {
					var post = {
						title: $('#tb-title').val(),
						body: $('#tb-body').val()
					}

					validator.validateStringLength(post.title, 3, 30, 'Post title');
					validator.validateStringLength(post.body, 3, 200, 'Post title');

					services.posts.add(post)
						.then(function (res) {
							toastr.success('Post ' + post.title + ' added.');
							postsControler.getAll(context);
						})
						.catch(function (err) {
							toastr.error('Error adding new post');
						})
				});

				$('#btn-filter').on('click', function () {
					var byUsername = $('#tb-byUser').val();
					var byPattern = $('#tb-byPattern').val();

					services.posts.getFiltered(byUsername, byPattern)
						.then(function (res) {
							showPosts(res, context);
						})
				});

				$('#btn-sortByTitle').on('click', function () {
					var sortedPosts = posts.sort(function (a, b) {
						return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
					});

					showPosts(sortedPosts, context);
				});

				$('#btn-sortByDate').on('click', function () {
					var sortedPosts = posts.sort(function (a, b) {
						dateA = new Date(a.postDate);
						dateB = new Date(b.postDate);
						
						return dateA - dateB;
					});

					showPosts(sortedPosts, context);
				});
			})
	}

	return {
		getAll: getAll
	}
} ());