import calculationHelper from "../calculationHelper";

function getToneName(midiValue, genus) {

    var normalizedValue = calculationHelper.mod(midiValue, 12);
    var key;
    switch (normalizedValue) {
        case 0:
            key = "C";
            break;
        case 1:
            key = "Des";
            break;
        case 2:
            key = "D";
            break;
        case 3:
            key = "Es";
            break;
        case 4:
            key = "E";
            break;
        case 5:
            key = "F";
            break;
        case 6:
            key = "Fis";
            break;
        case 7:
            key = "G";
            break;
        case 8:
            key = "As";
            break;
        case 9:
            key = "A";
            break;
        case 10:
            key = "B";
            break;
        case 11:
            key = "H";
            break;
        default:
            key = midiValue;
            break;
    }
    return (genus === "Dur" || genus === "übermäßiger") ? key : key.toLowerCase();
}

function getDvToneName(baseToneName) {
    switch (baseToneName) {
        case "Des":
        case "E":
        case "G":
            return "Cis";
        case "des":
        case "e":
        case "g":
            return "cis";
        case "D":
        case "F":
        case "H":
        case "As":
            return "Gis";
        case "d":
        case "f":
        case "h":
        case "as":
            return "gis";
        case "Es":
        case "A":
        case "C":
            return "Fis";
        case "es":
        case "a":
        case "c":
            return "fis";
        default:
            return baseToneName;
    }
}

function getIntervalName(values) {
    //console.log("providerHelper: getEnharmonicMessage({" + values[0] + ", " + values[1] + "})");
    var value = values[1] - values[0];
    switch (value) {
        case 1:
            return "kleine Sekunde";
        case 2:
            return "große Sekunde";
        case 3:
            return "kleine Terz";
        case 4:
            return "große Terz";
        case 5:
            return "Quarte";
        case 6:
            return "Tritonus";
        case 7:
            return "Quinte";
        case 8:
            return "kleine Sexte";
        case 9:
            return "große Sext";
        case 10:
            return "kleine Septime";
        case 11:
            return "große Septime";
        default:
            return "";
    }
}

function getTriadName(base, intervals) {

    var tn9 = getToneName(base + 9, "Moll oder vermindert");

    if (evaluateMidiValues(intervals, [0, 4, 7])) {
        return [getToneName(base, "Dur"), "Dur"];
    }
    if (evaluateMidiValues(intervals, [0, 3, 8])) {
        return [getToneName(base + 8, "Dur"), "Dur"];
    }
    if (evaluateMidiValues(intervals, [0, 5, 9])) {
        return [getToneName(base + 5, "Dur"), "Dur"];
    }
    if (evaluateMidiValues(intervals, [0, 3, 7])) {
        return [getToneName(base, "Moll"), "Moll"];
    }
    if (evaluateMidiValues(intervals, [0, 4, 9])) {
        return [tn9, "Moll"];
    }
    if (evaluateMidiValues(intervals, [0, 5, 8])) {
        return [getToneName(base + 5, "Moll"), "Moll"];
    }
    if (evaluateMidiValues(intervals, [0, 3, 6])) {
        return [getToneName(base, "vermindert"), "verminderter"];
    }
    if (evaluateMidiValues(intervals, [0, 3, 9])) {
        return [tn9, "verminderter"];
    }
    if (evaluateMidiValues(intervals, [0, 6, 9])) {
        return [getToneName(base + 6, "vermindert"), "verminderter"];
    }
    if (evaluateMidiValues(intervals, [0, 4, 8])) {
        return [getToneName(base, "übermäßiger"), "übermäßiger"];
    }

    if (evaluateMidiValues(intervals, [0, 5, 7])) {
        return [getToneName(base, "Dur"), "Dur"];
    }
    if (evaluateMidiValues(intervals, [0, 6, 7])) {
        return [getToneName(base, "Dur"), "Dur"];
    }
    return [];
}

