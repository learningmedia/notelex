define(["providers/pcSetTable", "lodash"], function (primeFormTable, _) {

    function getPcSet(noteSet) {
        // get all permutations of the input array:
        var intervallArr = getAllNormalOrders(noteSet.intervals);

        // from all last items in each permutation: the smallest number:
        var allLastValues = _.map(intervallArr, function(x) {
            return _.last(x);
        });
        var minInterval = _.min(allLastValues);

        // all permutations where the last item equals 'minInterval' (= most compact form):
        var selection = _.filter(intervallArr, function(x) {
            return _.last(x) === minInterval;
        });

        // all most compact forms and their inversions:
        var selectionInclInversions = selection.concat(_.map(selection, function(x) {
            return createInversion(x);
        }));

        // the best one (= smallest intervals at the left side == PRIME FORM):
        var primeForm = getBestNormalOrder(selectionInclInversions);
        return lookupPcSet(primeForm);
    }

    function lookupPcSet(primeForm) {
        var numbersAsStrings = _.map(primeForm, function(x) {
            return x.toString(16).toUpperCase();
        });
        var setAsString = _.reduce(numbersAsStrings, function(x, y) {
            return x + y;
        }, "");
        return primeFormTable[setAsString] || null;
    }

    function getAllNormalOrders(orderedSet) {
        var length = orderedSet.length;
        var result = [orderedSet];
        for (var i = 1; i < length; i++) {
            var first = _.first(orderedSet);
            var rest = _.rest(orderedSet);
            var newInitialValue = _.first(rest);
            var nextPermutation = _.map(rest, function(x) {
                return x - newInitialValue;
            }).concat(first - newInitialValue + 12);
            result.push(nextPermutation);
            orderedSet = nextPermutation;
        }

        return result;
    }

    function createInversion(orderedSet) {
        var biggestValue = _.last(orderedSet);
        return _.map(orderedSet.slice(0).reverse(), function(x) {
            return biggestValue - x;
        });
    }

    function getBestNormalOrder(selection) {
        var valuesToCompare = [];
        for (var i = 0; i < selection.length; i++) {
            valuesToCompare.push(_.map(selection[i], function(x) {
                return x < 10 ? "0" + x : "" + x;
            }).toString());
        }

        var best = valuesToCompare.sort()[0];
        return _.map(best.split(","), function(x) {
            return parseInt(x);
        });
    }

    return getPcSet;

});
