import expect from "expect.js";
import noteSet from "../src/noteSet";

describe("noteSet function", function() {

    it("should return a defined value.", function() {
        var set = noteSet();
        expect(set).to.be.ok();
    });

    it("should create an empty set if no argument is supplied.", function () {
        var set = noteSet();
        expect(isNaN(set.base)).to.be(true);
        expect(set.originalValues).to.eql([]);
        expect(set.intervals.length).to.be(0);
    });

    it("should create an empty set if an empty array is supplied as argument.", function () {
        var set = noteSet([]);
        expect(isNaN(set.base)).to.be(true);
        expect(set.originalValues).to.eql([]);
        expect(set.intervals.length).to.be(0);
    });

    it("should keep smallest value as base value.", function () {
        var set = noteSet([9, 5, 7, 17, 5]);
        expect(set.base).to.be(5);
    });

    it("should transpose base value to a value between 0 and 11 for values greater than 11.", function () {
        var set = noteSet([14, 16, 18]);
        expect(set.base).to.be(2);
    });

    it("should transpose base value to a value between 0 and 11 for values less than 0.", function () {
        var set = noteSet([-3, 0, 4]);
        expect(set.base).to.be(9);
    });

    it("should normalize and order all values.", function () {
        var set = noteSet([9, 5, 7, 17, 5]);
        expect(set.originalValues).to.eql([9, 5, 7, 17, 5]);
        expect(set.intervals).to.eql([0, 2, 4]);
    });

});
