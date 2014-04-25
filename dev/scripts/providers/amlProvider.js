define(["providers/providerHelper", "providers/nameHelper"], function(providerHelper, nameHelper) {

    return function(noteSet, language) {

        var returnValue = "",
            intervalNumber,
            name,
            baseName,
            genus,
            bass,
            intervalPattern,
            intervalName,
            values,
            enharmonicMessage,
            extensions;

        if (!isNaN(noteSet.base)) {

            /* Get name parts (base, genus, ...) */

            intervalNumber = noteSet.intervals.length;
            intervalPattern = noteSet.intervals.join("");
            baseName = providerHelper.getToneName(noteSet.base, "Dur");

            if (noteSet.intervals.length == 1) {
                name = baseName;
                returnValue += getAmlObject(intervalNumber, name, baseName, genus, bass, intervalName, extensions);
            }
            
            enharmonicMessage = nameHelper.getEnharmonicMessage(providerHelper.getToneName(baseName, "Dur"), "010");

            if (noteSet.intervals.length === 2) {
                intervalName = providerHelper.getIntervalName(noteSet.intervals);
                name = intervalName;
                name += enharmonicMessage != "" ? "<br/><span style='color:maroon; font-style:italic;'>(" + enharmonicMessage + ")</span>" : enharmonicMessage;
                returnValue += getAmlObject(intervalNumber, name, baseName, genus, bass, intervalName, extensions);
            }

            if (noteSet.intervals.length === 3) {
                values = providerHelper.getTriadName(noteSet.base, noteSet.intervals, noteSet.originalValues);
                name = nameHelper.getName(values, intervalPattern);
                bass = providerHelper.getToneName(noteSet.originalValues[0], "Dur");
                returnValue += getAmlObject(intervalNumber, name, values[0], values[1], bass, intervalName, extensions);
            }

            if (noteSet.intervals.length === 4) {
                values = providerHelper.getTriadName(noteSet.base, noteSet.intervals, noteSet.originalValues);
                name = nameHelper.getName(values, intervalPattern);

                returnValue += getAmlObject(intervalNumber, name, values[0], values[1], baseName, intervalName, extensions);
            }

        } else {
            returnValue = "unbestimmt";
        }
        return language === "de" ? returnValue : null;
    };

    function getAmlObject(intervalNumber, name, base, genus, bass, intervalName, extensions) {
        var value = "";

        if (intervalNumber === 1) {
            var chromaticName = "";
            switch (name) {
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
                chromaticName = bass;
                break;
            }
            value += "<div><span style='font-weight:bold;'>Tonname:</span> " + chromaticName + "</div>";
        }
        else if (intervalNumber === 2) {
            value += "<div><span style='font-weight:bold;'>Intervallname:</span> " + intervalName + "</div>";
        }
        else {
            if (name) {
                value += "<div><span style='font-weight:bold;'>Name:</span> " + name + "</div>";
                value += "<hr/>";
            }
            if (base) {
                value += "<div><span style='font-weight:bold;'>Grundton:</span></div>";
                value += "<div style='margin-left: 20px;'>" + base + "</div>";
            }
            if (bass) {
                value += "<div><span style='font-weight:bold;'>Basston:</span></div>";
                value += "<div style='margin-left: 20px;'>" + bass + "</div>";
            }
            if (intervalName) {
                value += "<div><span style='font-weight:bold;'>Intervallname:</span></div>";
                value += "<div style='margin-left: 20px;'>" + intervalName + "</div>";
            }
            if (genus) {
                value += "<div><span style='font-weight:bold;'>Tongeschlecht:</span></div>";
                value += "<div style='margin-left: 20px;'>" + genus + "</div>";
            }
            if (extensions) {
                value += "<div><span style='font-weight:bold;'>Klangzusätze:</span></div>";
                value += "<div style='margin-left: 20px;'>" + extensions + "</div>";
            }
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