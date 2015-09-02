var templates = (function(){
	function get(name) {
		var url = './templates/' + name + '.handlebars';
		
		var promise = new Promise(function(resolve, reject) {
			$.get(url, function(htmlTemplate){
				resolve(Handlebars.compile(htmlTemplate));
			});
		});
		
		return promise;
	}
	
	return {
		get: get
	}
}());