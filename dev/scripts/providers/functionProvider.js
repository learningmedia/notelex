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

                /* Holt die Bestandteile des Namens für die Ausgabe */
                values = providerHelper.getTriadName(noteSet.base, noteSet.intervals, noteSet.originalValues);
                console.log(values[0]);

                /* Ab hier wird die Ausgabe zusammengesetzt */
                if(values[0] === undefined){
                        returnValue = "unbestimmt";
                }
                else
                {
                    var intervalPattern = noteSet.intervals.join("");

                    /* Hier wird die Ausgabe des Namens für Dreiklänge zusammengebaut */
                     if (noteSet.intervals.length === 3) {   
                        switch(intervalPattern){ 
                        case "057":
                            valuesOutput =  values[0] + "-" + values[1] + " " + values[2];
                            enharmonicMessage = providerHelper.enharmonic("057", values[0]) ? " (enharmonische Lesart erforderlich)" : "";
                            break;
                        case "047":
                            valuesOutput = values.join("-");
                            enharmonicMessage = providerHelper.enharmonic("047", values[0]) ? " (enharmonische Lesart erforderlich)" : "";
                            break;
                        case "037":
                            valuesOutput = values.join("-");
                            enharmonicMessage = providerHelper.enharmonic("037", values[0]) ? " (enharmonische Lesart erforderlich)" : "";
                            break;
                         case "067":
                            valuesOutput = values.join("-");
                            enharmonicMessage = providerHelper.enharmonic("067", values[0]) ? " (enharmonische Lesart erforderlich)" : "";
                            break;
                        default: 
                            /* Hier noch einen Default-Value überlegen */                          
                            break;
                        }

                        /* Hierwird die Anmerkung zu Enhamronik gesetzt */
                        name = valuesOutput + enharmonicMessage;

                         /* Aufruf der Funktionen für die Angaben zur Funktionstheorie in Dur und Moll */
                        chord = values[0] + "-" + values[1];
                        majorFunctions = getMajorFunctions(chord, intervalPattern);
                        minorFunctions = getMinorFunctions(chord, intervalPattern);
                        returnValue = getNameObject(name);  
                        returnValue += getFunctionObject(chord, majorFunctions, minorFunctions); 
                    } 
                }                   
            }
            else
            {
                returnValue = "unbestimmt";
            }
            return language === "de" ? returnValue : null;
            
        };

        function getMajorFunctions(chord, intervalPattern){
            console.log(chord);
            switch(chord){
                case "C-Dur":
                    if (intervalPattern === "057") {
                         return "1.) T<sup>4</sup> = Tonika mit Quartvorhalt<br/>2.) (D<sup>4</sup>) S = Dominante (Zwischendominante) mit Quartvorhalt zur Subdominante";
                    }
                    else{
                        return "1.) T = Tonika<br/>2.) (D) S = Dominante (Zwischendominante) zur Subdominante";
                    } 
                case "c-Moll":
                    return "t = Moll-Tonika (in Dur)";
                case "Des-Dur":
                    if (intervalPattern === "038") {
                         return "S<sup>N</sup> = neapolitanische Sextakkord (oder auch nur: Neapolitaner)";
                    }
                    else{
                        return "N = selbständiger Neapolitaner (als Grundakkord)";
                    } 
                case "D-Dur":
                    return "D<span style='position:absolut; margin-left:-6px;'><sub>D</sub></span> = Dominante (Zwischendominante) zur Dominante (= Doppeldominante)";
                case "d-Moll":
                    return "1.) Sp = Parallele der Subdominante (Subdominantparallele)<br/>2.) S<sub>6</sub> = Subdominante mit Sexte im Bass (ohne Quinte)";
                case "Es-Dur":
                    return "1.) tP = Parallelklang der Moll-Tonika (Molltonika-Parallele)";
                case "E-Dur":
                    return "(D) Tp = Dominante (Zwischendominante) zur Tonikaparallele"
                case "e-Moll":
                    return "1.) Tg = Gegenklang zur Tonika (Leittonwechselklang zur Tonika oder Tonikagegenklang)<br/>2.) Dp = Parallele der Dominante (Dominantparallele)";
                case "F-Dur":
                    if (intervalPattern === "067") {
                         return "S<sup>4</sup> = Subdominante mit (übermäßigem) Quartvorhalt";
                    }
                    else{
                        return "S = Subdominante";
                    } 
                case "f-Moll":
                    return "s = Moll-Subdominante (in Dur)";
                case "Fis-Dur":
                    return "(D) Dg = Dominante (Zwischendominante) zum Dominantgegenklang"
                case "G-Dur":
                    if (intervalPattern === "057") {
                         return "D<sup>4</sup> = Dominante mit Quartvorhalt";
                    }
                    else{
                        return "D = Dominante";
                    }  
                case "g-Moll":
                    return "(s D) S = Zwischen-Subdominantparallele bzw. S<sub>6</sub> (mit Sexte im Bass) zur Subdominante"; 
                case "As-Dur":
                    return "1.) tG = Gegenklang der Moll-Tonika (Molltonika-Gegenklang)";    
                case "A-Dur":
                    return "(D) Sp = Dominante (Zwischendominante) zur Subdominantparallele";   
                case "a-Moll":
                    return "1.) Tp = Tonikaparallele<br/>2.) Sg = Gegenklang (Leittonwechselklang) der Subdominante"; 
                case "B-Dur":
                    return "S<span style='position:absolut; margin-left:-6px;'><sub>S</sub></span> = Subdominante zur Subdominante (Doppelsubdominante)";    
                case "H-Dur":
                    return "1.) (D) Tg = Dominante (Zwischendominante) des Tonikagegenklangs (des Leittonwechselklangs)<br/>2.) (D) Dp = Dominante (Zwischendominante) der Dominantparallele";                
                default:
                    return "nicht gebräuchlich";
            }
        }

        function getMinorFunctions(chord, intervalPattern){
            console.log(chord);
            switch(chord){
                case "c-Moll":
                    return "t = Tonika";
                case "C-Dur":
                    if (intervalPattern === "057") {
                         return "1.) T<sup>4</sup> = gleichnamige Durtonart mit Quartvorhalt<br/>2.) (D<sup>4</sup>) s = Dominante (Zwischendominante) mit Quartvorhalt zur Subdominante";
                    }
                    else{
                        return "1.) T = gleichnamige Durtonart</br>2.) (D) s = Dominante (Zwischendominante) zur Subdominante";
                    }
                case "Des-Dur":
                    if (intervalPattern === "038") {
                         return "S<sup>N</sup> = neapolitanische Sextakkord (oder auch nur: Neapolitaner)";
                    }
                    else{
                        return "N = selbständiger Neapolitaner (als Grundakkord)";
                    } 
                case "D-Dur":
                    return "D<span style='position:absolut; margin-left:-6px;'><sub>D</sub></span> = Dominante (Zwischendominante) zur Dominante (= Doppeldominante)";
                case "d-Moll":
                    return "<b>Achtung:</b> In Moll ist d-Moll (bzw. die II. Stufe) kein Subdominantvertreter!";
                case "Es-Dur":
                    return "1.) tP = Parallelklang zur Tonika (Tonikaparallele)<br/>2.) dG = Gegenklang der Moll-Dominante (Molldominantgegenklang)";
                case "e-Moll":
                    return "Dp = Parallelkang der Dominante (bzw. der dominantischen Funktion in der Kadenz)"
                case "f-Moll":
                    return "s = Subdominante";
                case "F-Dur":
                    return "S = Dur-Subdominante (in Moll)";
                case "G-Dur":
                    if (intervalPattern === "057") {
                         return "D<sup>4</sup> = Dominante mit Quartvorhalt";
                    }
                    else{
                        return "D = Dominante (dominantische Funktion in der Kadenz)";
                    } 
                case "g-Moll":
                    return "d = Dominante (als leitereigene Stufe)";
                case "As-Moll":
                    return "tg = Moll-Gegenklang der Tonika (Tonikagegenklang)"; 
                case "As-Dur":
                    return "1.) sP = Parallelklang zur Subdominante (Subdominantparallele)<br/>2.) tG = Gegenklang der Tonika (Tonikagegenklang)"; 
                case "B-Dur":
                    return "S<span style='position:absolut; margin-left:-6px;'><sub>S</sub></span> = Dur-Subdominante der Dur-Subdominante (doppelte Dur-Subdominante in Moll)";
                default:
                    return "nicht gebräuchlich";
            }
        }

        function getNameObject(name){
            return "<div style='font-weight:bold;'>Name: " + name + "</div>" + 
            "<div style='font-size:0.8em'>Bitte beachten Sie grundsätzlich, dass Funktionssymbole angeben sollen, wie ein Akkord gehört bzw. aufgefasst wird. " + 
            "Ein a-Moll-Akkord kann beispielsweise in C-Dur rein mechanisch Vertreter der Tonika (Tp) oder der Subdominante (Sg) sein. " + 
            "Für die Richtigkeit der Chiffrierung ist daher entscheidend, wie der Akkord aufgefasst wird.</div>"
        }

        function getFunctionObject(chord, majorFunctions, minorFunctions){
            var value = "<hr/>";
            value += "<div style='font-weight:bold;'>Mögliche Funktionen in C-Dur: </div>";
            value += "<div style='margin-left: 20px;'>" + majorFunctions + "</div>";
            value += "<div style='font-weight:bold;'>Mögliche Funktionen in c-Moll: </div>";
            value += "<div style='margin-left: 20px;'>" + minorFunctions + "</div>";
            return value;
        }
       
});