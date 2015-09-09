var homeControler = function () {
	return {
		home: function (context) {
			templates.get('home')
				.then(function(template) {
					context.$element().html(template());
				});
		}
	}	
} ();

