define(["providers/providerHelper"], function (providerHelper) {

    function getName(values, intervalPattern) {

        var valuesOutput;

        switch (intervalPattern) {
            case "0369":
                var dvToneName = getDvToneName(values[0]);
                valuesOutput = values[1] + " " + values[2] + " über " + dvToneName + " (oder auch: ganzverminderter bzw. hartverminderter Septakkord)";
                break;
            case "010":
            case "06":
            case "036":
            case "0410":
            case "0710":
            case "0379":
            case "0479":
                valuesOutput = values[2] + " " + values[0] + "-" + values[1] + " " + values[3] + " " + values[4];
                break;
            default:
                valuesOutput = values[0] + "-" + values[1] + " " + values[2];
                break;
            }

        return valuesOutput;
    }

    function getEnharmonicMessage(base, intervalPattern) {

        var enharmonicMessage = "enharmonische Lesart erforderlich";
        //console.log("functionNameHelper: getEnharmonicMessage(" + base + ", " + intervalPattern + ")");

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