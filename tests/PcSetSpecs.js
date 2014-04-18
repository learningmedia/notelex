describe("PcSetTable getPcSet function", function() {

    var NoteSet;
    var pcSet;
    var async = new AsyncSpec(this);
    
    async.beforeEach(function (done) {
        require(["noteSet", "providers/pcSet"], function(_NoteSet, _pcSet) {
            NoteSet = _NoteSet;
            pcSet = _pcSet;
            done();
        });
    });

    it("should calculate 0,3,7 for a d major chord.", function () {
        var noteSet = new NoteSet([2, 6, 9]);
        var set = pcSet(noteSet);
        expect(set.fortePrimeForm).toBe("037");
    });

    it("should calculate 0,2,6 for F,G,H.", function () {
        var noteSet = new NoteSet([5, 7, 11]);
        var set = pcSet(noteSet);
        expect(set.fortePrimeForm).toBe("026");
    });

    it("should calculate 0,1,2,3,4,5,6,7,8,9,A for C-C#-D-Eb-E-F-F#-G-Ab-A-Bb.", function () {
        var noteSet = new NoteSet([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        var set = pcSet(noteSet);
        expect(set.fortePrimeForm).toBe("0123456789A");
    });

});
