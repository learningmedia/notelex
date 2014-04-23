define(["calculationHelper"], function (calculationHelper) {

    function getTriadName(base, intervals, originalValues) {

        if (intervals.length === 2) {

            if (evaluateMidiValues(intervals, [0, 10])) {
                return [getToneName(base, "Dur"), "Dur", "Dominantseptakkord (ohne Terz und Quinte)"];
            }

        }

        if (intervals.length === 3) {

            if (evaluateMidiValues(intervals, [0,4,7])) {
                return [getToneName(base, "Dur"), "Dur", "Grundakkord"];
            }
            if (evaluateMidiValues(intervals, [0,3,8])) {
                return [getToneName(calculationHelper.mod(base + 8, 12), "Dur"), "Dur", "Sextakkord"];
            }
            if (evaluateMidiValues(intervals, [0,5,9])) {
                return [getToneName(calculationHelper.mod(base + 5, 12), "Dur"), "Dur", "Quartsextakkord"];
            }
            if (evaluateMidiValues(intervals, [0,3,7])) {
                return [getToneName(base, "Moll"), "Moll", "Grundakkord"];
            }
            if (evaluateMidiValues(intervals, [0,4,9])) {
                return [getToneName(calculationHelper.mod(base + 9, 12), "Moll"), "Moll", "Sextakkord"];
            }
            if (evaluateMidiValues(intervals, [0,5,8])) {
                return [getToneName(calculationHelper.mod(base + 5, 12), "Moll"), "Moll", "Quartsextakkord"];
            }

            if (evaluateMidiValues(intervals, [0,3,9])) {
                return [getToneName(calculationHelper.mod(base + 9,12), "verminderter"), "verminderter", "Sextakkord"];
            }
            if (evaluateMidiValues(intervals, [0,6,9])) {
                return [getToneName(calculationHelper.mod(base + 6,12), "verminderter"), "verminderter", "Quartsextakkord"];
            }

            if (evaluateMidiValues(intervals, [0,4,8])) {
                return [getToneName(base, "übermäßiger"), "übermäßiger", "Grundakkord (auch Sext- oder Quartsextakkord, je nach enharmonischer Lesart."];
            }

            if (evaluateMidiValues(intervals, [0,5,7])) {
                    return [getToneName(base, "Dur"), "Dur", "mit Quartvorhalt"];
            }
            if (evaluateMidiValues(intervals, [0,6,7])) {
                    return [getToneName(base, "Dur"), "Dur", "mit (übermäßigem) Quartvorhalt"];
            }

            if (evaluateMidiValues(intervals, [0,4,10])) {
                    return [getToneName(base, "Dur"), "Dur", "Dominantseptakkord (ohne Quinte)"];
            }
            if (evaluateMidiValues(intervals, [0,7,10])) {
                    return [getToneName(base, "Dur"), "Dur", "Dominantseptakkord (ohne Terz)"];
            }
            if (evaluateMidiValues(intervals, [0,3,6])) {
                return [getToneName(calculationHelper.mod(base + 8,12), "Dur"), "Dur", "Dominantseptakkord (ohne Grundton)"];
            }

        }

        if (intervals.length === 4) {
            console.log("Anzahl der Intervalle: " + intervals.length);
            if (evaluateMidiValues(intervals, [0,4,7,9])) {
                return ["kleiner Moll Septakkord", " über " + getToneName(calculationHelper.mod(base + 9, 12), "Moll") + " als Quintsextakkord (1. Umkehrung)", " / Sixte ajoutée über " + getToneName(base, "Dur") + " (Grundstellung)"];
            }

            if (evaluateMidiValues(intervals, [0,4,7,10])) {
                return [getToneName(base, "Dur"), "Dur", "Dominantseptakkord"];
            }

            if (evaluateMidiValues(intervals, [0,3,6,8])) {
                return [getToneName(calculationHelper.mod(base + 8, 12), "Dur"), "Dur", "Dominantseptakkord als Quintsextakkord (1. Umkehrung)"];
            }

            if (evaluateMidiValues(intervals, [0,3,6,9])) {
                return [getToneName(base, "Dur"), "vermindert", "verminderter Septakkord"];
            }

            if (evaluateMidiValues(intervals, [0, 3, 7, 9])) {
                return ["kleiner verminderter Septakkord", " über " + getToneName(calculationHelper.mod(base + 9, 12), "vermindert") + " als Quintsextakkord (1. Umkehrung)", " / Sixte ajoutée über " + getToneName(base, "Moll") + " (Grundstellung)"];
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

        //console.log("function enharmonic: " + intervallPattern + " : " + tone);
        var toneToLowerCase = tone.toLowerCase();
        switch (intervallPattern) {
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
            case "04710":
            case "0410":
            case "0710":
            case "4710":
            case "036":
            case "010":
                if (toneToLowerCase === "des" || toneToLowerCase === "es" || toneToLowerCase === "f" || toneToLowerCase === "gis" || toneToLowerCase === "b") {
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