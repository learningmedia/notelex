define(["providers/providerHelper"], function (providerHelper) {

    return function(noteSet, language) {

            var returnValue = "Grundton: ";
            var base = providerHelper.getToneName(noteSet.base);
            if (base) {
                returnValue += base + "<br/>";
            }
            else{
                returnValue += "unbestimmt<br/>";
            }
            if (noteSet.intervals.length === 3) {
                console.log(noteSet.intervals);
                var values = providerHelper.getGenusAndBehavior(noteSet.intervals);
                returnValue += "<div>"+ 
                "Tongeschlecht: " + values[0] + "<br/>" +
                "Akkordgestalt: " + values[1] + "<br/>" +
                "</div>";
            }

            return language === "de" ? returnValue : null;
        };

});