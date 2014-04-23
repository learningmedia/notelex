define(["calculationHelper"], function (calculationHelper) {

    function getTriadName(base, intervals, originalValues) {

        var tn8 = getToneName(calculationHelper.mod(base + 8, 12), "Dur");
        var tn9 = getToneName(calculationHelper.mod(base + 9, 12), "Moll oder vermindert");

        if (intervals.length === 2) {

            if (evaluateMidiValues(intervals, [0, 10])) {
                return [getToneName(base, "Dur"), "Dur", "kleiner", "Septakkord", " (Dominantseptakkord ohne Terz und Quinte)"];
            }

            if (evaluateMidiValues(intervals, [0, 6])) {
                return [tn8, "Dur", "kleiner", "Septakkord", " (Dominantseptakkord ohne Grundton " + tn8 + " und Quinte)"];
            }

        }

        if (intervals.length === 3) {

            if (evaluateMidiValues(intervals, [0, 4, 7])) {
                return [getToneName(base, "Dur"), "Dur", "Grundakkord"];
            }
            if (evaluateMidiValues(intervals, [0, 3, 8])) {
                return [tn8, "Dur", "Sextakkord"];
            }
            if (evaluateMidiValues(intervals, [0, 5, 9])) {
                return [getToneName(calculationHelper.mod(base + 5, 12), "Dur"), "Dur", "Quartsextakkord"];
            }
            if (evaluateMidiValues(intervals, [0, 3, 7])) {
                return [getToneName(base, "Moll"), "Moll", "Grundakkord"];
            }
            if (evaluateMidiValues(intervals, [0, 4, 9])) {
                return [tn9, "Moll", "Sextakkord"];
            }
            if (evaluateMidiValues(intervals, [0, 5, 8])) {
                return [getToneName(calculationHelper.mod(base + 5, 12), "Moll"), "Moll", "Quartsextakkord"];
            }

            if (evaluateMidiValues(intervals, [0, 3, 9])) {
                return [tn9, "verminderter", "Sextakkord"];
            }
            if (evaluateMidiValues(intervals, [0, 6, 9])) {
                return [tn9, "verminderter", "Quartsextakkord"];
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

            if (evaluateMidiValues(intervals, [0, 4, 10])) {
                return [getToneName(base, "Dur"), "Dur", "kleiner", "Septakkord", " (Dominantseptakkord ohne Quinte)"];
            }
            if (evaluateMidiValues(intervals, [0, 7, 10])) {
                return [getToneName(base, "Dur"), "Dur", "kleiner", "Septakkord", " (Dominantseptakkord ohne Terz)"];
            }
            if (evaluateMidiValues(intervals, [0, 3, 6])) {
                return [tn8, "Dur", "kleiner", "Septakkord", " (Dominantseptakkord ohne Grundton " + tn8 + ")"];
            }

        }

        if (intervals.length === 4) {
            
            if (evaluateMidiValues(intervals, [0, 4, 7, 9])) {
                return [tn9, "Moll", "kleiner", "Quintsextakkord", " / Sixte ajoutée über " + getToneName(base, "Dur") + " (Grundstellung)"];
            }

            if (evaluateMidiValues(intervals, [0, 3, 7, 9])) {
                return [tn9, "verminderter", "kleiner", "Quintsextakkord", " / Sixte ajoutée über " + getToneName(base, "Moll") + " (Grundstellung)"];
            }

            if (evaluateMidiValues(intervals, [0,4,7,10])) {
                return [getToneName(base, "Dur"), "Dur", "Dominantseptakkord"];
            }

            if (evaluateMidiValues(intervals, [0,3,6,8])) {
                return [tn8, "Dur", "Dominantseptakkord als Quintsextakkord (1. Umkehrung)"];
            }

            if (evaluateMidiValues(intervals, [0,3,6,9])) {
                return [getToneName(base, "Dur"), "vermindert", "verminderter Septakkord"];
            }
        }

        return [];
    }

    function evaluateMidiValues(intervals, searchPattern) {
        for (var i = 0; i < searchPattern.length; i++) {
            if(intervals.indexOf(searchPattern[i]) === -1){
                return false;
            } 
        }
        return true;
    }

    function getToneName(midiValue, genus){
        var key;
        switch(midiValue){
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

    function enharmonic(intervallPattern, tone) {
        //console.log("providerHelper: enharmonic(" + intervallPattern + ", " + tone + ")");

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
                if (toneToLowerCase === "as" || toneToLowerCase === "b" || toneToLowerCase === "h" || toneToLowerCase === "des" || toneToLowerCase === "es" || toneToLowerCase === "fis") {
                    return true;
                }
                else {
                    return false;
                }
            case "057":
                if (toneToLowerCase === "des" || toneToLowerCase === "es" || toneToLowerCase === "as") {
                    return true;
                }
                else{
                    return false;
                }
            case "047":
                if(toneToLowerCase === "des" || toneToLowerCase === "fis" || toneToLowerCase === "as" || toneToLowerCase === "h"){
                    return true;
                }
                else{
                    return false;
                }
            case "037":
                if(toneToLowerCase === "es" || toneToLowerCase === "f" || toneToLowerCase === "gis" || toneToLowerCase === "as" || toneToLowerCase === "b"){
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
        getTriadName: getTriadName,
        getToneName: getToneName,
        enharmonic: enharmonic
    };
    
});