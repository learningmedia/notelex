define(["providers/providerHelper", "providers/nameHelper"], function(providerHelper, nameHelper) {

    return function(noteSet, language) {

        var returnValue = "",
            toneName,
            intervalName,
            values,
            enharmonicMessage,
            extensions = "",
            name,
            chord;

        if (!isNaN(noteSet.base)) {

            /* Get name parts (base, genus, ...) */

            var intervalPattern = noteSet.intervals.join("");

            if (noteSet.intervals.length == 1) {
                toneName = providerHelper.getToneName(noteSet.base, "Dur");
                name = toneName;
                returnValue += getAmlObject(name, chord, null, null, toneName, intervalName, extensions);
            }

            if (noteSet.intervals.length === 2) {
                intervalName = providerHelper.getIntervalName(noteSet.intervals);
                name = intervalName;
                intervalPattern = noteSet.intervals.join("");
                console.log("amlProvider: noteSet.intervals.length === 2 " + intervalName + " " + intervalPattern + " " + noteSet.intervals[0]);

                switch (intervalPattern) {
                case "010":
                    enharmonicMessage = providerHelper.enharmonic("010", providerHelper.getToneName(noteSet.intervals[0], "Dur")) ? " - enharmonische Lesart erforderlich" : "";
                    break;
                default:
                    /* Hier noch einen Default-Value überlegen */
                    break;
                }

                returnValue += getAmlObject(name, chord, null, null, toneName, intervalName, extensions);
            }

            if (noteSet.intervals.length === 3) {
                
                intervalPattern = noteSet.intervals.join("");
                values = providerHelper.getTriadName(noteSet.base, noteSet.intervals, noteSet.originalValues);
                var message = providerHelper.enharmonic(intervalPattern, values[0]) ? "<br/><span style='color:maroon; font-style:italic;'>(enharmonische Lesart erforderlich)</span>" : "";
               
                if (values && values.length >= 1) {
                    chord = values[0] + "-" + values[1];
                    name = chord;
                    name += " " + message;
                }

                returnValue += getAmlObject(name, chord, values[0], values[1], toneName, intervalName, extensions);
            }

            if (noteSet.intervals.length === 4) {
                values = providerHelper.getTriadName(noteSet.base, noteSet.intervals, noteSet.originalValues);
                switch (intervalPattern) {
                case "04710":
                    enharmonicMessage = providerHelper.enharmonic("04710", values[0]) ? " - enharmonische Lesart erforderlich" : "";
                    break;
                default:
                    /* Hier noch einen Default-Value überlegen */
                    break;
                }

                if (values && values.length >= 1) {
                    chord = values[0] + "-" + values[1];
                }
                returnValue += getAmlObject(name, chord, values[0], values[1], toneName, intervalName, extensions);
            }

        } else {
            returnValue = "unbestimmt";
        }
        return language === "de" ? returnValue : null;
    };

    function getAmlObject(name, chord, base, genus, toneName, intervalName, extensions) {
        var value = "";
        console.log(name, toneName);
        if (name) {
            value += "<div><span style='font-weight:bold;'>Name:</span> " + name + "</div>";
            value += "<hr/>";
        } 
        else if (toneName) {
            var chromaticName = "";
            switch (toneName) {
            case "Des":
                chromaticName = "Cis / Des";
                break;
            case "Es":
                chromaticName = "Dis / Es";
                break;
            case "Fis":
                chromaticName = "Fis / Ges";
                break;
            case "As":
                chromaticName = "Gis / As";
                break;
            case "B":
                chromaticName = "Ais / B";
                break;
            default:
                chromaticName = toneName;
                break;
            }
            value += "<div><span style='font-weight:bold;'>Tonname:</span> " + chromaticName + "</div>";
            value += "<hr/>";
        } 
        else {
            value += "<div><span style='font-weight:bold;'>Name:</span> - </div>";
            value += "<hr/>";
        }
        if (base) {
            value += "<div><span style='font-weight:bold;'>Grundton:</span></div>";
            value += "<div style='margin-left: 20px;'>" + base + "</div>";
        }
        if (toneName && (name != toneName)) {
            value += "<div><span style='font-weight:bold;'>Tonname:</span></div>";
            value += "<div style='margin-left: 20px;'>" + toneName + "</div>";
        }
        if (intervalName && (name != intervalName)) {
            value += "<div><span style='font-weight:bold;'>Intervallname:</span></div>";
            value += "<div style='margin-left: 20px;'>" + intervalName + "</div>";
        }
        if(genus) {
            value += "<div><span style='font-weight:bold;'>Tongeschlecht:</span></div>";
            value += "<div style='margin-left: 20px;'>" + genus + "</div>";
        }
        if (extensions) {
            value += "<div><span style='font-weight:bold;'>Klangzusätze:</span></div>";
            value += "<div style='margin-left: 20px;'>" + extensions + "</div>";
        }
        return value;
    }

    function d7Value(intervalPattern) {
        if (intervalPattern === "04710" || intervalPattern === "0410" || intervalPattern === "0710" || intervalPattern === "036" || intervalPattern === "010") {
            return true;
        } else {
            return false;
        }
    }
});