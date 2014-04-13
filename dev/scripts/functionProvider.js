define([], function () {

    var provider = {
        getName: function(language) { return "Funktionstheorie"; },
        getHeader: function(language) { return "FT"; },
        getContent: function(noteSet, language) {
            if (noteSet.intervals.length === 3 && noteSet.intervals[0] === 0 && noteSet.intervals[1] === 4 && noteSet.intervals[2] === 7) {
                return "<div>Dur-Akkord</div>";
            }

            return language === "de" ? "<div>Hello from Funktionstheorie!</div>" : null;
        }
    };

     return provider;
});