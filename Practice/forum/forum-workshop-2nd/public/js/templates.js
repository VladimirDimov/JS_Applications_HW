var handlebars = window.handlebars || window.Handlebars;
var Handlebars = window.handlebars || window.Handlebars;

var templates = {
	get: function(name) {
		var url = './templates/' + name + '.handlebars';

		var promise = new Promise(function(resolve, reject) {
			$.get(url, function(templateHtml) {
				resolve(handlebars.compile(templateHtml));
			});
		});

		return promise;
	}
}