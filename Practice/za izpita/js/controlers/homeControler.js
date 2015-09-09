var homeControler = function () {
	return {
		home: function (context) {
			templates.get('home')
				.then(function(template) {
					context.$element().html(template());
					
					var currentUser = services.user.getCurrent();
					if(currentUser) {
						$('#current-user').html('Hello ' + currentUser.username);
					} else {
						$('#current-user').html('No current user');
					}
				});
		}
	}	
} ();

