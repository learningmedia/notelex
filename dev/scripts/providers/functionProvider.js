define(["providers/providerHelper"], function (providerHelper) {

    return function(noteSet, language) {

    		var message = " (enharmonische Lesart ist erforderlich)";
            var returnValue, 
            values,
            valuesOutput,
            enharmonicMessage,
            name,
            chord,
            majorFunctions,
            minorFunctions;

            if (!isNaN(noteSet.base)) {

                if (noteSet.intervals.length === 3) {
	                values = providerHelper.getTriadName(noteSet.base, noteSet.intervals);
                    valuesOutput = values.join("-");
                    enharmonicMessage = providerHelper.enharmonic(values[0], values[1]) ? message : "";
                    name = valuesOutput + " " + enharmonicMessage;
                    chord = values[0] + "-" + values[1];
                    majorFunctions = getMajorFunctions(chord);
                    minorFunctions = getMinorFunctions(chord);
                }
                        
                returnValue = getNameObject(name);  
                returnValue += getFunctionObject(chord, majorFunctions, minorFunctions); 
                              
            }
            else{
                returnValue += "unbestimmt";
            }

            return language === "de" ? returnValue : null;
            
        };

        function getMajorFunctions(chord){
            switch(chord){
                case "C-Dur":
                    return "1. T = Tonika<br/>2. (D) S = Zwischendominante zur Subdominante"; 
                default:
                    return chord;
            }
        }

        function getMinorFunctions(chord){
            switch(chord){
                case "C-Dur":
                    return "1. T = Gleichnamige Durtonart</br>2. (D) s = Zwischendominante zur Subdominante"; 
                default:
                    return chord;
            }
        }

        function getNameObject(name){
            return "<div style='font-weight:bold;'>Name: " + name + "</div>";
        }

        function getFunctionObject(chord, majorFunctions, minorFunctions){
            var value = "<hr/>";
            value += "<div style='font-weight:bold;'>Mögliche Funktionen in " + chord + ":</div>";
            value += "<div style='margin-left: 20px;'>" + majorFunctions + "</div>";
            value += "<div style='font-weight:bold;'>Mögliche Funktionen in :</div>";
            value += "<div style='margin-left: 20px;'>" + minorFunctions + "</div>";
            return value;
        }
       
});