Sorted Collection
=========

An array-like JavaScript collection that maintains the sort order of its elements. To be used in place of a regular array of objects.

In addition to basic Array functions like `push`, `splice`, `unshift`, and `forEach`, this component introduces new sort-oriented functions, like: 
`insert`. 

When a valued is `insert'ed`, it is automatically spliced into the correct position in the collection based on the collection's `sortDefinition`.

## Installation

	npm install sorted-collection

## Basic

    var SortedCollection = require('sorted-collection'),
        sortedCollection = new SortedCollection();
    
    sortedCollection.insert({ id: 3 });
    sortedCollection.insert({ id: 1 });
    sortedCollection.insert({ id: 2 });
    
    console.log('1st item is id #1:', sortedCollection[0]);
    console.log('2nd item is id #2:', sortedCollection[1]);
    console.log('3rd item is id #3:', sortedCollection[2]);
    
## Usage

    var SortedCollection = require('sorted-collection'),
        sortedCollection = new SortedCollection();
    
    // set sort by "name", then by "id" descending
    sortedCollection.sortDefinition = [{ property: 'name', direction: 'asc' }, { property: 'id', direction: 'desc' }];
    
    // insert objects
    sortedCollection.insert({ id: 1, name: 'Z' });
    sortedCollection.insert({ id: 2, name: 'B' });
    sortedCollection.insert({ id: 3, name: 'K' });
    sortedCollection.insert({ id: 4, name: 'Z' });
    
    // notice order is
    console.log('1st item is id #2:', sortedCollection[0]);
    console.log('2nd item is id #3:', sortedCollection[1]);
    console.log('3rd item is id #4:', sortedCollection[2]);
    console.log('4rd item is id #1:', sortedCollection[3]);

## Tests

    npm test

## Contributing

Send a pull request for any changes you recommend. 
Please add or update unit tests for any new or changed functionality.

## Release History

* 1.0.0 Initial release
