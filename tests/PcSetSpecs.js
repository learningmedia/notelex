describe("pcSet function", function() {

    var noteSet;
    var pcSet;
    var async = new AsyncSpec(this);
    
    async.beforeEach(function (done) {
        require(["noteSet", "providers/pcSet"], function (_noteSet, _pcSet) {
            noteSet = _noteSet;
            pcSet = _pcSet;
            done();
        });
    });

    it("should calculate an empty PC set set for an empty NoteSet.", function () {
        var notes = noteSet([]);
        var set = pcSet(notes);
        expect(set.fortePrimeForm).toBe("");
    });

    it("should calculate 0,3,7 for a d major chord.", function () {
        var notes = noteSet([2, 6, 9]);
        var set = pcSet(notes);
        expect(set.fortePrimeForm).toBe("037");
    });

    it("should calculate 0,2,6 for F,G,H.", function () {
        var notes = noteSet([5, 7, 11]);
        var set = pcSet(notes);
        expect(set.fortePrimeForm).toBe("026");
    });

    it("should calculate 0,1,2,3,4,5,6,7,8,9,A for C-C#-D-Eb-E-F-F#-G-Ab-A-Bb.", function () {
        var notes = noteSet([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        var set = pcSet(notes);
        expect(set.fortePrimeForm).toBe("0123456789A");
    });

});
