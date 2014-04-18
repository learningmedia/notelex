define(["calculationHelper"], function (calculationHelper) {

    function getTriadName(base, intervals){  
        var value = intervals.join("");
        switch(value){
            case "047": 
            console.log(base, intervals);
                return [getToneName(base, "Dur"), "Dur", "Grundakkord"];
            case "038":
                return [getToneName(calculationHelper.mod(base + 8, 12), "Dur"), "Dur", "Sextakkord"];
            case "059":
                return [getToneName(calculationHelper.mod(base + 5, 12), "Dur"), "Dur", "Quartsextakkord"];
            case "037": 
                return [getToneName(base, "Moll"), "Moll", "Grundakkord"];
            case "049":
                return [getToneName(calculationHelper.mod(base + 9, 12), "Moll"), "Moll", "Sextakkord"];
            case "058":
                return [getToneName(calculationHelper.mod(base + 5, 12), "Moll"), "Moll", "Quartsextakkord"];
            default:
                return [];
        }
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
        return genus === "Dur" ? key : key.toLowerCase();
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