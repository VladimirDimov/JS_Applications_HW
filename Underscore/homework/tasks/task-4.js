/* 
Create a function that:
*   **Takes** an array of animals
    *   Each animal has propeties `name`, `species` and `legsCount`
*   **groups** the animals by `species`
    *   the groups are sorted by `species` descending
*   **sorts** them ascending by `legsCount`
	*	if two animals have the same number of legs sort them by name
*   **prints** them to the console in the format:

```
    ----------- (number of dashes is equal to the length of the GROUP_1_NAME + 1)
    GROUP_1_NAME:
    ----------- (number of dashes is equal to the length of the GROUP_1_NAME + 1)
    NAME has LEGS_COUNT legs //for the first animal in group 1
    NAME has LEGS_COUNT legs //for the second animal in group 1
    ----------- (number of dashes is equal to the length of the GROUP_2_NAME + 1)
    GROUP_2_NAME:
    ----------- (number of dashes is equal to the length of the GROUP_2_NAME + 1)
    NAME has LEGS_COUNT legs //for the first animal in the group 2
    NAME has LEGS_COUNT legs //for the second animal in the group 2
    NAME has LEGS_COUNT legs //for the third animal in the group 2
    NAME has LEGS_COUNT legs //for the fourth animal in the group 2
```
*   **Use underscore.js for all operations**
*/

var _ = require('underscore');

function solve() {
    return function (animals) {
        var groupedBySpecies = _.chain(animals)
            .sortBy('species')
            .groupBy('species')
            .value();

        var speciesDescending = _.chain(Object.keys(groupedBySpecies))
            .sortBy()
            .reverse()
            .value();

        _.each(speciesDescending, function (species) {
            console.log(getHyfens(species));
            console.log(species + ':');
            console.log(getHyfens(species));

            var animalsOfSpecies = groupedBySpecies[species];
            animalsOfSpecies = _.chain(animalsOfSpecies)
                .sortBy(function (item) { return item.name; })
                .sortBy(function (item) { return item.legsCount; })
                .value();
            _.each(animalsOfSpecies, function (animal) {
                console.log(animal.name + ' has ' + animal.legsCount + ' legs');
            });
        });
    };

    function getHyfens(groupName) {
        var nameLength = groupName.length,
            result = '';

        for (var i = 0; i < nameLength + 1; i++) {
            result += '-';
        }

        return result;
    }
}

var animals = [{
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
