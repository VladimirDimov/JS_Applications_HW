var usersControler = (function () {
	function view(context) {
		var users;
		
		services.user.getAll()
			.then(function (res) {
				users = res.result;
				templates.get('users-all')
					.then(function(template) {
						context.$element().html(template(users));
					})
			})
			.catch(function(err) {
				toastr.error(err);
			})
	}

	return {
		view: view
	}
} ());