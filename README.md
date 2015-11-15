Sorted Collection
=========

A smart array-like JavaScript collection that makes it easy to maintain the sort order of a collection of objects. 
In addition to basic Array functions like `push`, `splice`, `unshift`, `forEach`, this component introduces new sort-oriented functions, primarily 
`insert`.

## Installation

	npm install sorted-collection

## Usage

    var SortedCollection = require('sortedCollection'),
        sortedCollection = new SortedCollection();
        
    sortedCollection.insert({ id: 3 });
    sortedCollection.insert({ id: 1 });
    sortedCollection.insert({ id: 2 });
    
    console.log('1st item is id #1:', sortedCollection[0]);
    console.log('2nd item is id #2:', sortedCollection[1]);
    console.log('3rd item is id #3:', sortedCollection[2]);

## Tests

    npm test

## Contributing

Send a pull request for any changes you recommend. 
Please add or update unit tests for any new or changed functionality.

## Release History

* 1.0.0 Initial release