function getChordName(base, intervals) {

    //major 7th chord
    if (evaluateMidiValues(intervals, [0, 4, 7, 11])) {
        return [getToneName(base, "Dur"), "Dur", "großer", "Septakkord", "(major seven)"];
    }
    if (evaluateMidiValues(intervals, [0, 3, 7, 8])) {
        return [getToneName(base + 8, "Dur"), "Dur", "großer", "Septakkord", "(major seven)"];
    }
    if (evaluateMidiValues(intervals, [0, 4, 5, 9])) {
        return [getToneName(base + 5, "Dur"), "Dur", "großer", "Septakkord", "(major seven)"];
    }
    if (evaluateMidiValues(intervals, [0, 1, 5, 8])) {
        return [getToneName(base + 1, "Dur"), "Dur", "großer", "Septakkord", "(major seven)"];
    }

    //dominant 7th chord
    if (evaluateMidiValues(intervals, [0, 4, 7, 10])) {
        return [getToneName(base, "Dur"), "Dur", "kleiner", "Septakkord", "(Dominantseptakkord)"];
    }
    if (evaluateMidiValues(intervals, [0, 3, 6, 8])) {
        return [getToneName(base + 8, "Dur"), "Dur", "kleiner", "Septakkord", "(Dominantseptakkord)"];
    }
    if (evaluateMidiValues(intervals, [0, 3, 5, 9])) {
        return [getToneName(base + 5, "Dur"), "Dur", "kleiner", "Septakkord", "(Dominantseptakkord)"];
    }
    if (evaluateMidiValues(intervals, [0, 2, 6, 9])) {
        return [getToneName(base + 2, "Dur"), "Dur", "kleiner", "Septakkord", "(Dominantseptakkord)"];
    }

    //minor 7th chord
    if (evaluateMidiValues(intervals, [0, 3, 7, 10])) {
        return [getToneName(base, "Moll"), "Moll", "kleiner", "Septakkord", "(auch Sixte ajoutée mit Sexte " + getToneName(base, "Dur") + ")"];
    }
    if (evaluateMidiValues(intervals, [0, 4, 7, 9])) {
        return [getToneName(base + 9, "Moll oder vermindert"), "Moll", "kleiner", "Quintsextakkord", "(auch Sixte ajoutée über " + getToneName(base, "Dur") + " in Grundstellung)"];
    }
    if (evaluateMidiValues(intervals, [0, 3, 5, 8])) {
        return [getToneName(base + 5, "Moll oder vermindert"), "Moll", "kleiner", "Terzquartakkord", "(auch Sixte ajoutée über " + getToneName(base + 8, "Dur") + ")"];
    }
    if (evaluateMidiValues(intervals, [0, 2, 5, 9])) {
        return [getToneName(base + 2, "Moll oder vermindert"), "Moll", "kleiner", "Sekundakkord", "(auch Sixte ajoutée über " + getToneName(base + 5, "Dur") + ")"];
    }

    //half-diminished 7th chord
    if (evaluateMidiValues(intervals, [0, 3, 6, 10])) {
        return [getToneName(base, "Moll oder vermindert"), "verminderter", "kleiner", "Septakkord", "(auch Sixte ajoutée mit Sexte " + getToneName(base, "Dur") + ")"];
    }
    if (evaluateMidiValues(intervals, [0, 3, 7, 9])) {
        return [getToneName(base + 9, "Moll oder vermindert"), "verminderter", "kleiner", "Quintsextakkord", "(auch Sixte ajoutée als Grundakkord)"];
    }
    if (evaluateMidiValues(intervals, [0, 4, 6, 9])) {
        return [getToneName(base + 6, "Moll oder vermindert"), "verminderter", "kleiner", "Terzquartakkord", "(auch Sixte ajoutée mit Sexte " + getToneName(base + 6, "Dur") + ")"];
    }
    if (evaluateMidiValues(intervals, [0, 2, 5, 8])) {
        return [getToneName(base + 2, "Moll oder vermindert"), "verminderter", "kleiner", "Sekundakkord", "(auch Sixte ajoutée mit Sexte " + getToneName(base + 2, "Dur") + ")"];
    }

    //major-minor 7th chord
    if (evaluateMidiValues(intervals, [0, 3, 7, 11])) {
        return [getToneName(base, "Moll"), "Moll", "großer", "Septakkord", "<br/><span style='font-size:0.8em';>(der große " + getToneName(base, "Moll") + "-Moll-Septakkkord ist keine Akkorddissonanz, sondern ein Moll-Dreiklang mit einer großen Septime als Intervalldissonanz)</span)"];
    }
    if (evaluateMidiValues(intervals, [0, 4, 8, 9])) {
        return [getToneName(base + 9, "Moll"), "Moll", "großer", "Quintsextakkord", "<br/><span style='font-size:0.8em';>(der große " + getToneName(base + 9, "Moll") + "-Moll-Septakkkord ist keine Akkorddissonanz, sondern ein Moll-Dreiklang mit einer großen Septime als Intervalldissonanz)</span)"];
    }
    if (evaluateMidiValues(intervals, [0, 4, 5, 8])) {
        return [getToneName(base + 5, "Moll"), "Moll", "großer", "Terzquartakkord", "<br/><span style='font-size:0.8em';>(der große " + getToneName(base + 5, "Moll") + "-Moll-Septakkkord ist keine Akkorddissonanz, sondern ein Moll-Dreiklang mit einer großen Septime als Intervalldissonanz)</span)"];
    }
    if (evaluateMidiValues(intervals, [0, 1, 4, 8])) {
        return [getToneName(base + 1, "Moll"), "Moll", "großer", "Sekundakkord", "<br/><span style='font-size:0.8em';>(der große " + getToneName(base + 1, "Moll") + "-Moll Septakkkord ist keine Akkorddissonanz, sondern ein Moll-Dreiklang mit einer großen Septime als Intervalldissonanz)</span)"];
    }

    //full-diminished 7h chord
    if (evaluateMidiValues(intervals, [0, 3, 6, 9])) {
        return [getToneName(base, "verminderter"), "verminderter", "vermindert", "Septakkord", "(ganzverminderter Septakkord)"];
    }

    //add 2 chord
    if (evaluateMidiValues(intervals, [0, 2, 4, 7])) {
        return [getToneName(base, "Dur"), "Dur", "*", "Dreiklang", "mit hinzugefügter Sekunde/None"];
    }
    if (evaluateMidiValues(intervals, [0, 2, 5, 10])) {
        return [getToneName(base + 10, "Dur"), "Dur", "*", "Dreiklang", "mit hinzugefügter Sekunde/None"];
    }
    if (evaluateMidiValues(intervals, [0, 3, 8, 10])) {
        return [getToneName(base + 8, "Dur"), "Dur", "*", "Dreiklang", "mit hinzugefügter Sekunde/None und Terz im Bass"];
    }
    if (evaluateMidiValues(intervals, [0, 5, 7, 9])) {
        return [getToneName(base + 5, "Dur"), "Dur", "*", "Dreiklang", "mit hinzugefügter Sekunde/None und Quinte im Bass"];
    }

    //add 4 and 9 chord
    if (evaluateMidiValues(intervals, [0, 2, 5, 7])) {
        return [getToneName(base + 7, "Dur"), "Dur", "*", "Septakkord", "mit Quartvorhalt (oder " + getToneName(base, "Dur") + "-Dur mit hinzugefügter Quarte und None)"];
    }
    if (evaluateMidiValues(intervals, [0, 3, 5, 10])) {
        return [getToneName(base + 5, "Dur"), "Dur", "*", "Septakkord", "mit Quartvorhalt (oder " + getToneName(base + 10, "Dur") + "-Dur mit hinzugefügter Quarte und None)"];
    }
    if (evaluateMidiValues(intervals, [0, 2, 7, 9])) {
        return [getToneName(base + 2, "Dur"), "Dur", "*", "Septakkord", "mit Quartvorhalt (oder " + getToneName(base + 7, "Dur") + "-Dur mit hinzugefügter Quarte und None)"];
    }
    if (evaluateMidiValues(intervals, [0, 5, 7, 10])) {
        return [getToneName(base, "Dur"), "Dur", "*", "Septakkord", "mit Quartvorhalt (oder " + getToneName(base + 5, "Dur") + "-Dur mit hinzugefügter Quarte und None)"];
    }

    //major none chord
    if (evaluateMidiValues(intervals, [0, 2, 4, 7, 11])) {
        return [getToneName(base, "Dur"), "Dur", "großer", "Septakkord", "mit großer None"];
    }
    if (evaluateMidiValues(intervals, [0, 3, 7, 8, 10])) {
        return [getToneName(base + 8, "Dur"), "Dur", "großer", "Septakkord", "mit großer None und Terz im Bass"];
    }
    if (evaluateMidiValues(intervals, [0, 4, 5, 7, 9])) {
        return [getToneName(base + 5, "Dur"), "Dur", "großer", "Septakkord", "mit großer None und Quinte im Bass"];
    }
    if (evaluateMidiValues(intervals, [0, 1, 3, 5, 8])) {
        return [getToneName(base + 1, "Dur"), "Dur", "großer", "Septakkord", "mit großer None und Septime im Bass"];
    }
    if (evaluateMidiValues(intervals, [0, 2, 4, 7, 10])) {
        return [getToneName(base, "Dur"), "Dur", "kleiner", "Septakkord", "mit großer None (Dominantseptnonakkord)"];
    }
    if (evaluateMidiValues(intervals, [0, 3, 6, 8, 10])) {
        return [getToneName(base + 8, "Dur"), "Dur", "kleiner", "Septakkord", "mit großer None (Dominantseptnonakkord) und Terz im Bass"];
    }
    if (evaluateMidiValues(intervals, [0, 3, 5, 7, 9])) {
        return [getToneName(base + 5, "Dur"), "Dur", "kleiner", "Septakkord", "mit großer None (Dominantseptnonakkord) und Quinte im Bass"];
    }
    if (evaluateMidiValues(intervals, [0, 2, 4, 6, 9])) {
        return [getToneName(base + 2, "Dur"), "Dur", "kleiner", "Septakkord", "mit großer None (Dominantseptnonakkord) und Septime im Bass"];
    }
    if (evaluateMidiValues(intervals, [0, 2, 5, 8, 10])) {
        return [getToneName(base + 10, "Dur"), "Dur", "kleiner", "Septakkord", "mit großer None (Dominantseptnonakkord) im Bass"];
    }

    return [];
}

