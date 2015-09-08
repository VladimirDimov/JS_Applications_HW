var templates = {
	get: function (name) {
		var promise = new Promise(function (resolve, reject) {
			var url = 'templates/' + name + '.handlebars';
			$.get(url, function (templateHtml) {
				resolve(Handlebars.compile(templateHtml));
			});
		});

		return promise;
	}
}