var homeControler = function () {
	return {
		home: function (context) {
			templates.get('home')
				.then(function(template) {
					helpers.loadContent(template());
				});
		}
	}	
} ();

