/* 
Create a function that:
*   Takes an array of students
    *   Each student has a `firstName` and `lastName` properties
*   **Finds** all students whose `firstName` is before their `lastName` alphabetically
*   Then **sorts** them in descending order by fullname
    *   fullname is the concatenation of `firstName`, ' ' (empty space) and `lastName`
*   Then **prints** the fullname of founded students to the console
*   **Use underscore.js for all operations**
*/

var _ = require('underscore');

function solve() {
	return function (students) {
		var selectedStudents = _.filter(students, function (student) {
			var firstName = student.firstName,
				lastName = student.lastName;
			return firstName < lastName;
		});

		var fullNames = _.map(selectedStudents, function (student) {
			return student.firstName + ' ' + student.lastName;
		});

		fullNames = _.chain(fullNames)
			.sortBy()
			.reverse()
			.value();

		_.each(fullNames, function (name) {
			console.log(name);
		});
	};
}

var students = [{
	firstName: 'NAME #3',
	lastName: 'NAME #2'
}, {
		firstName: 'NAME #4',
		lastName: 'NAME #1'
	}, {
		firstName: 'NAME #4',
		lastName: 'NAME #7'
	}];

var filter = solve();
filter(students);

module.exports = solve;