function getIncompletChordNames(base, intervals) {
    var tn2 = getToneName(base + 2, "Dur");
    var tn5 = getToneName(base + 5, "Dur");
    var tn8 = getToneName(base + 8, "Dur");
    
    if (evaluateMidiValues(intervals, [0, 3, 6])) {
        return [getToneName(tn8, "Dur"), "Dur", "kleiner", "Septakkord", "(Dominantseptakkord ohne Grundton " + tn8 + " und mit Terz im Bass)"];
    }
    if (evaluateMidiValues(intervals, [0, 3, 9])) {
        return [tn5, "Dur", "kleiner", "Septakkord", "Dominantseptakkord ohne Grundton " + tn5 + " und mit Quinte im Bass"];
    }
    if (evaluateMidiValues(intervals, [0, 6, 9])) {
        return [tn2, "Dur", "kleiner", "Septakkord", "Dominantseptakkord ohne Grundton " + tn2 + " und mit Septime im Bass"];
    }
    if (evaluateMidiValues(intervals, [0, 4, 10])) {
        return [getToneName(base, "Dur"), "Dur", "kleiner", "Septakkord", "(Dominantseptakkord ohne Quinte)"];
    }
    if (evaluateMidiValues(intervals, [0, 7, 10])) {
        return [getToneName(base, "Dur"), "Dur", "kleiner", "Septakkord", "(Dominantseptakkord ohne Terz)"];
    }
    if (evaluateMidiValues(intervals, [0, 3, 5])) {
        return [getToneName(tn5, "Dur"), "Dur", "kleiner", "Septakkord", "(Dominantseptakkord ohne Terz und mit Quinte im Bass)"];
    }
    if (evaluateMidiValues(intervals, [0, 2, 9])) {
        return [getToneName(tn2, "Dur"), "Dur", "kleiner", "Septakkord", "(Dominantseptakkord ohne Terz und mit Septime im Bass)"];
    }
    if (evaluateMidiValues(intervals, [0, 6, 8])) {
        return [getToneName(tn8, "Dur"), "Dur", "kleiner", "Septakkord", "(Dominantseptakkord ohne Quinte und mit Terz im Bass)"];
    }

    if (evaluateMidiValues(intervals, [0, 10])) {
        return [getToneName(base, "Dur"), "Dur", "kleiner", "Septakkord", " (Dominantseptakkord mit Grundton und ohne Terz und Quinte)"];
    }
    if (evaluateMidiValues(intervals, [0, 6])) {
        return [tn8, "Dur", "kleiner", "Septakkord", " (Dominantseptakkord ohne Grundton " + tn8 + ", ohne Quinte und mit Terz im Bass)"];
    }

    return [];
}

