define(["providers/providerHelper", "providers/functionHelper", "providers/functionNameHelper"], function (providerHelper, functionHelper, functionNameHelper) {

    return function(noteSet, language) {

        var returnValue,
            name,
            values,
            chord,
            enharmonicMessage,
            intervalPattern,
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

                /* Hier wird das Pc-Hilfspattern für die Ausgabe erzeugt */
                intervalPattern = noteSet.intervals.join("");

                /* Hier wird die Ausgabe des Namens für Zwei-, Dreik- und Mehrklänge zusammengebaut */
                name = functionNameHelper.getName(values, intervalPattern);

                /* Hier wird die Ausgabe für die Angabe der Enharmonik erzeugt */ 
                enharmonicMessage = functionNameHelper.getEnharmonicMessage(values[0], intervalPattern);

                /* Stetzen einiger Flags für Sonderfälle der Funktionsbestimmung */
                switch (intervalPattern) {
                case "036":
                case "0369":
                    chord = "dmc";
                    break;
                case "0479":
                    chord = "sad";
                    break;
                case "0379":
                    chord = "sam";
                    break;
                default:
                    chord = values[0] + "-" + values[1];
                }

                /* Aufruf der Funktionen für die Angaben zur Funktionstheorie in Dur und Moll */
                majorFunctions = functionHelper.getMajorFunctions(chord, intervalPattern, noteSet);
                minorFunctions = functionHelper.getMinorFunctions(chord, intervalPattern, noteSet);

                /* Hier wird der Rückgabewert zusammengesetzt */
                returnValue = getNameObject(name, enharmonicMessage);
                returnValue += getFunctionObject(chord, majorFunctions, minorFunctions);
                returnValue += getNote();
            }
        } else {
            returnValue = "unbestimmt";
        }
        return language === "de" ? returnValue : null;
    };

    function getNameObject(name, enharmonicRequired) {
        var enharmonicOutput = enharmonicRequired ? "(" + enharmonicRequired + ")</div>" : "";
        return "<div><span style='font-weight:bold;'>Name: </span>" + name + "</br>" + "<span style='color:maroon;font-style:italic;'>" + enharmonicOutput + "</span>";
    }

    function getFunctionObject(chord, majorFunctions, minorFunctions) {
        var value = "<hr/>";
        value += "<div style='font-weight:bold;'>Mögliche Funktionen in C-Dur: </div>";
        value += "<div style='margin-left: 20px;'>" + majorFunctions + "</div>";
        value += "<div style='font-weight:bold;'>Mögliche Funktionen in c-Moll: </div>";
        value += "<div style='margin-left: 20px;'>" + minorFunctions + "</div>";
        return value;
    }

    function getNote() {
        return "<hr/><div style='font-size:0.8em'>Bitte beachten Sie grundsätzlich, dass Funktionssymbole eine Möglichkeit bieten anzugeben, wie ein Akkord gehört bzw. aufgefasst wird. " +
            "Ein a-Moll-Akkord kann beispielsweise in C-Dur rein mechanisch Vertreter der Tonika (Tp) oder der Subdominante (Sg) sein, ein C-Dur kann Tonika in C oder Dominante in F sein. " +
            "Für die Richtigkeit der Chiffrierung ist daher entscheidend, wie der Akkord aufgefasst wird.</div>";
    }
});