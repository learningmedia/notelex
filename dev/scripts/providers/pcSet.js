define(["providers/pcSetTable"], function (pcSetTable) {

    function min(arr) {
        if (arr.length === 0) {
            throw new Error("The array is empty");
        } else if (arr.length === 1) {
            return arr[0];
        } else {
            return arr.reduce(function (a, b) { return a < b ? a : b; });
        }
    }

    function lookupPcSet(primeForm) {
        var setAsString = primeForm
            .map(function(x) {
                return x.toString(16).toUpperCase();
            })
            .join("");
        return pcSetTable[setAsString] || null;
    }

    function nextPermutation(orderedSet) {
        var first = orderedSet[0];
        var rest = orderedSet.slice(1);
        var newInitialValue = rest[0];
        return rest
            .map(function (x) { return x - newInitialValue; })
            .concat(first - newInitialValue + 12);
    }

    function getAllNormalOrders(orderedSet) {
        var permutations = [orderedSet];
        for (var i = 1; i < orderedSet.length; i++) {
            permutations.push(nextPermutation(permutations[permutations.length - 1]));
        }

        return permutations;
    }

    function createInversion(orderedSet) {
        var biggestValue = orderedSet[orderedSet.length - 1];
        return orderedSet.slice(0).reverse().map(function(x) {
            return biggestValue - x;
        });
    }

    function getBestNormalOrder(selection) {
        var valuesToCompare = [];
        for (var i = 0; i < selection.length; i++) {
            valuesToCompare.push(selection[i].map(function(x) {
                return x < 10 ? "0" + x : "" + x;
            }).join(","));
        }

        valuesToCompare.sort();
        var best = valuesToCompare[0];
        return best.split(",").map(function (x) {
            return parseInt(x);
        });
    }

    return function (noteSet) {
        if (noteSet.intervals.length === 0) {
            return pcSetTable[""];
        };

        // get all permutations of the input array:
        var intervallArr = getAllNormalOrders(noteSet.intervals);

        // from all last items in each permutation: the smallest number:
        var allLastValues = intervallArr.map(function(x) {
            return x[x.length - 1];
        });
        var minInterval = min(allLastValues);

        // all permutations where the last item equals 'minInterval' (= most compact form):
        var selection = intervallArr.filter(function(x) {
            return x[x.length - 1] === minInterval;
        });

        // all most compact forms and their inversions:
        var selectionInclInversions = selection.concat(selection.map(function(x) {
            return createInversion(x);
        }));

        // the best one (= smallest intervals at the left side == PRIME FORM):
        var primeForm = getBestNormalOrder(selectionInclInversions);
        return lookupPcSet(primeForm);
    };

});
