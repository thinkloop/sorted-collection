var SortedCollection = function()  {
	this.index = {};
	this.length = 0;	
	this.sortDefinition = [{ property: 'id', direction: 'asc' }];
	return this;
};

SortedCollection.prototype = {

	// clear the collection's data
	clear: function(item) {
		this.index = {};
		this.length = 0;
		return this;
	},
	
	// add an item to the collection at its sorted position
	insert: function(item) {
		var position = Math.abs(this.findPosition(item));
		this.splice(position, 0, item);
		return position;
	},
	
	// remove an item from the collection using its id
	remove: function(item) {
		var itemPosition,
			removedItem;

		itemPosition = this.findPosition(item);

		if (itemPosition < 0 || item.id !== this[itemPosition].id) {
			return null;
		}

		removedItem = this.splice(itemPosition, 1)[0];

		return removedItem;
	},
	
	// sort the collection if you added items manually. If you used insert() to add items you don't need to call this
	sort: function() {
		Array.prototype.sort.call(this, this.compare.bind(this));
		return this;
	},
	
	// return item from the index using its id
	getByID: function(id) {
		return this.index[id];
	},
	
	// you can override this function in your implementation to return a fully formed model object from unstructured data (usually returned from a service)
	new: function(data) {
		return data || {};
	},
	
	// populate the collection from data (usually returned from a service). Uses new() to create objects, so if you override new() to return a model object for your app, the collection will use these models.
	populate: function(arr, reverse) {
        var addFunction = !reverse ? this.push.bind(this) : this.unshift.bind(this),
        	i;

        if (arr && arr.length) {
            for (i = 0; i < arr.length; i++) {
                addFunction(this.new(arr[i]));
            }
        }

        return this;
    },

	// returns the position in the array that the item was found in, or the position the item would be in with a negative sign (for example if the new item does not exist in position 6 but would belong there, return would be: -6)
	findPosition: function(item) {
		var minPos = 0,
			maxPos = this.length - 1,
			currentPos,
			currentElement,
			currentCompareResult;

		while (minPos <= maxPos) {
			currentPos = ((minPos + maxPos) / 2) | 0;
			currentElement = this[currentPos];
			currentCompareResult = this.compare(currentElement, item);

			if (currentCompareResult <= -1) {
				minPos = currentPos + 1;
			}
			else if (currentCompareResult >= 1) {
				maxPos = currentPos - 1;
			}
			else {
				return currentPos;
			}
		}

		return ~maxPos;
	},

	// compare two objects based on sortDefinition and return -1, 1, 0 if the first object is smaller, larger or equal to the second obj, respectively
	compare: function(item1, item2) {
		var currentSortDefinition,
			lessThan,
			greaterThan,
			val1,
			val2,
			i;

		for (i = 0; i < this.sortDefinition.length; i++) {
			currentSortDefinition = this.sortDefinition[i];
			val1 = item1[currentSortDefinition.property];
			val2 = item2[currentSortDefinition.property];

			val1 = val1 && val1.toLowerCase ? val1.toLowerCase() : val1;
			val2 = val2 && val2.toLowerCase ? val2.toLowerCase() : val2;

			if (val1 === val2) {
				continue;
			}

			if (currentSortDefinition.direction !== 'desc') {
				lessThan = -1;
				greaterThan = 1;
			}
			else {
				lessThan = 1;
				greaterThan = -1;
			}

			if (!val1 && val1 !== 0) {
				return greaterThan;
			}

			if (!val2 && val2 !== 0) {
				return lessThan;
			}

			return val1 < val2 ? lessThan : greaterThan;
		}

		// if it hasn't returned up until this point, that means both objects are equal
		return 0;
	},

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    * * REGULAR ARRAY FUNCTIONS
    * *
    * * These functions behave like their Array countrparts while maintaining the collection's index
    * * They do NOT take into account sort order! Call sort() afterward if you are unsure 
    * * whether your collection is still properly sorted 
    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    push: function(item) {
		Array.prototype.push.call(this, item);
		this.index[item.id] = item;
		return this;
	},

	unshift: function(item) {
		Array.prototype.unshift.call(this, item);
		this.index[item.id] = item;
		return this;
	},

	splice: function(pos, num, item) {
		var startPos,
			thisLength = this.length,
			i;

		// remove items from index if removing from array
		if (num) {

			if (pos >= 0) {
				startPos = pos;
			}
			else {
				startPos = Math.max(this.length + pos, 0);
			}

			for (i = startPos; i < startPos + num && i < thisLength; i++) {
				delete this.index[this[i].id];
			}
		}

		// add new item if one is being added to array
		if (item !== undefined) {
			this.index[item.id] = item;
        	return Array.prototype.splice.call(this, pos, num, item);
		}
		else {
			return Array.prototype.splice.call(this, pos, num);
		}
	},

	forEach: Array.prototype.forEach
};

module.exports = SortedCollection;