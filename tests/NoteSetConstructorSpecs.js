describe("noteSet function", function() {

    var noteSet;
    var async = new AsyncSpec(this);
    
    async.beforeEach(function (done) {
        require(["noteSet"], function(_noteSet) {
            noteSet = _noteSet;
            done();
        });
    });

    it("should return a defined value.", function() {
        var set = noteSet();
        expect(set).toBeDefined();
    });

    it("should create an empty set if no argument is supplied.", function () {
        var set = noteSet();
        expect(isNaN(set.base)).toBe(true);
        expect(set.originalValues).toEqual([]);
        expect(set.intervals.length).toBe(0);
    });

    it("should create an empty set if an empty array is supplied as argument.", function () {
        var set = noteSet([]);
        expect(isNaN(set.base)).toBe(true);
        expect(set.originalValues).toEqual([]);
        expect(set.intervals.length).toBe(0);
    });

    it("should keep smallest value as base value.", function () {
        var set = noteSet([9, 5, 7, 17, 5]);
        expect(set.base).toBe(5);
    });

    it("should transpose base value to a value between 0 and 11 for values greater than 11.", function () {
        var set = noteSet([14, 16, 18]);
        expect(set.base).toBe(2);
    });

    it("should transpose base value to a value between 0 and 11 for values less than 0.", function () {
        var set = noteSet([-3, 0, 4]);
        expect(set.base).toBe(9);
    });

    it("should normalize and order all values.", function () {
        var set = noteSet([9, 5, 7, 17, 5]);
        expect(set.originalValues).toEqual([9, 5, 7, 17, 5]);
        expect(set.intervals).toEqual([0, 2, 4]);
    });

});
