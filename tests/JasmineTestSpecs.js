describe("NoteSet", function() {
    var NoteSet;
    var async = new AsyncSpec(this);
    
    async.beforeEach(function(done) {
        if (!NoteSet) {
            require(["noteSet"], function(_NoteSet) {
                NoteSet = _NoteSet;
                done();
            });
        }
    });

    it("should add 1 and 2", function() {
        var result = new NoteSet();
        expect(result).toBeDefined();
    });
});
