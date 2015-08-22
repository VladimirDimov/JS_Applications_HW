/* 
Create a function that:
*   **Takes** an array of animals
    *   Each animal has propeties `name`, `species` and `legsCount`
*   **finds** and **prints** the total number of legs to the console in the format:
    *   "Total number of legs: TOTAL_NUMBER_OF_LEGS"
*   **Use underscore.js for all operations**
*/

var _ = require('underscore');

function solve() {
  return function (animals) {
    var numberOfLegs = 0;
    _.each(animals, function(animal){
      numberOfLegs += animal.legsCount;
    });
    
    console.log('Total number of legs: ' + numberOfLegs);    
  };
}

var animals = [
  {
    name: 'Minkov',
    species: 'Mosquito',
    legsCount: 2
  }, {
    name: 'Doncho',
    species: 'Mosquito',
    legsCount: 2
  }, {
    name: 'Komara',
    species: 'Mosquito',
    legsCount: 4
  }];

var grouper = solve();
grouper(animals);

module.exports = solve;
