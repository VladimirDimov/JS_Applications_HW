(function() {
	var baseServiceUrl = 'https://api.parse.com/1/';
	var parseAppId = 'qP5NPpckCrGFLuwwq8jrpIUr88mOZ86DaaK6VchA';
	var parseRestApiKey = 'UhYBC9iDuov42XCtuhQ6R7fIZo60VQd6nQYbOOna';

	function getHeaders() {
		var headers = {
			'X-Parse-Application-Id': parseAppId,
			'X-Parse-REST-API-Key': parseRestApiKey
		};
		
		return headers;
	}

	$.ajax({
		url: baseServiceUrl + 'classes/users',
		type: 'POST',
		contentType: 'application/json',
		dataType: 'json',	
		data: JSON.stringify({
			username: 'vladko',
			password: '123'
		}),
		headers: getHeaders(),
		success: function(res) {
			console.log(res);
		},
		error: function(err) {
			console.log(err);
		}
	});
})();