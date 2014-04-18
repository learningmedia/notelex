define(["providers/providerHelper"], function (providerHelper) {

    return function(noteSet, language) {
    		console.log(noteSet.base);
            var returnValue = "Name: ";
            if (noteSet.base) {
                if (noteSet.intervals.length === 3) {
                returnValue += providerHelper.getTriadName(noteSet.base, noteSet.intervals).join("-");
            	}
            }
            else{
                returnValue += "unbestimmt";
            }

            return language === "de" ? returnValue : null;
        };

});