function evaluateMidiValues(intervals, searchPattern) {
    if (intervals.length !== searchPattern.length) {
        return false;
    }
    for (var i = 0; i < searchPattern.length; i++) {
        if(intervals.indexOf(searchPattern[i]) === -1){
            return false;
        }
    }
    return true;
}

function enharmonic(intervallPattern, tone) {
    console.log("providerHelper: enharmonic(" + intervallPattern + ", " + tone + ")");

    var toneToLowerCase = tone.toLowerCase();
    switch (intervallPattern) {
        case "06":
            return (toneToLowerCase === "as" || toneToLowerCase === "b" || toneToLowerCase === "h" || toneToLowerCase === "es" || toneToLowerCase === "fis");
        case "036":
            return true;
        case "057":
            return (toneToLowerCase === "des" || toneToLowerCase === "es" || toneToLowerCase === "as");
        case "037":
        case "049":
        case "058":
            return (toneToLowerCase === "f" || toneToLowerCase === "as" || toneToLowerCase === "gis" || toneToLowerCase === "b" || toneToLowerCase === "des" || toneToLowerCase === "es");
        case "038":
        case "047":
        case "059":
            return (toneToLowerCase === "des" || toneToLowerCase === "cis" || toneToLowerCase === "fis" || toneToLowerCase === "as" || toneToLowerCase === "gis" || toneToLowerCase === "h");
        case "010":
        case "04710":
        case "0410":
        case "0710":
        case "4710":
            return (toneToLowerCase === "des" || toneToLowerCase === "es" || toneToLowerCase === "f" || toneToLowerCase === "as" || toneToLowerCase === "b");
        case "04711":
        case "0378":
        case "0459":
        case "0158":
            return (toneToLowerCase === "des" || toneToLowerCase === "e" || toneToLowerCase === "fis" || toneToLowerCase === "as" || toneToLowerCase === "h");
        default:
            return false;
    }
}

