var validator = (function () {
	return {
		validateNonEmptyString: function (value, parameterName) {
			if (typeof value !== 'string' || value === '') {
				throw toastr.error(parameterName + ' is missing');
			}
		},

		validateStringLength: function (value, minLength, maxLength, parameterName) {
			validator.validateNonEmptyString(value, parameterName);

			if (value.length < minLength || value.length > maxLength) {
				throw toastr.error(parameterName + ' must be between ' + minLength + ' and ' + maxLength + ' characters');
			}
		},

		validateOnlyCharacters: function (value, parameterName) {
			if (!(/^[A-Za-z]$/.test(value))) {
				throw toastr.error(parameterName + ' must contain only letters!');
			}
		},

		validateUsernameCharacters: function (value, parameterName) {
			if (!(/^[A-Za-z_]+$/.test(value))) {
				throw toastr.error(parameterName + ' must contain only letters and _!');
			}
		},
	}
} ());