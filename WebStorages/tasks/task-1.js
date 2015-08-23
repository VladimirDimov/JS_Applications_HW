function solve() {
	var constants = {
		numberMinValue: 1234,
		numberMaxValue: 9876
	},
		numberToGuess = undefined;

	function init(playerName, endCallback) {
		numberToGuess = getRandomInt(constants.numberMinValue, constants.numberMaxValue),
		numberToArray = convertToArrayOfDigits(numberToGuess);

		endCallback();
	}

	function startGame() {

		do {

		} while (result.rams !== 4);
	}

	function readGuess() {

	}

	var guessNumberContainer = document.getElementById('guess-number');
	
	guessNumberContainer.addEventListener('change', function () {
		var result = guess(parseInt(guessNumberContainer.value));
		guessNumberContainer.value = '';
		
		if (result.rams === 4) {
			getHighScore();
		}
	});

	function guess(number) {
		var guessDigits = convertToArrayOfDigits(number),
			numberToGuessDigits = convertToArrayOfDigits(numberToGuess),
			sheep = 0,
			rams = 0;

		if (!areAllDigitsDifferent(number)) {
			throw new Error('The number must have unique digits.');
		}
		if ((number < 1234) || (9876 < number)) {
			throw new Error('The number must be in the range ' + constants.numberMinValue + ' to ' + constants.numberMaxValue + '.');
		}

		for (var i = 0; i < guessDigits.length; i++) {
			var currentDigit = guessDigits[i];

			for (var j = 0; j < numberToGuessDigits.length; j++) {
				if (currentDigit === numberToGuessDigits[j]) {
					if (i !== j) {
						sheep += 1;
					} else {
						rams += 1;
					}
				}
			}
		}

		return { sheep: sheep, rams: rams };
	}

	function getHighScore(count) {
		console.log('High score!!!');
	}

	function getRandomInt(min, max) {
		do {
			var randomInt = Math.floor(Math.random() * (max - min)) + min;
		} while (!areAllDigitsDifferent(randomInt));

		return randomInt;
	}

	function convertToArrayOfDigits(number) {
		var numberToArray = [];
		if (typeof (number) !== 'number') {
			throw new Error('Invalid number!');
		}

		while (number !== 0) {
			var lastDigit = number % 10;
			numberToArray.push(lastDigit);
			number = (number / 10) | 0;
		}

		return numberToArray.reverse();
	}

	function areAllDigitsDifferent(number) {
		var arrOfDigits = convertToArrayOfDigits(number);
		for (var i = 0; i < arrOfDigits.length; i++) {
			for (var j = i + 1; j < arrOfDigits.length; j++) {
				if (arrOfDigits[i] === arrOfDigits[j]) {
					return false;
				}
			}
		}

		return true;
	}

	return {
		init, guess, getHighScore
	}
}

var game = solve();

game.init('vladko', game.getHighScore);

module.exports = solve;