function getBehavior(pattern) {
    switch (pattern) {
        case "047":
        case "037":
        case "036":
            return "Quintakkord (Grundstellung)";
        case "038":
        case "049":
        case "039":
            return "Sextakkord (1. Umkehrung)";
        case "059":
        case "058":
        case "069":
            return "Quartsextakkord (2. Umkehrung)";
        case "057":
            return "mit Quartvorhalt";
        case "067":
            return "mit (übermäßigem) Quartvorhalt";
        case "048":
            return "Grundakkord (auch Sext- oder Quartsextakkord, je nach enharmonischer Lesart.";
        case "04711":
        case "04710":
        case "03710":
        case "03610":
        case "0247":
        case "0257":
        case "024711":
        case "024710":
            return "Grundakkord (Grundstellung)";
        case "0378":
        case "0368":
        case "0479":
        case "0379":
            return "Quinsextakkord (1. Umkehrung)";
        case "0459":
        case "0359":
        case "0358":
        case "0469":
            return "Terzquartakkord (2. Umkehrung)";
        case "0158":
        case "0269":
        case "0259":
        case "0258":
            return "Sekundakkord (3. Umkehrung)";
        case "03810":
        case "03510":
        case "02510":
        case "037810":
        case "036810":
            return "1. Umkehrung";
        case "0579":
        case "0279":
        case "03579":
        case "04579":
            return "2. Umkehrung";
        case "05710":
        case "01358":
        case "02469":
            return "3. Umkehrung";
        default:
            return null;
    }
}

function firstLetterToUpper(baseName, toUpperCase) {
    var firstLetter = baseName.charAt(0);
    if (toUpperCase) {
        return firstLetter.toUpperCase() + baseName.slice(1, baseName.lastIndex);
    } else {
        return firstLetter.toLowerCase() + baseName.slice(1, baseName.lastIndex);
    }
}

function changeEnharmonicToneName(baseName) {
    switch (baseName) {
        case "Des":
            return "Cis";
        case "des":
            return "cis";
        case "Es":
            return "Dis";
        case "es":
            return "dis";
        case "Fis":
            return "Ges";
        case "fis":
            return "ges";
        case "As":
            return "Gis";
        case "as":
            return "gis";
        case "B":
            return "Ais";
        case "b":
            return "ais";
        default:
            return baseName;
    }
}

function getWorkInProgressOutput(name, returnValue) {
    if (!returnValue) {
        return returnValue;
    }
    var udf = returnValue.indexOf("undefined");
    var nl = returnValue.indexOf("null");
    if (udf !== -1 || nl !== -1 || name === "") {
        returnValue = null;
    }
    return returnValue;
}

function removeAsterix(name) {
    if (!name) {
        return name;
    }
    var asterix = name.indexOf("*");
    if (asterix !== -1) {
        name = name.slice(asterix + 1, name.length).trim();
    }
    return name;
}

export default {
    getToneName: getToneName,
    getDvToneName: getDvToneName,
    getIntervalName: getIntervalName,
    getTriadName: getTriadName,
    getChordName: getChordName,
    getIncompletChordNames: getIncompletChordNames,
    getBehavior: getBehavior,
    evaluateMidiValues: evaluateMidiValues,
    firstLetterToUpper: firstLetterToUpper,
    changeEnharmonicToneName: changeEnharmonicToneName,
    enharmonic: enharmonic,
    getWorkInProgressOutput: getWorkInProgressOutput,
    removeAsterix: removeAsterix
};
