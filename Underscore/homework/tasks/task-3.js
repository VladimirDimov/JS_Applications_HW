/* 
Create a function that:
*   Takes an array of students
    *   Each student has:
        *   `firstName`, `lastName` and `age` properties
        *   Array of decimal numbers representing the marks         
*   **finds** the student with highest average mark (there will be only one)
*   **prints** to the console  'FOUND_STUDENT_FULLNAME has an average score of MARK_OF_THE_STUDENT'
    *   fullname is the concatenation of `firstName`, ' ' (empty space) and `lastName`
*   **Use underscore.js for all operations**
*/

var _ = require('underscore');

function solve() {
    return function (students) {
        var highestMarksStudent = _.max(students, function (student) {
            var averageOfMarks = average(student.marks);
            return averageOfMarks;
        });

        console.log(arrangePrintResult(highestMarksStudent));
    };

    function average(arr) {
        var sum = 0,
            len = arr.length,
            average;

        for (var i = 0; i < len; i++) {
            sum += arr[i];
        }

        average = sum / len;
        return average;
    }

    function arrangePrintResult(student) {
        return student.firstName + ' ' + student.lastName + ' has an average score of ' + average(student.marks);
    }
}

var students = [{
    firstName: 'Stanimir',
    lastName: 'Jakov',
    age: 24,
    marks: [6]
}, {
        firstName: 'Stanimir',
        lastName: 'Jakov',
        age: 17,
        marks: [5, 5, 3]
    }, {
        firstName: 'Frederick',
        lastName: 'Jacob',
        age: 1,
        marks: [4.2, 3.7, 1, 1, 1, 1]
    }, {
        firstName: 'Joukahainen',
        lastName: 'Valerian',
        age: 1,
        marks: [4, 3.7, 0, 10, 4]
    }, {
        firstName: 'Teodor',
        lastName: 'Mervyn',
        age: 8,
        marks: [6, 1.2, 2.1]
    }, {
        firstName: 'Kristaps',
        lastName: 'lfsige',
        age: 30,
        marks: [7.3, 6.9, 1, 4, 1, 5, 9, 1, 3, 1, 7, 1]
    }, {
        firstName: 'Varnava',
        lastName: 'Peter',
        age: 42,
        marks: [3, 4, 8, 8]
    }, {
        firstName: 'Aibek',
        lastName: 'Patricio',
        age: 9,
        marks: [7, 8, 2]
    }, {
        firstName: 'Lovre',
        lastName: 'Thoko',
        age: 11,
        marks: [2, 10, 10, 7.7, 5.4, 7.1, 7.9, 6.66, 5.7, 7.6]
    }, {
        firstName: 'Ambrosius',
        lastName: 'Volos',
        age: 26,
        marks: [4, 4.2]
    }];

var printer = solve();
printer(students);
module.exports = solve;