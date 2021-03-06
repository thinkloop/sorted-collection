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
        expect(sortedCollection.index['-1'].id).toBe(-1);
        expect(sortedCollection.index['1'].id).toBe(1);
        expect(sortedCollection.index['2'].id).toBe(2);
        expect(sortedCollection.index['3'].id).toBe(3);
        
        expect(Object.keys(sortedCollection.index).length).toBe(4);
    });    
});

describe('INSERT DESC', function() {
    var sortedCollection = new SortedCollection();
    
    sortedCollection.sortDefinition = [{ property: 'updatedDate', direction: 'desc' }, { property: 'id', direction: 'asc' }];
    sortedCollection.insert({ id: 2, updatedDate: '2015-11-20T02:48:30.630Z' });
    sortedCollection.insert({ id: 1, updatedDate: '2015-11-21T02:48:29.630Z' });
    sortedCollection.insert({ id: 3, updatedDate: '2015-11-20T02:48:29.631Z' });
    sortedCollection.insert({ id: -1, updatedDate: '2015-12-20T02:48:29.630Z' });
    sortedCollection.insert({ id: -2, updatedDate: '2015-12-20T02:48:29.630Z' });
    
    it('ensures proper length', function() {
        expect(sortedCollection.length).toBe(5);
    });
    
    it('ensures proper order', function() {
        expect(sortedCollection[0].id).toBe(-2);
        expect(sortedCollection[1].id).toBe(-1);
        expect(sortedCollection[2].id).toBe(1);
        expect(sortedCollection[3].id).toBe(2);
        expect(sortedCollection[4].id).toBe(3);
    });
    
    it('ensures proper index', function() {
        expect(sortedCollection.index['-1'].id).toBe(-1);
        expect(sortedCollection.index['1'].id).toBe(1);
        expect(sortedCollection.index['2'].id).toBe(2);
        expect(sortedCollection.index['3'].id).toBe(3);
        expect(sortedCollection.index['-2'].id).toBe(-2);
        
        expect(Object.keys(sortedCollection.index).length).toBe(5);
    });    
});

describe('REMOVE', function() {
    var sortedCollection = new SortedCollection();
        
    sortedCollection.insert({ id: 2 });
    sortedCollection.insert({ id: 1 });
    sortedCollection.insert({ id: 3 });
    sortedCollection.insert({ id: -1 });
    
    sortedCollection.remove({ id: 2 });
    sortedCollection.remove({ id: -1 });
    
    it('ensures proper length', function() {
        expect(sortedCollection.length).toBe(2);
    });
    
    it('ensures proper order', function() {
        expect(sortedCollection[0].id).toBe(1);
        expect(sortedCollection[1].id).toBe(3);
        expect(sortedCollection[2]).toBe(undefined);
    });
    
    it('ensures proper index', function() {
        expect(sortedCollection.index['-1']).toBe(undefined);
        expect(sortedCollection.index['1'].id).toBe(1);
        expect(sortedCollection.index['2']).toBe(undefined);
        expect(sortedCollection.index['3'].id).toBe(3);
        
        expect(Object.keys(sortedCollection.index).length).toBe(2);
    });    
});

describe('SORT', function() {
    var sortedCollection = new SortedCollection();
        
    sortedCollection.push({ id: 2 });
    sortedCollection.push({ id: 1 });
    sortedCollection.push({ id: 3 });
    sortedCollection.push({ id: -1 });
    
    sortedCollection.sort();
    
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
        expect(sortedCollection.index['-1'].id).toBe(-1);
        expect(sortedCollection.index['1'].id).toBe(1);
        expect(sortedCollection.index['2'].id).toBe(2);
        expect(sortedCollection.index['3'].id).toBe(3);
        
        expect(Object.keys(sortedCollection.index).length).toBe(4);
    });    
});

describe('GETBYID', function() {
    var sortedCollection = new SortedCollection();
        
    sortedCollection.insert({ id: 2 });
    sortedCollection.unshift({ id: 1 });
    sortedCollection.splice(2, 0, { id: 3 });
    sortedCollection.push({ id: -1 });
    
    it('ensures proper index', function() {
        expect(sortedCollection.getByID('-1').id).toBe(-1);
        expect(sortedCollection.getByID('1').id).toBe(1);
        expect(sortedCollection.getByID('2').id).toBe(2);
        expect(sortedCollection.getByID('3').id).toBe(3);
        
        expect(Object.keys(sortedCollection.index).length).toBe(4);
    });    
});

describe('NEW', function() {
    var sortedCollection = new SortedCollection(),
        data = { id: 999 },
        newObj = sortedCollection.new(data),
        newObj2 = sortedCollection.new();
    
    it('ensures new obj is correct', function() {
        expect(newObj.id).toBe(data.id);
        expect(!!newObj2).toBe(true);
        
        expect(Object.keys(sortedCollection.index).length).toBe(0);
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
        expect(sortedCollection.index['-1'].id).toBe(-1);
        expect(sortedCollection.index['1'].id).toBe(1);
        expect(sortedCollection.index['2'].id).toBe(2);
        expect(sortedCollection.index['3'].id).toBe(3);

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
        expect(sortedCollection.index['-1'].id).toBe(-1);
        expect(sortedCollection.index['1'].id).toBe(1);
        expect(sortedCollection.index['2'].id).toBe(2);
        expect(sortedCollection.index['3'].id).toBe(3);

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
        expect(sortedCollection.index['-1']).toBe(undefined);
        expect(sortedCollection.index['1'].id).toBe(1);
        expect(sortedCollection.index['2']).toBe(undefined);
        expect(sortedCollection.index['3'].id).toBe(3);
        expect(sortedCollection.index['99'].id).toBe(99);

        expect(Object.keys(sortedCollection.index).length).toBe(3);
    });    
});