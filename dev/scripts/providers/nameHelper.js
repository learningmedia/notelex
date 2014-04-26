define(["providers/providerHelper"], function (providerHelper) {

    function getName(base, intervals, originalValues) {

        var valuesOutput = "";
        var values3 = providerHelper.getTriadName(base, intervals, originalValues);
        var values4 = providerHelper.getTetradName(base, intervals, originalValues);
        var valuesI = providerHelper.getIncompletChordNames(base, intervals, originalValues);

        if (values3.length !== 0) {
            valuesOutput += values3[0] + "-" + values3[1] + "#" + values3[2];
        }

        if (valuesI.length !== 0) {
            valuesOutput = valuesI[2] + "#" + valuesI[0] + "-" + valuesI[1] + "#" + valuesI[3] + " " + valuesI[4];
        }

        //if (values4.length !== 0) {
            
        //}

        

        return valuesOutput;
    }

    function getEnharmonicMessage(base, intervalPattern) {

        var enharmonicMessage = "enharmonische Lesart erforderlich";
        console.log("functionNameHelper: getEnharmonicMessage(" + base + ", " + intervalPattern + ")");

        switch (intervalPattern) {
        case "360":
        case "039":
        case "0379":
            enharmonicMessage = "enharmonische Lesart entscheidend";
            break;
        case "06":
        case "036":
            enharmonicMessage = providerHelper.enharmonic(intervalPattern, base) ? "enharmonische Lesart entscheidend" : "";
            break;
        case "0369":
            enharmonicMessage = "für die Auflösung ist die enharmonische Lesart entscheidend";
            break;
        default:
            enharmonicMessage = providerHelper.enharmonic(intervalPattern, base) ? enharmonicMessage : "";
            break;
        }
        return enharmonicMessage;
    }

    function getDvToneName(baseToneName) {
        switch (baseToneName) {
            case "Des":
            case "E":
            case "G":
                return "Cis";
            case "D":
            case "F":
            case "H":
            case "As":
                return "Gis";
            case "Es":
            case "A":
            case "C":
                return "Fis";
            default:
                return baseToneName;
        }
    }

    return {
        getName: getName,
        getEnharmonicMessage: getEnharmonicMessage
    }

});