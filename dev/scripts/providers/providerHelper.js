define(["calculationHelper"], function (calculationHelper) {

    function getTriadName(base, intervals){  

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

            if (evaluateMidiValues(intervals, [0,3,6])) {
                return [getToneName(base, "verminderter"), "verminderter", "Grundakkord"];
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
        }

        return [];

    }

    function evaluateMidiValues(intervals, searchPattern){
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

    function enharmonic(toneName, genus)
    {
        if (genus === "Dur"){
            switch(toneName){
                case "Des":
                case "Cis":
                case "Fis":
                case "As":
                case "H":
                    return true;
                default:
                    return false;
            }
        }
        else if(genus === "Moll"){
            switch(toneName){
                case "des":
                case "es":
                case "f":
                case "as":
                case "b":
                    return true;
                default:
                    return false;
            }
        }
        else{
            return false;
        }
    }

    return {
        getTriadName: getTriadName,
        getToneName: getToneName,
        enharmonic: enharmonic
    };
    
});