define([], function () {

    function getGenusAndBehavior(intervals){
        if (intervals[1] === 4 && intervals[2] === 7) {
            return ["Dur", "Grundstellung"];
        };
        if (intervals[1] === 3 && intervals[2] === 8) {
            return ["Dur", "Sextakkord"];
        };
        if (intervals[1] === 5 && intervals[2] === 9) {
            return ["Dur", "Quartsextakkord"];
        };
        if (intervals[1] === 3 && intervals[2] === 7) {
            return ["Moll", "Grundstellung"];
        };
        if (intervals[1] === 4 && intervals[2] === 9) {
            return ["Moll", "Sextakkord"];
        };
        if (intervals[1] === 5 && intervals[2] === 8) {
            return ["Moll", "Quartsextakkord"];
        };   
    }

    function getToneName(midiValue){
        switch(midiValue){
            case 0: return "C";
            case 1: return "Des (enhamonische Lesart notwendig)";
            case 2: return "D";
            case 3: return "Es (enhamonische Lesart notwendig)";
            case 4: return "E";
            case 5: return "F";
            case 6: return "Fis (enhamonische Lesart notwendig)";
            case 7: return "G";
            case 8: return "As (enhamonische Lesart notwendig)";
            case 9: return "A";
            case 10: return "B";
            case 11: return "Hs";
        }
        return midiValue;
    }

    return {
        getGenusAndBehavior: getGenusAndBehavior,
        getToneName: getToneName
    };
    
});