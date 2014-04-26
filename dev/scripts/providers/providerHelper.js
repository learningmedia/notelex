define(["calculationHelper"], function (calculationHelper) {

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
                return "übermäßige Quarte / verminderte Quinte";
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

    function getTriadName(base, intervals, originalValues) {

        var tn8 = getToneName(base + 8, "Dur");
        var tn9 = getToneName(base + 9, "Moll oder vermindert");

        if (evaluateMidiValues(intervals, [0, 4, 7])) {
            return [getToneName(base, "Dur"), "Dur", "Quintakkord (Grundstellung)"];
        }
        if (evaluateMidiValues(intervals, [0, 3, 8])) {
            return [tn8, "Dur", "Sextakkord (1. Umkehrung)"];
        }
        if (evaluateMidiValues(intervals, [0, 5, 9])) {
            return [getToneName(base + 5, "Dur"), "Dur", "Quartsextakkord (2. Umkehrung)"];
        }
        if (evaluateMidiValues(intervals, [0, 3, 7])) {
            return [getToneName(base, "Moll"), "Moll", "Quintakkord (Grundstellung)"];
        }
        if (evaluateMidiValues(intervals, [0, 4, 9])) {
            return [tn9, "Moll", "Sextakkord (1. Umkehrung)"];
        }
        if (evaluateMidiValues(intervals, [0, 5, 8])) {
            return [getToneName(base + 5, "Moll"), "Moll", "Quartsextakkord (2. Umkehrung)"];
        }
        if (evaluateMidiValues(intervals, [0, 3, 6])) {
            return [getToneName(base, "vermindert"), "verminderter", "Quintakkord (Grundstellung)"];
        }
        if (evaluateMidiValues(intervals, [0, 3, 9])) {
            return [tn9, "verminderter", "Sextakkord (1. Umkehrung)"];
        }
        if (evaluateMidiValues(intervals, [0, 6, 9])) {
            return [tn9, "verminderter", "Quartsextakkord (2. Umkehrung)"];
        }
        if (evaluateMidiValues(intervals, [0, 4, 8])) {
            return [getToneName(base, "übermäßiger"), "übermäßiger", "Grundakkord (auch Sext- oder Quartsextakkord, je nach enharmonischer Lesart."];
        }

        if (evaluateMidiValues(intervals, [0, 5, 7])) {
            return [getToneName(base, "Dur"), "Dur", "mit Quartvorhalt"];
        }
        if (evaluateMidiValues(intervals, [0, 6, 7])) {
            return [getToneName(base, "Dur"), "Dur", "mit (übermäßigem) Quartvorhalt"];
        }
        return [];
    }

    function getTetradName(base, intervals, originalValues) {

        var tn8 = getToneName(base + 8, "Dur");
        var tn9 = getToneName(base + 9, "Moll oder vermindert");

        if (evaluateMidiValues(intervals, [0, 3, 7, 9])) {
            return [tn9, "verminderter", "kleiner", "Quintsextakkord", " / Sixte ajoutée über " + getToneName(base, "Moll"), "Grundstellung"];
        }

        if (evaluateMidiValues(intervals, [0, 4, 7, 9])) {
            return [tn9, "Moll", "kleiner", "Quintsextakkord", " / Sixte ajoutée über " + getToneName(base, "Dur"), "Grundstellung"];
        }

        //dominant 7th chord
        if (evaluateMidiValues(intervals, [0, 4, 7, 10])) {
            return [getToneName(base, "Dur"), "Dur", "kleiner", "Septakkord", "Dominantseptakkord", "Grundstellung"];
        }
        if (evaluateMidiValues(intervals, [0, 3, 6, 8])) {
            return [tn8, "Dur", "kleiner", "Septakkord", "Dominantseptakkord", "Quintsextakkord bzw. 1. Umkehrung"];
        }
        if (evaluateMidiValues(intervals, [0, 3, 5, 9])) {
            return [tn8, "Dur", "kleiner", "Septakkord", "Dominantseptakkord", "Terzquartakkord bzw. 2. Umkehrung"];
        }
        if (evaluateMidiValues(intervals, [0, 2, 6, 9])) {
            return [tn8, "Dur", "kleiner", "Septakkord", "Dominantseptakkord", "Sekundakkord bzw. 3. Umkehrung"];
        }

        //
        if (evaluateMidiValues(intervals, [0, 3, 6, 9])) {
            return [getToneName(base, "Dur"), "vermindert", "verminderter Septakkord"];
        }

        return [];
    }

    function getIncompletChordNames(base, intervals, originalvalues) {

        var tn2 = getToneName(base + 2, "Dur");
        var tn5 = getToneName(base + 5, "Dur");
        var tn8 = getToneName(base + 8, "Dur");
        
        if (evaluateMidiValues(intervals, [0, 3, 6])) {
            return [getToneName(tn8, "Dur"), "Dur", "kleiner", "Septakkord", "(Dominantseptakkord ohne Grundton " + tn8 + " mit Terz im Bass)"];
        }
        if (evaluateMidiValues(intervals, [0, 3, 9])) {
            return [tn5, "Dur", "kleiner", "Septakkord", "Dominantseptakkord ohne Grundton " + tn5 + " mit Quinte im Bass"];
        }
        if (evaluateMidiValues(intervals, [0, 6, 9])) {
            return [tn2, "Dur", "kleiner", "Septakkord", "Dominantseptakkord ohne Grundton " + tn2 + " mit Septime im Bass"];
        }
        if (evaluateMidiValues(intervals, [0, 4, 10])) {
            return [getToneName(base, "Dur"), "Dur", "kleiner", "Septakkord", "(Dominantseptakkord ohne Quinte)"];
        }
        if (evaluateMidiValues(intervals, [0, 7, 10])) {
            return [getToneName(base, "Dur"), "Dur", "kleiner", "Septakkord", "(Dominantseptakkord ohne Terz)"];
        }

        if (evaluateMidiValues(intervals, [0, 10])) {
            return [getToneName(base, "Dur"), "Dur", "kleiner", "Septakkord", " (Dominantseptakkord mit Grundton " + getToneName(base, "Dur") + " ohne Terz und Quinte)"];
        }
        if (evaluateMidiValues(intervals, [0, 6])) {
            return [tn8, "Dur", "kleiner", "Septakkord", " (Dominantseptakkord ohne Grundton " + tn8 + ", ohne Quinte " + getToneName(base + 3, "Dur") + " und mit Terz im Bass)"];
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
                if (toneToLowerCase === "as" || toneToLowerCase === "b" || toneToLowerCase === "h" || toneToLowerCase === "es" || toneToLowerCase === "fis") {
                    return true;
                }
                else {
                    return false;
                }
            case "036":
                return true;
            case "057":
                if (toneToLowerCase === "des" || toneToLowerCase === "es" || toneToLowerCase === "as") {
                    return true;
                }
                else{
                    return false;
                }
            case "037":
            case "049":
            case "058":
                if (toneToLowerCase === "f" || toneToLowerCase === "as" || toneToLowerCase === "b" || toneToLowerCase === "des" || toneToLowerCase === "es") {
                    return true;
                }
                else {
                    return false;
                }
            case "038":
            case "047":
            case "059":
                if(toneToLowerCase === "des" || toneToLowerCase === "fis" || toneToLowerCase === "as" || toneToLowerCase === "h"){
                    return true;
                }
                else{
                    return false;
                }
            case "010":
            case "04710":
            case "0410":
            case "0710":
            case "4710":
                if (toneToLowerCase === "des" || toneToLowerCase === "es" || toneToLowerCase === "f" || toneToLowerCase === "as" || toneToLowerCase === "b") {
                    return true;
                }
                else{
                    return false;
                }
            default:
                return false;
        }
    }

    return {
        getToneName: getToneName,
        getIntervalName: getIntervalName,
        getTriadName: getTriadName,
        getTetradName: getTetradName,
        getIncompletChordNames: getIncompletChordNames,
        enharmonic: enharmonic
    };
    
});