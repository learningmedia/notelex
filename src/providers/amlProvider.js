import providerHelper from "./providerHelper";
import nameHelper from "./nameHelper";

export default function(noteSet) {

    var returnValue = "",
        intervalNumber,
        name,
        baseName,
        baseAndGenus,
        nameParts,
        genus,
        bass,
        behavior,
        intervalPattern,
        intervalName,
        enharmonicMessage,
        extensions,
        writeExtensions = true;

    if (!isNaN(noteSet.base)) {

        intervalNumber = noteSet.intervals.length;
        intervalPattern = noteSet.intervals.join("");
        baseName = providerHelper.getToneName(noteSet.base, "Dur");

        if (noteSet.intervals.length === 1) {
            name = bass = baseName;
        }

        if (noteSet.intervals.length === 2) {
            name = providerHelper.getIntervalName(noteSet.intervals);
            name = nameHelper.getEnharmonicIntervalName(name, noteSet.base);
        }

        if (noteSet.intervals.length === 3) {
            name = nameHelper.getTriadName(noteSet.base, noteSet.intervals, noteSet.originalValues);
            nameParts = name.split("-");
            switch (name) {
                case "des-Moll":
                case "as-verminderter":
                case "des-verminderter":
                case "Des-übermäßiger":
                case "Des-Dur":
                    nameParts[0] = providerHelper.changeEnharmonicToneName(nameParts[0]);
                    name = nameParts.join("-");
                    break;
            }
            baseName = nameParts[0];
            genus = nameParts[1];
            behavior = providerHelper.getBehavior(intervalPattern);
            extensions = getExtensions(intervalPattern);

            baseName = providerHelper.firstLetterToUpper(baseName, true);
            if (genus === "übermäßiger" || genus === "verminderter") {
                genus = genus.slice(0, -2);
            }
            if (name) {
                bass = providerHelper.getToneName(noteSet.originalValues[0], "Dur");
                bass = getEnharmonicBassToneName(name, bass);
            }
            if (nameParts.length === 2) {
                name = nameParts[0] + "-" + nameParts[1] + " " + behavior;
            } else {
                name = nameParts[0] + " " + nameParts[1] + " " + nameParts[2];
            }
        }

        if (noteSet.intervals.length >= 4) {

            name = nameHelper.getChordName(noteSet.base, noteSet.intervals, noteSet.originalValues);
            nameParts = name.split("#");
            if (nameParts.length === 1) {
                returnValue = null;
                writeExtensions = false;
            } else {
                baseAndGenus = nameParts[1].split("-");
                baseName = baseAndGenus[0];
                baseName = providerHelper.firstLetterToUpper(baseName, true);
                genus = baseAndGenus[1];

                behavior = providerHelper.getBehavior(intervalPattern);
                extensions = getExtensions(intervalPattern);

                if (genus === "übermäßiger" || genus === "verminderter") {
                    genus = genus.slice(0, -2);
                }
                if (name) {
                    bass = providerHelper.getToneName(noteSet.originalValues[0], "Dur");
                }

                name = nameParts[0] + " " + nameParts[1] + " " + nameParts[2] + " " + nameParts[3];
            }
        }

        name = providerHelper.removeAsterix(name);

        if (writeExtensions) {
            enharmonicMessage = nameHelper.getEnharmonicMessage(baseName, intervalPattern);
            if (enharmonicMessage !== "") {
                name += "<br/><span style='color:maroon;font-style:italic;'>" + enharmonicMessage + "</span>";
            }
            returnValue = getAmlObject(intervalNumber, name, baseName, genus, bass, behavior, intervalName, extensions);
        }
    }

    return providerHelper.getWorkInProgressOutput(name, returnValue);
}

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

function getExtensions(pattern) {
    switch (pattern) {
        //half-dominished and dominant 7th chord
        case "04710":
        case "0368":
        case "0359":
        case "0269":
        case "03610":
        case "0379":
        case "0469":
        case "0258":
            return "kleine Septime";
            //minor 7th chord
        case "03710":
        case "0479":
        case "0358":
        case "0259":
            return "kleine Septime bzw. große Sexte";
        case "04711":
        case "0378":
        case "0459":
        case "0158":
        case "03711":
        case "0489":
        case "0458":
        case "0148":
            return "große Septime";
        case "0369":
            return "verminderte Septime";
        case "0247":
        case "03810":
        case "0579":
            return "große Sekunde bzw. große None";
        case "0257":
        case "03510":
        case "0279":
        case "05710":
            return "Quarte (bzw. Quarte und große None)";
        case "024711":
        case "037810":
        case "04579":
        case "01358":
            return "große Septime und große None";
        case "024710":
        case "036810":
        case "03579":
        case "02469":
        case "025810":
            return "kleine Septime und große None";
        default:
            return null;
    }
}

function getEnharmonicBassToneName(name, bass) {
    switch (name) {
        case "E-Dur":
        case "A-Dur":
        case "H-Dur":
        case "Cis-Dur":
        case "cis-Moll":
        case "cis-verminderter":
        case "gis-verminderter":
        case "Cis-übermäßiger":
            return providerHelper.changeEnharmonicToneName(bass);
        default:
            return bass;
    }
}
