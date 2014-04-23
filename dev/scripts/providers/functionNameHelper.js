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
        case "06":
            enharmonicMessage = providerHelper.enharmonic("06", base) ? "enharmonische Lesart entscheidend" : "";
            break;
        case "010":
            enharmonicMessage = providerHelper.enharmonic("010", base) ? enharmonicMessage : "";
            break;
        case "036":
            enharmonicMessage = providerHelper.enharmonic("036", base) ? "enharmonische Lesart entscheidend" : "";
            break;
        case "360":
        case "039":
            enharmonicMessage = "enharmonische Lesart entscheidend";
            break;
        case "057":
            enharmonicMessage = providerHelper.enharmonic("057", base) ? enharmonicMessage : "";
            break;
        case "047":
            enharmonicMessage = providerHelper.enharmonic("047", base) ? enharmonicMessage : "";
            break;
        case "037":
            enharmonicMessage = providerHelper.enharmonic("037", base) ? enharmonicMessage : "";
            break;
        case "067":
            enharmonicMessage = providerHelper.enharmonic("067", base) ? enharmonicMessage : "";
            break;
        case "048":
            enharmonicMessage = providerHelper.enharmonic("048", base) ? enharmonicMessage : "";
            break;
        case "0410":
            enharmonicMessage = providerHelper.enharmonic("0410", base) ? enharmonicMessage : "";
            break;
        case "0710":
            enharmonicMessage = providerHelper.enharmonic("0710", base) ? enharmonicMessage : "";
            break;
        case "04710":
            enharmonicMessage = providerHelper.enharmonic("04710", base) ? enharmonicMessage : "";
            break;
        case "0369":
            enharmonicMessage = "für die Auflösung ist die enharmonische Lesart entscheidend";
            break;
        case "0479":
            enharmonicMessage = providerHelper.enharmonic("0479", base) ? enharmonicMessage : "";
            break;
        case "0379":
            enharmonicMessage = "enharmonische Lesart entscheidend";
            break;
        }
        return enharmonicMessage;
    }

    function getDvToneName(baseToneName) {
        console.log(baseToneName);
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