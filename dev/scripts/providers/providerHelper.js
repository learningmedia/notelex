define(["calculationHelper"], function (calculationHelper) {

    function getTriadName(base, intervals){
        var value = intervals.join("");
        switch(value){
            case "047": 
                return [getToneName(base), "Dur", "Grundakkord"];
            case "038":
                return [getToneName(calculationHelper.mod(base + 8, 12)), "Dur", "Sextakkord"];
            case "059":
                return [getToneName(calculationHelper.mod(base + 5, 12)), "Dur", "Quartsextakkord"];
            case "037": 
                return [getToneName(base), "Moll", "Grundakkord"];
            case "049":
                return [getToneName(calculationHelper.mod(base + 9, 12)), "Moll", "Sextakkord"];
            case "058":
                return [getToneName(calculationHelper.mod(base + 5, 12)), "Moll", "Quartsextakkord"];
            default:
                return [];
        }
    }

    function getToneName(midiValue){
        switch(midiValue){
            case 0: return "C";
            case 1: return "Des";
            case 2: return "D";
            case 3: return "Es";
            case 4: return "E";
            case 5: return "F";
            case 6: return "Fis";
            case 7: return "G";
            case 8: return "As";
            case 9: return "A";
            case 10: return "B";
            case 11: return "H";
        }
        return midiValue;
    }

    return {
        getTriadName: getTriadName,
        getToneName: getToneName
    };
    
});