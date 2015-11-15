jest.dontMock('../sorted-collection');

var SortedCollection = require('../sorted-collection');

describe('INSERT', function() {
    var sortedCollection = new SortedCollection();
        
    sortedCollection.insert({ id: 2 });
    sortedCollection.insert({ id: 1 });
    sortedCollection.insert({ id: 3 });
    sortedCollection.insert({ id: -1 });
    
    it('ensures proper length', function() {
        expect(sortedCollection.length).toBe(4);
    });
    
    it('ensures proper order', function() {
        expect(sortedCollection[0].id).toBe(-1);
        expect(sortedCollection[1].id).toBe(1);
        expect(sortedCollection[2].id).toBe(2);
        expect(sortedCollection[3].id).toBe(3);
    });
    
    it('ensures proper index', function() {
        expect(sortedCollection.getByID(-1).id).toBe(-1);
        expect(sortedCollection.getByID(1).id).toBe(1);
        expect(sortedCollection.getByID(2).id).toBe(2);
        expect(sortedCollection.getByID(3).id).toBe(3);
        
        expect(Object.keys(sortedCollection.index).length).toBe(4);
    });    
});

describe('PUSH', function() {
    var sortedCollection = new SortedCollection();
        
    sortedCollection.push({ id: 2 });
    sortedCollection.push({ id: 1 });
    sortedCollection.push({ id: 3 });
    sortedCollection.push({ id: -1 });
    
    it('ensures proper length', function() {
        expect(sortedCollection.length).toBe(4);
    });
    
    it('ensures proper order', function() {
        expect(sortedCollection[0].id).toBe(2);
        expect(sortedCollection[1].id).toBe(1);
        expect(sortedCollection[2].id).toBe(3);
        expect(sortedCollection[3].id).toBe(-1);
    });
    
    it('ensures proper index', function() {
        expect(sortedCollection.getByID(-1).id).toBe(-1);
        expect(sortedCollection.getByID(1).id).toBe(1);
        expect(sortedCollection.getByID(2).id).toBe(2);
        expect(sortedCollection.getByID(3).id).toBe(3);

        expect(Object.keys(sortedCollection.index).length).toBe(4);
    });    
});

describe('UNSHIFT', function() {
    var sortedCollection = new SortedCollection();
        
    sortedCollection.unshift({ id: 2 });
    sortedCollection.unshift({ id: 1 });
    sortedCollection.unshift({ id: 3 });
    sortedCollection.unshift({ id: -1 });
    
    it('ensures proper length', function() {
        expect(sortedCollection.length).toBe(4);
    });
    
    it('ensures proper order', function() {
        expect(sortedCollection[0].id).toBe(-1);
        expect(sortedCollection[1].id).toBe(3);
        expect(sortedCollection[2].id).toBe(1);
        expect(sortedCollection[3].id).toBe(2);
    });
    
    it('ensures proper index', function() {
        expect(sortedCollection.getByID(-1).id).toBe(-1);
        expect(sortedCollection.getByID(1).id).toBe(1);
        expect(sortedCollection.getByID(2).id).toBe(2);
        expect(sortedCollection.getByID(3).id).toBe(3);

        expect(Object.keys(sortedCollection.index).length).toBe(4);
    });    
});

describe('SPLICE', function() {
    var sortedCollection = new SortedCollection();
        
    sortedCollection.unshift({ id: 2 });
    sortedCollection.push({ id: -1 });
    sortedCollection.push({ id: 1 });
    sortedCollection.unshift({ id: 3 });
    
    sortedCollection.splice(1, 2, { id: 99 });

    it('ensures proper length', function() {
        expect(sortedCollection.length).toBe(3);
    });
    
    it('ensures proper list', function() {
        expect(sortedCollection[0].id).toBe(3);
        expect(sortedCollection[1].id).toBe(99);
        expect(sortedCollection[2].id).toBe(1);
        expect(sortedCollection[3]).toBe(undefined);
        expect(sortedCollection[-1]).toBe(undefined);
    });
    
    it('ensures proper index', function() {
        expect(sortedCollection.getByID(-1)).toBe(undefined);
        expect(sortedCollection.getByID(1).id).toBe(1);
        expect(sortedCollection.getByID(2)).toBe(undefined);
        expect(sortedCollection.getByID(3).id).toBe(3);
        expect(sortedCollection.getByID(99).id).toBe(99);

        expect(Object.keys(sortedCollection.index).length).toBe(3);
    });    
});