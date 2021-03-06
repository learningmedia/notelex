import expect from "expect.js";
import noteSet from "../src/noteSet";
import pcSet from "../src/providers/pcSet";

describe("pcSet function", function() {

    it("should calculate an empty PC set set for an empty NoteSet.", function () {
        var notes = noteSet([]);
        var set = pcSet(notes);
        expect(set.fortePrimeForm).to.be("");
    });

    it("should calculate 0,3,7 for a d major chord.", function () {
        var notes = noteSet([2, 6, 9]);
        var set = pcSet(notes);
        expect(set.fortePrimeForm).to.be("037");
    });

    it("should calculate 0,2,6 for F,G,H.", function () {
        var notes = noteSet([5, 7, 11]);
        var set = pcSet(notes);
        expect(set.fortePrimeForm).to.be("026");
    });

    it("should calculate 0,1,2,3,4,5,6,7,8,9,A for C-C#-D-Eb-E-F-F#-G-Ab-A-Bb.", function () {
        var notes = noteSet([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        var set = pcSet(notes);
        expect(set.fortePrimeForm).to.be("0123456789A");
    });

});
