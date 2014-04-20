define(["providers/providerHelper"], function (providerHelper) {

    return function(noteSet, language) {

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

            /* Ab hier wird die Ausgabe zusammengesetzt */
            if (values[0] === undefined) {
                returnValue = "unbestimmt";
            }
            else {
                var intervalPattern = noteSet.intervals.join("");

                /* Hier wird die Ausgabe des Namens für Dreiklänge zusammengebaut */
                if (noteSet.intervals.length === 2) {
                    switch (intervalPattern) {
                        case "010":
                            valuesOutput = values[0] + "-" + values[1] + " " + values[2];
                            enharmonicMessage = providerHelper.enharmonic("010", values[0]) ? " - enharmonische Lesart erforderlich" : "";
                            break;
                        default:
                            /* Hier noch einen Default-Value überlegen */
                            break;
                    }
                }

                if (noteSet.intervals.length === 3) {
                    switch (intervalPattern) {
                    case "057":
                        valuesOutput = values[0] + "-" + values[1] + " " + values[2];
                        enharmonicMessage = providerHelper.enharmonic("057", values[0]) ? " - enharmonische Lesart erforderlich" : "";
                        break;
                    case "047":
                        valuesOutput = values.join("-");
                        enharmonicMessage = providerHelper.enharmonic("047", values[0]) ? " - enharmonische Lesart erforderlich" : "";
                        break;
                    case "037":
                        valuesOutput = values.join("-");
                        enharmonicMessage = providerHelper.enharmonic("037", values[0]) ? " - enharmonische Lesart erforderlich" : "";
                        break;
                    case "067":
                        valuesOutput = values.join("-");
                        enharmonicMessage = providerHelper.enharmonic("067", values[0]) ? " - enharmonische Lesart erforderlich" : "";
                        break;
                    case "0410":
                            valuesOutput = values.join("-");
                            enharmonicMessage = providerHelper.enharmonic("0410", values[0]) ? " - enharmonische Lesart erforderlich" : "";
                            break;
                    case "0710":
                        valuesOutput = values.join("-");
                        enharmonicMessage = providerHelper.enharmonic("0710", values[0]) ? " - enharmonische Lesart erforderlich" : "";
                        break;
                    case "036":
                        valuesOutput = values.join("-");
                        enharmonicMessage = providerHelper.enharmonic("036", values[0]) ? " - enharmonische Lesart erforderlich" : "";
                        break;
                    default:
                        /* Hier noch einen Default-Value überlegen */
                        break;
                    }
                }

                if (noteSet.intervals.length === 4) {
                    switch (intervalPattern) {
                    case "04710":
                        valuesOutput = values[0] + "-" + values[1] + " " + values[2];
                        enharmonicMessage = providerHelper.enharmonic("04710", values[0]) ? " - enharmonische Lesart erforderlich" : "";
                        break;
                    default:
                        /* Hier noch einen Default-Value überlegen */
                        break;
                    }
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
        else {
            returnValue = "unbestimmt";
        }
        return language === "de" ? returnValue : null;
        };

    function getMajorFunctions(chord, intervalPattern) {
        var isD7 = d7Value(intervalPattern);
            switch(chord){
                case "C-Dur":
                    if (intervalPattern === "057") {
                         return "1.) T<sup>4</sup> = Tonika mit Quartvorhalt<br/>2.) (D<sup>4</sup>) S = Dominante (Zwischendominante) mit Quartvorhalt der Subdominante";
                    }
                    else if (isD7) {
                        if (intervalPattern === "036") {
                            return "&#92<span style='position: absolut; margin-left:-14px;'>(D<sup>7</sup>) S = Dominantseptakkord ohne Grundton (Zwischendominante) der Subdominante</span>";
                        }
                        return "(D<sup>7</sup>) S = Dominantseptakkord (Zwischendominante) der Subdominante";
                    }
                    else{
                        return "1.) T = Tonika<br/>2.) (D) S = Dominante (Zwischendominante) der Subdominante";
                    } 
                case "c-Moll":
                    return "t = Moll-Tonika (in Dur)";
                case "Des-Dur":
                    if (intervalPattern === "038") {
                         return "S<sup>N</sup> = neapolitanische Sextakkord (oder auch nur: Neapolitaner)";
                    }
                    else if (isD7) {
                        return "(D<span style='position:absolut; margin-left:-6px;'><sub>D</sub><span><sup>6<</sup>) S = übermäßiger Quintsextakkord als Signalakkord (Sub- bzw. Doppeldominante) der Subdominante";
                    }
                    else {
                        return "N = selbständiger Neapolitaner (als Grundakkord)";
                    } 
                case "D-Dur":
                    if (isD7) {
                        if (intervalPattern === "036") {
                            return "&#92<span style='position: absolut; margin-left:-10px;'>D<span style='position: absolut; margin-left:-8px;'><sub>D</sub></span><sup>7</sup> = Dominantseptakkord ohne Grundton der Dominante (verkürzte Doppeldominante zur Dominante)</span>";
                        }
                        return "D<span style='position:absolut; margin-left:-6px;'><sub>D</sub><span><sup>7</sup> = Dominantseptakkord der Dominante (= DoppeldominantSeptakkord)";
                    }
                    return "D<span style='position:absolut; margin-left:-6px;'><sub>D</sub></span> = Dominante der Dominante (= Doppeldominante)";
                case "d-Moll":
                    return "1.) Sp = Parallele der Subdominante (Subdominantparallele)<br/>2.) S<sub>6</sub> = Subdominante mit Sexte im Bass (ohne Quinte)";
                case "Es-Dur":
                    if (isD7) {
                        return "nicht gebräuchlich";
                    }
                    return "tP = Parallelklang der Moll-Tonika (Molltonika-Parallele)";
                case "E-Dur":
                    if (intervalPattern === "036") {
                        return "&#92<span style='position: absolut; margin-left:-14px;'>(D<sup>7</sup>) Tp = Dominantseptakkord ohne Grundton der Parallele der Tonika (verkürzte Zwischendominante zur Tonikaparallele)</span>";
                    }
                    return "(D) Tp = Dominante (Zwischendominante) der Tonikaparallele";
                case "e-Moll":
                    return "1.) Tg = Gegenklang zur Tonika (Leittonwechselklang der Tonika oder Tonikagegenklang)<br/>2.) Dp = Parallele der Dominante (Dominantparallele)";
                case "F-Dur":
                    if (intervalPattern === "067") {
                         return "S<sup>4</sup> = Subdominante mit (übermäßigem) Quartvorhalt";
                    }
                    else if (isD7) {
                        return "(D<sup>7</sup>) S<span style='position:absolut; margin-left:-6px;'><sub>S</sub></span> = Dominante der Doppelsubdominante (Zwischendominante zur Doppelsubdominante)";
                    }
                    else{
                        return "S = Subdominante";
                    } 
                case "f-Moll":
                    return "s = Moll-Subdominante (in Dur)";
                case "Fis-Dur":
                    return "(D) Dg = Dominante des Dominantgegenklangs (Zwischendominante zum Dominantgegenklang)";
                case "G-Dur":
                    if (intervalPattern === "057") {
                         return "D<sup>4</sup> = Dominante mit Quartvorhalt";
                    }
                    else{
                        return "D = Dominante";
                    }  
                case "g-Moll":
                    return "(s D) S = Subdominantparallele bzw. S<sub>6</sub> (mit Sexte im Bass) der Subdominante (Zwischensubdominantparallele zur Subdominante)"; 
                case "As-Dur":
                    return "1.) tG = Gegenklang der Moll-Tonika (Molltonika-Gegenklang)";    
                case "A-Dur":
                    return "(D) Sp = Dominante der Parallele der Subdominante (Zwischendominante zur Subdominantparallele) ";   
                case "a-Moll":
                    return "1.) Tp = Parallele der Tonika (Tonikaparallele)<br/>2.) Sg = Gegenklang der Subdominante (Leittonwechselklang oder Tonikagegenklang)"; 
                case "B-Dur":
                    return "S<span style='position:absolut; margin-left:-6px;'><sub>S</sub></span> = Subdominante der Subdominante (Doppelsubdominante)";    
                case "H-Dur":
                    return "1.) (D) Tg = Dominante des Tonikagegenklangs (Zwischendominante des Tonikagegenklangs/Leittonwechselklangs der Tonika)<br/>2.) (D) Dp = Dominante der Dominantparallele (Zwischendominante zur Dominantparallele)";                
                default:
                    return "nicht gebräuchlich";
            }
        }

    function getMinorFunctions(chord, intervalPattern) {
        var isD7 = d7Value(intervalPattern);
            switch(chord){
                case "c-Moll":
                    return "t = Tonika";
                case "C-Dur":
                    if (intervalPattern === "057") {
                         return "1.) T<sup>4</sup> = gleichnamige Durtonart mit Quartvorhalt<br/>2.) (D<sup>4</sup>) s = Dominante mit Quartvorhalt der Subdominante (Zwischendominante der Subdominante)";
                    }
                    else if (isD7) {
                        if (intervalPattern === "036") {
                            return "&#92<span style='position: absolut; margin-left:-14px;'>(D<sup>7</sup>) s = Dominantseptakkord ohne Grundton der Subdominante (Zwischendominante zur Subdominante)</span>";
                        }
                        return "(D<sup>7</sup>) s = Dominantseptakkord der Subdominante (Zwischendominante zur Subdominante)";
                    }
                    else{
                        return "1.) T = gleichnamige Durtonart</br>2.) (D) s = Dominante der Subdominante (Zwischendominante zur Subdominante)";
                    }
                case "Des-Dur":
                    if (intervalPattern === "038") {
                         return "S<sup>N</sup> = neapolitanische Sextakkord (oder auch nur: Neapolitaner)";
                    }
                    else if (isD7) {
                        return "(D<span style='position:absolut; margin-left:-6px;'><sub>D</sub><span><sup>6<</sup>) s = übermäßiger Quintsextakkord als Signalakkord (Sub- bzw. Doppeldominante) der Subdominante";
                    }
                    else{
                        return "N = selbständiger Neapolitaner (als Grundakkord)";
                    } 
                case "D-Dur":
                    if (isD7) {
                        if (intervalPattern === "036") {
                            return "&#92<span style='position: absolut; margin-left:-10px;'>D<span style='position: absolut; margin-left:-8px;'><sub>D</sub></span><sup>7</sup> = Dominantseptakkord ohne Grundton der Dominante (verkürzte Doppeldominante)</span>";
                        }
                        return "D<span style='position:absolut; margin-left:-6px;'><sub>D</sub><span><sup>7</sup> = Dominantseptakkord der Dominante (= Doppeldominante)";
                    }
                    return "D<span style='position:absolut; margin-left:-6px;'><sub>D</sub></span> = Dominantseptakkord der Dominante (= Doppeldominante)";
                case "d-Moll":
                    return "<b>Achtung:</b> In Moll ist d-Moll (bzw. die II. Stufe) kein Subdominantvertreter!";
                case "Es-Dur":
                    if (isD7) {
                        if (intervalPattern === "036") {
                            return "&#92<span style='position: absolut; margin-left:-14px;'>(D<sup>7</sup>) tG = Dominantseptakkord ohne Grundton des Gegenklangs der Tonika (verkürzte Zwischendominante zum Tonikagegenklang)</span>";
                        }
                        return "(D<sup>7</sup>) tG = Dominantseptakkord des Tonikagegenklangs (Dominante zum Tonikagegenklang)";
                    }
                    return "1.) tP = Parallelklang der Tonika (Tonikaparallele)<br/>2.) dG = Gegenklang der Dominante als leitereigenen Stufe (Dominantgegenklang)";
                case "e-Moll":
                    return "Dp = Parallelkang der Dominante (bzw. der dominantischen Funktion in der Kadenz)";
                case "f-Moll":
                    return "s = Subdominante";
                case "F-Dur":
                    if (isD7) {
                        return "(D<sup>7</sup>) Dp = Dominante der Parallele der Dominante als leitereigenen Stufe (Zwischendominante zur Dominantparallele)";
                    }
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
                    return "tg = vermollter Gegenklang der Tonika (vermollter Tonikagegenklang)"; 
                case "As-Dur":
                    return "1.) sP = Parallelklang der Subdominante (Subdominantparallele)<br/>2.) tG = Gegenklang der Tonika (Tonikagegenklang)"; 
                case "B-Dur":
                    return "S<span style='position:absolut; margin-left:-6px;'><sub>S</sub></span> = Dur-Subdominante der Dur-Subdominante (doppelte Dur-Subdominante in Moll)";
                default:
                    return "nicht gebräuchlich";
            }
        }

        function getNameObject(name) {
            return "<div style='font-weight:bold;'>Name: " + name + "</div>" +
                "<div style='font-size:0.8em'>Bitte beachten Sie grundsätzlich, dass Funktionssymbole angeben sollen, wie ein Akkord gehört bzw. aufgefasst wird. " +
                "Ein a-Moll-Akkord kann beispielsweise in C-Dur rein mechanisch Vertreter der Tonika (Tp) oder der Subdominante (Sg) sein. " +
                "Für die Richtigkeit der Chiffrierung ist daher entscheidend, wie der Akkord aufgefasst wird.</div>";
        }

        function getFunctionObject(chord, majorFunctions, minorFunctions){
            var value = "<hr/>";
            value += "<div style='font-weight:bold;'>Mögliche Funktionen in C-Dur: </div>";
            value += "<div style='margin-left: 20px;'>" + majorFunctions + "</div>";
            value += "<div style='font-weight:bold;'>Mögliche Funktionen in c-Moll: </div>";
            value += "<div style='margin-left: 20px;'>" + minorFunctions + "</div>";
            return value;
        }

    function d7Value(intervalPattern) {
        if (intervalPattern === "04710" || intervalPattern === "0410" || intervalPattern === "0710" || intervalPattern === "036" || intervalPattern === "010") {
            return true;
        }
        else {
            return false;
        }
    }
});