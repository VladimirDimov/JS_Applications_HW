var homeControler = function () {
	return {
		home: function (context) {
			if (context.params.category) {
				services.cookies.getAll()
					.then(function (res) {
						var allCookies = res.result;

						var searchedCategory = context.params.category;

						var filteredCookies = allCookies.filter(function (item) {
							if (searchedCategory === '') {
								cookiesControler.getAll(context);
								return;
							}
							return item.category.toLowerCase() === searchedCategory;
						});

						cookiesControler.showCookies(filteredCookies, context);
					});
			} else {
				cookiesControler.getAll(context);
			}

			templates.get('home')
				.then(function (template) {
					context.$element().html(template());	
					
					var currentUser = services.user.getCurrent();
					if (currentUser) {
						$('#current-user').html('Hello ' + currentUser.username);
						$('.user-options').show();					
					} else {
						$('#current-user').html('No current user');
						$('.user-options').hide();
					}
				});
		},
	}
} ();

