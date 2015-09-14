var errorControler = (function() {
	function formatError(err) {
		var errObj = JSON.parse(err.responseText);
		return errObj.message;
	}
	
	return {
		formatError: formatError
	}
}());