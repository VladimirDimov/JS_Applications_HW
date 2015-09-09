var homeControler = function() {
	return {
		home: function(context) {
			templates.get('home')
				.then(function(template) {
					context.$element().html(template());

					var currentUser = services.user.getCurrent();

					if (currentUser) {
						$('#lk-todos-add').show();
					} else {
						$('#lk-todos-add').hide();
					}
				});
		}
	}
}();