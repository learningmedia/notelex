import providerHelper from "./providerHelper";

function getTriadName(base, intervals, originalValues) {

    var valuesOutput = "";
    if (intervals.length !== 3) {
        return valuesOutput;
    }

    var values3 = providerHelper.getTriadName(base, intervals, originalValues);
    if (values3.length !== 0) {
        valuesOutput += values3[0] + "-" + values3[1];
    }

    return valuesOutput;
}

function getIncompletChordName(base, intervals, originalValues) {

    var valuesOutput = "";
    if (intervals.length !== 3) {
        return valuesOutput;
    }

    var valuesI = providerHelper.getIncompletChordNames(base, intervals, originalValues);

    if (valuesI.length !== 0) {
        valuesOutput = valuesI[2] + "#" + valuesI[0] + "-" + valuesI[1] + "#" + valuesI[3] + " " + valuesI[4];
    }

    return valuesOutput;
}

function getChordName(base, intervals, originalValues) {

    var valuesOutput = "";
    var values4 = providerHelper.getChordName(base, intervals, originalValues);

    if (values4.length !== 0) {
        valuesOutput = values4[2] + "#" + values4[0] + "-" + values4[1] + "#" + values4[3] + "#" + values4[4];
    }

    return valuesOutput;
}

function getEnharmonicIntervalName(intervalName, base) {
    var name = intervalName;
    if (intervalName === "kleine Sekunde") {
        switch (base) {
        case 0:
            name = "übermäßige Prime (C-Des = kleine Sekunde)";
            break;
        case 5:
            name = "übermäßige Prime (F-Ges = kleine Sekunde)";
            break;
        case 7:
            name = "übermäßige Prime (G-As = kleine Sekunde)";
            break;
        case 10:
            name = "übermäßige Prime (Ais-H = kleine Sekunde)";
            break;
        }
    }
    if (intervalName === "große Sekunde") {
        switch (base) {
        case 1:
            name = "verminderte Terz (Cis-Dis = große Sekunde)";
            break;
        case 8:
            name = "verminderte Terz (As-B = große Sekunde)";
            break;
        }
    }
    if (intervalName === "kleine Terz") {
        switch (base) {
            case 3:
                name = "übermäßige Sekunde (Es-Ges = kleine Terz)";
                break;
            case 10:
                name = "übermäßige Sekunde (B-Des = kleine Terz)";
                break;
        }
    }
    if (intervalName === "große Terz") {
        switch (base) {
        case 1:
            name = "verminderte Quarte (Cis-Eis = große Terz)";
            break;
        case 6:
            name = "verminderte Quarte (Fis-Ais = große Terz)";
            break;
        case 8:
            name = "verminderte Quarte (Gis-His = große Terz)";
            break;
        case 11:
            name = "verminderte Quarte (H-Dis = große Terz)";
            break;
        }
    }
    if (intervalName === "Quarte") {
        switch (base) {
            case 3:
                name = "übermäßige Terz (Es-As = Quarte)";
                break;
        }
    }
    if (intervalName === "Tritonus") {
        switch (base) {
            case 0:
                name = "übermäßige Quarte (C-Ges = verminderte Quinte)";
                break;
            case 1:
                name = "verminderte Quinte (Des-G = übermäßige Quarte)";
                break;
            case 2:
                name = "übermäßige Quarte (D-As = verminderte Quinte)";
                break;
            case 3:
                name = "übermäßige Quarte (Es-Heses = verminderte Quinte)";
                break;
            case 4:
                name = "verminderte Quinte (E-Ais = übermäßige Quarte)";
                break;
            case 5:
                name = "übermäßige Quarte (F-Ces = verminderte Quinte)";
                break;
            case 6:
                name = "verminderte Quinte (Fis-His = übermäßige Quarte)";
                break;
            case 7:
                name = "übermäßige Quarte (G-Des = verminderte Quinte)";
                break;
            case 8:
                name = "verminderte Quinte (Gis-Cisis = übermäßige Quarte)";
                break;
            case 9:
                name = "verminderte Quinte (A-Dis = übermäßige Quarte)";
                break;
            case 10:
                name = "übermäßige Quarte (B-Fes = verminderte Quinte)";
                break;
            case 11:
                name = "verminderte Quinte (H-Eis = übermäßige Quarte)";
                break;
        }
    }
    return name;
}

function getEnharmonicMessage(base, intervalPattern) {

    var enharmonicMessage = "enharmonische Lesart erforderlich";
    console.log("functionNameHelper: getEnharmonicMessage(" + base + ", " + intervalPattern + ")");

    switch (intervalPattern) {
    case "036":
    case "360":
    case "069":
    case "039":
    case "0379":
        enharmonicMessage = "enharmonische Lesart entscheidend";
        break;
    case "06":
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

export default {
    getTriadName: getTriadName,
    getIncompletChordName: getIncompletChordName,
    getChordName: getChordName,
    getEnharmonicIntervalName: getEnharmonicIntervalName,
    getEnharmonicMessage: getEnharmonicMessage
};
