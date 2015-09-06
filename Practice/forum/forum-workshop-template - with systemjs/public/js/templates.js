import 'bower_components/jquery/dist/jquery.min.js';
import Handlebars from 'bower_components/handlebars/handlebars.js';

var templates = {
	get: function get(name) {
		var url = 'templates/' + name + '.handlebars';

		var promise = new Promise(function (resolve, reject) {
			$.ajax(url, {
				method: 'GET',
				contentType: 'text/html',
				success: function (templateHTML) {
					resolve(Handlebars.compile(templateHTML));
				}
			})
		});

		return promise;
	}
}


export {
templates
}