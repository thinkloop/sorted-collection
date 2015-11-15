var SortedCollection = function()  {
	this.index = {};
	this.sortDefinition = [{ property: 'id', direction: 'asc' }];
	this.length = 0;
	return this;
};

SortedCollection.prototype = {
    
    push: function(item) {
		Array.prototype.push.call(this, item);
		this.index[item.id] = item;
	},

	unshift: function(item) {
		Array.prototype.unshift.call(this, item);
		this.index[item.id] = item;
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

	forEach: Array.prototype.forEach,

	clear: function() {
		var sortDefinition = this.sortDefinition;
		this.init();
		this.sortDefinition = sortDefinition;
		return this;
	},

	new: function(obj) {
		return obj || {};
	},

	sort: function() {
		Array.prototype.sort.call(this, this.compare.bind(this));
		return this;
	},

	insert: function(item) {
		var position = Math.abs(this.findPosition(item));
		this.splice(position, 0, item);
		return position;
	},

	remove: function(item) {
		var itemPosition,
			removedItem;

		itemPosition = this.findPosition(item);

		if (itemPosition < 0 || item.id !== this[itemPosition].id) {
			itemPosition = this.brutePosition(item);
			if (itemPosition < 0) {
				return null;
			}
		}

		removedItem = this.splice(itemPosition, 1)[0];

		return removedItem;
	},

	getByID: function(id) {
		return this.index[id];
	},

	populate: function(arr, reverse) {
        var addFunction = !reverse ? this.push.bind(this) : this.unshift.bind(this),
        	i;

		this.clear();

        if (arr && arr.length) {
            for (i = 0; i < arr.length; i++) {
                addFunction(this.new(arr[i]));
            }
        }

        return this;
    },

	// returns the position in the array that the item was found in, or the position the item would be in with a negative sign (for example if the new item would go into position 6, return would be: -6)
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

	brutePosition: function(item) {
		var position = -1,
			length = this.length,
			i;

		for (i = 0; i < length; i++) {
			if (item.id === this[i].id) {
				position = i;
				break;
			}
		}

		return position;
	},

	// compare two objects based on the sortDefinition and return -1, 1, 0 if the first object is smaller, larger or equal to the second obj, respectively
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
	}
};

module.exports = SortedCollection;