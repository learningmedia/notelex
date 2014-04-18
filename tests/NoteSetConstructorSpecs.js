describe("NoteSet constructor function", function() {

    var NoteSet;
    var async = new AsyncSpec(this);
    
    async.beforeEach(function (done) {
        require(["noteSet"], function(_NoteSet) {
            NoteSet = _NoteSet;
            done();
        });
    });

    it("should return an object", function() {
        var result = new NoteSet();
        expect(result).toBeDefined();
    });

    it("should create an empty set if no argument is supplied.", function () {
        var noteSet = new NoteSet();
        expect(isNaN(noteSet.base)).toBe(true);
        expect(noteSet.originalValues).toEqual([]);
        expect(noteSet.intervals.length).toBe(0);
    });

    it("should create an empty set if an empty array is supplied as argument.", function () {
        var noteSet = new NoteSet([]);
        expect(isNaN(noteSet.base)).toBe(true);
        expect(noteSet.originalValues).toEqual([]);
        expect(noteSet.intervals.length).toBe(0);
    });

    it("should keep smallest value as base value.", function () {
        var noteSet = new NoteSet([9, 5, 7, 17, 5]);
        expect(noteSet.base).toBe(5);
    });

    it("should transpose base value to a value between 0 and 11 for values greater than 11.", function () {
        var noteSet = new NoteSet([14, 16, 18]);
        expect(noteSet.base).toBe(2);
    });

    it("should transpose base value to a value between 0 and 11 for values less than 0.", function () {
        var noteSet = new NoteSet([-3, 0, 4]);
        expect(noteSet.base).toBe(9);
    });

    it("should normalize and order all values.", function () {
        var noteSet = new NoteSet([9, 5, 7, 17, 5]);
        expect(noteSet.originalValues).toEqual([9, 5, 7, 17, 5]);
        expect(noteSet.intervals).toEqual([0, 2, 4]);
    });

});
