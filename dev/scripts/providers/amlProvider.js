define(["providers/providerHelper", "providers/nameHelper"], function(providerHelper, nameHelper) {

    return function(noteSet, language) {

        var returnValue = "",
            intervalNumber,
            name,
            baseName,
            genus,
            bass,
            behavior,
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
                name = bass = baseName;
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
                        chromaticName = name;
                        break;
                }

                returnValue += getAmlObject(intervalNumber, chromaticName, baseName, genus, bass, behavior, intervalName, extensions);
            }
            
            if (noteSet.intervals.length === 2) {
                name = providerHelper.getIntervalName(noteSet.intervals);
                name = nameHelper.getEnharmonicIntervalName(name, noteSet.base);
                returnValue += getAmlObject(intervalNumber, name, baseName, genus, bass, behavior, intervalName, extensions);
            }

            enharmonicMessage = nameHelper.getEnharmonicMessage(providerHelper.getToneName(baseName, "Dur"), "010");

            if (noteSet.intervals.length === 3) {
                name = nameHelper.getName(noteSet.base, noteSet.intervals, noteSet.originalValues);
                bass = providerHelper.getToneName(noteSet.originalValues[0], "Dur");
                returnValue += getAmlObject(intervalNumber, name, null, null, bass, behavior, intervalName, extensions);
            }

            //if (noteSet.intervals.length === 4) {
            //    values = providerHelper.getTriadName(noteSet.base, noteSet.intervals, noteSet.originalValues);
            //    name = nameHelper.getName(values, intervalPattern);

            //    returnValue += getAmlObject(intervalNumber, name, values[0], values[1], baseName, behavior, intervalName, extensions);
            //}

        }

        return language === "de" ? returnValue : null;
    };

    function getAmlObject(intervalNumber, name, base, genus, bass, behavior, intervalName, extensions) {
        var value = "";

        if (intervalNumber === 1) {
            value += "<div><span style='font-weight:bold;'>Tonname:</span> " + name + "</div>";
        }
        else if (intervalNumber === 2) {
            value += "<div><span style='font-weight:bold;'>Intervallname:</span> " + name + "</div>";
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
            if (behavior) {
                value += "<div><span style='font-weight:bold;'>Akkordgestalt:</span></div>";
                value += "<div style='margin-left: 20px;'>" + behavior + "</div>";
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