define(["providers/providerHelper"], function (providerHelper) {

    return function(noteSet, language) {

    		var message = " (enharmonische Lesart ist erforderlich)";
            var returnValue = "Name: "; 
            if (!isNaN(noteSet.base)) {

	                var values = providerHelper.getTriadName(noteSet.base, noteSet.intervals);
	                var temp = providerHelper.enharmonic(values[0], values[1]) ? message : "";         
	                returnValue += values.join("-") + temp;
                    
            }
            else{
                returnValue += "unbestimmt";
            }

            return language === "de" ? returnValue : null;
        };

});