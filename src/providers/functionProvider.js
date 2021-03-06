import providerHelper from "./providerHelper";
import functionHelper from "./functionHelper";
import nameHelper from "./nameHelper";

export default function(noteSet) {

    var returnValue = "",
        name = "",
        toneName = "",
        chord = "",
        behavior,
        chordParts,
        nameParts,
        enharmonicMessage,
        intervalPattern,
        majorFunctions,
        minorFunctions;

    if (!isNaN(noteSet.base)) {

        /* Internal pattern for searching output */
        intervalPattern = noteSet.intervals.join("");
        if (noteSet.intervals.length === 3) {
            name = nameHelper.getTriadName(noteSet.base, noteSet.intervals, noteSet.originalValues);
            var incompleteName = nameHelper.getIncompletChordName(noteSet.base, noteSet.intervals, noteSet.originalValues);
            if (incompleteName) {
                name = incompleteName;
                nameParts = name.split("#");
                chord = nameParts[1];
                chordParts = chord.split("-");
                toneName = chordParts[0];
                name = nameParts[0] + " " + nameParts[1] + " " + nameParts[2];
            } else {
                chordParts = name.split(" ");
                chord = toneName = chordParts[0];
                behavior = providerHelper.getBehavior(noteSet.intervals.join(""));
                name += " ";
                name += behavior;
            }
        }
        if (noteSet.intervals.length >= 4) {
            name = nameHelper.getChordName(noteSet.base, noteSet.intervals, noteSet.originalValues);
            if (name) {
                nameParts = name.split("#");
                chord = nameParts[1];
                chordParts = chord.split("-");
                toneName = chordParts[0];
                name = nameParts[0] + " " + nameParts[1] + " " + nameParts[2] + " - " + nameParts[3];
            }
        }

        /* Get message for enharmonic */
        enharmonicMessage = nameHelper.getEnharmonicMessage(toneName, intervalPattern);
        
        /* Flag for special cases of function theory */
        switch (intervalPattern) {
            case "036":
            case "039":
            case "069":
                chord = "dmc"; //diminished seven
                break;
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
                break;
        }

        /* Get function-theory output (major and minor mode) */
        majorFunctions = functionHelper.getMajorFunctions(chord, intervalPattern, noteSet);
        minorFunctions = functionHelper.getMinorFunctions(chord, intervalPattern, noteSet);

        name = providerHelper.removeAsterix(name);

        if (noteSet.intervals.length < 3) {
            returnValue = null;
        }
        else {
            /* Connect output parts */
            returnValue = getNameObject(name, enharmonicMessage);
            returnValue += getFunctionObject(chord, majorFunctions, minorFunctions);
            returnValue = providerHelper.getWorkInProgressOutput(name, returnValue);
        }
    }
    
    return returnValue;
}

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
