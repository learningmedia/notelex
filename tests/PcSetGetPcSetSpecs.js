describe("PcSetTable getPcSet function", function() {

    var NoteSet;
    var PcSetTable;
    var async = new AsyncSpec(this);
    
    async.beforeEach(function (done) {
        require(["noteSet", "pcSetTable"], function(_NoteSet, _PcSetTable) {
            NoteSet = _NoteSet;
            PcSetTable = _PcSetTable;
            done();
        });
    });

    it("should calculate 0,3,7 for a d major chord.", function () {
        var noteSet = new NoteSet([2, 6, 9]);
        var pcSet = PcSetTable.getPcSet(noteSet);
        expect(pcSet.fortePrimeForm).toBe("037");
    });

    it("should calculate 0,2,6 for F,G,H.", function () {
        var noteSet = new NoteSet([5, 7, 11]);
        var pcSet = PcSetTable.getPcSet(noteSet);
        expect(pcSet.fortePrimeForm).toBe("026");
    });

    it("should calculate 0,1,2,3,4,5,6,7,8,9,A for C-C#-D-Eb-E-F-F#-G-Ab-A-Bb.", function () {
        var noteSet = new NoteSet([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        var pcSet = PcSetTable.getPcSet(noteSet);
        expect(pcSet.fortePrimeForm).toBe("0123456789A");
    });

});
