function mod12(val) {
    return ((val % 12) + 12) % 12;
}

function unique(arr) {
    var hashes = Object.create(null);
    return arr.reduce(function (uniqueValues, value) {
        if (!hashes[value]) {
            uniqueValues.push(value);
            hashes[value] = true;
        }
        return uniqueValues;
    }, []);
}

function sort(arr) {
    var returnValue = arr.slice(0);
    returnValue.sort(function (a, b) { return a - b; });
    return returnValue;
}

function shiftMod12(arr, offset) {
    offset = offset || 0;
    return arr.map(function (x) { return mod12(x + offset); });
}

export default function (values) {
    var set = {};
    values = Array.prototype.slice.call(values || [], 0);

    if (values.length === 0) {
        set.base = NaN;
        set.originalValues = [];
        set.intervals = [];
    } else {
        set.originalValues = values.slice(0);
        values = sort(values);
        values = shiftMod12(values);
        set.base = values[0];
        values = shiftMod12(values, -set.base);
        values = unique(values);
        set.intervals = sort(values);
    }

    return set;
}
