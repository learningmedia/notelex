define(["providers/providerHelper"], function (providerHelper) {

    return function(noteSet, language) {

        var returnValue,
            values,
            valuesOutput,
            enharmonicMessage,
            name,
            chord;

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
                valuesOutput = values[0] + "-" + values[1] + " " + values[2];
                if (noteSet.intervals.length === 2) {
                    switch (intervalPattern) {
                        case "010":                         
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
                        enharmonicMessage = providerHelper.enharmonic("057", values[0]) ? " - enharmonische Lesart erforderlich" : "";
                        break;
                    case "047":
                        enharmonicMessage = providerHelper.enharmonic("047", values[0]) ? " - enharmonische Lesart erforderlich" : "";
                        break;
                    case "037":
                        enharmonicMessage = providerHelper.enharmonic("037", values[0]) ? " - enharmonische Lesart erforderlich" : "";
                        break;
                    case "067":
                        enharmonicMessage = providerHelper.enharmonic("067", values[0]) ? " - enharmonische Lesart erforderlich" : "";
                        break;
                    case "048":
                        enharmonicMessage = providerHelper.enharmonic("048", values[0]) ? " - enharmonische Lesart erforderlich" : "";
                        break;
                    case "0410":
                        enharmonicMessage = providerHelper.enharmonic("0410", values[0]) ? " - enharmonische Lesart erforderlich" : "";
                        break;
                    case "0710":
                        enharmonicMessage = providerHelper.enharmonic("0710", values[0]) ? " - enharmonische Lesart erforderlich" : "";
                        break;
                    case "036":
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
                returnValue = getNameObject(name);
                returnValue += getFunctionObject(chord, values[0], values[1]);
            }
            }
        else {
            returnValue = "unbestimmt";
        }
        return language === "de" ? returnValue : null;
        };
    
        function getNameObject(name) {
            return "<div style='font-weight:bold;'>Name: " + name + "</div>";
        }

        function getFunctionObject(chord, base, genus, extensions){
            var value = "<hr/>";
            value += "<div style='font-weight:bold;'>Grundton: </div>";
            value += "<div style='margin-left: 20px;'>" + base + "</div>";
            value += "<div style='font-weight:bold;'>Tongeschlecht: </div>";
            value += "<div style='margin-left: 20px;'>" + genus + "</div>";
            value += "<div style='font-weight:bold;'>Dissonanzen:</div>";
            value += "<div style='margin-left: 20px;'>" + extensions + "</div>";
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