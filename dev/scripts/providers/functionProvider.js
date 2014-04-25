define(["providers/providerHelper", "providers/functionHelper", "providers/nameHelper"], function (providerHelper, functionHelper, nameHelper) {

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

            /* Get name parts for the header of the HTML output */
            values = providerHelper.getTriadName(noteSet.base, noteSet.intervals, noteSet.originalValues);

            /* Compose the function theory output */
            if (values[0] === undefined) {
                returnValue = "unbestimmt";
            }
            else {

                /* Internal pattern for searching output */
                intervalPattern = noteSet.intervals.join("");

                /* Get name for intervals an chords */
                name = nameHelper.getName(values, intervalPattern);

                /* Get message for enharmonic */
                enharmonicMessage = nameHelper.getEnharmonicMessage(values[0], intervalPattern);
                //console.log("functionProvider: nameHelper.getEnharmonicMessage("+ values[0] + ", " + intervalPattern + ")" + " = " + enharmonicMessage);

                /* Flag for special cases of function theory */
                switch (intervalPattern) {
                case "036":
                case "039":
                case "069":
                case "0369":
                    chord = "dmc"; //diminished seven
                    break;
                case "0479":
                    chord = "sad"; //sixte ajoutée in major mode
                    break;
                case "0379":
                    chord = "sam"; //sixte ajoutée in minor mode
                    break;
                default:
                    chord = values[0] + "-" + values[1];
                    break;
                }

                /* Get function-theory output (major and minor mode) */
                majorFunctions = functionHelper.getMajorFunctions(chord, intervalPattern, noteSet);
                minorFunctions = functionHelper.getMinorFunctions(chord, intervalPattern, noteSet);

                /* Link outout parts */
                returnValue = getNameObject(name, enharmonicMessage);
                returnValue += getFunctionObject(chord, majorFunctions, minorFunctions);
                returnValue += getNote();
            }
        }
        else {
            returnValue = "unbestimmt";
        }
        return language === "de" ? returnValue : null;
    };

    function getNameObject(name, enharmonic) {
        var enharmonicOutput = enharmonic ? "(" + enharmonic + ")</div>" : "";
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