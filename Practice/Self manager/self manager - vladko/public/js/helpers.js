var helpers = (function () {
	return {
		loadContent: function (template) {
			var promise = new Promise(function (resolve, reject) {
				$('#content').html(template);
			});

			return promise;
		}
	}
} ());