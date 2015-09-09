var validator = (function() {
	return {
		validateNonEmptyString: function(value, parameterName) {
			if (typeof value !== 'string' || value === '') {
				throw toastr.error(parameterName + ' is missing');
			}
		},
		
		validateStringLength: function(value, minLength, maxLength, parameterName) {
			validator.validateNonEmptyString(value, parameterName);
			
			if (value.length < minLength || value.length > maxLength) {
				throw toastr.error(parameterName + ' must be between ' + minLength + ' and ' + maxLength + ' characters');
			}
		},
	}
}());