import calculationHelper from "../calculationHelper";

function majorFunctions(chord, intervalPattern, noteSet) {
    //console.log("functionHelper: majorFunctions(" + chord + ", " + intervalPattern + ", noteSet");

    var isD7 = d7Value(intervalPattern);
    switch (chord) {
        case "C-Dur":
            if (intervalPattern === "057") {
                return "1.) T<sup>4</sup> = Tonika mit Quartvorhalt<br/>2.) (D<sup>4</sup>) S = Dominante (Zwischendominante) mit Quartvorhalt der Subdominante";
            }
            if (isD7) {
                return "1.) (D<sup>7</sup>) S = Dominantseptakkord (Zwischendominante) der Subdominante" +
                    "<br/>2.)&nbsp;(&nbsp;&#92<span style='position: absolut; margin-left:-10px;'>D<span style='position: absolut; margin-left:-8px;'><sub>D</sub></span><sub>5></sub> D) Tg = " +
                    "übermäßiger Quintsextakkord (C-E-G-Ais) als Doppeldominante des Tonikagegenklangs (bzw. der Dominantparallele).</span>";
            }
            if (intervalPattern === "024710") {
                return "(D<sub>7</sub><sup style=\"margin-left:-7px;\">9</sup>) S = Dominantseptakkord (Zwischendominante) der Subdominante";
            }
            if (intervalPattern === "04711" || intervalPattern === "024711") {
                return "T = Tonika";
            }
            return "1.) T = Tonika<br/>2.) (D) S = Dominante (Zwischendominante) der Subdominante";
        case "C-übermäßiger":
            return "(D<sup>5<</sup>) S = Dominante (Zwischendominante) der Subdominante mit hochalterierter Quinte";
        case "c-Moll":
            return "t = Moll-Tonika (in Dur)";
        case "Des-Dur":
            if (intervalPattern === "038") {
                return "S<sup>N</sup> = neapolitanische Sextakkord (oder auch nur: Neapolitaner)";
            }
            if (isD7) {
                return "1.) (D<span style='position:absolut; margin-left:-6px;'><sub>D</sub><span><sup>6<</sup>) S = übermäßiger Quintsextakkord als Signalakkord (Sub- bzw. Doppeldominante) der Subdominante" +
                    "<br/>2.)&nbsp;&nbsp;&#92<span style='position: absolut; margin-left:-10px;'>D<span style='position: absolut; margin-left:-8px;'><sub>D</sub></span><sub>5></sub> D S = " +
                    "übermäßiger Quintsextakkord (Des-F-As-H) als Doppeldominante der Subdominante.</span>";
            }
            return "N = selbständiger Neapolitaner (als Grundakkord)";
        case "D-Dur":
            if (isD7) {
                if (intervalPattern === "036") {
                    return "&#92<span style='position: absolut; margin-left:-10px;'>D<span style='position: absolut; margin-left:-8px;'><sub>D</sub></span><sup>7</sup> = " +
                        "Dominantseptakkord ohne Grundton der Dominante (verkürzte Doppeldominante)</span>";
                }
                return "D<span style='position:absolut; margin-left:-6px;'><sub>D</sub><span><sup>7</sup> = Dominantseptakkord der Dominante (= Doppeldominantseptakkord)";
            }
            if (intervalPattern === "024710") {
                return "D<sub style=\"margin-left:-6px\">D</sub><sub>7</sub><sup style=\"margin-left:-7px;\">9</sup> D T = Dominante der Dominante (= Doppeldominante)";
            }
            return "D<span style='position:absolut; margin-left:-6px;'><sub>D</sub></span> = Dominante der Dominante (= Doppeldominante)";
        case "d-Moll":
            return "1.) Sp = Parallele der Subdominante (Subdominantparallele)<br/>2.) S<sub>6</sub> = Subdominante mit Sexte im Bass (ohne Quinte)";
        case "Es-Dur":
            if (isD7) {
                return "nicht gebräuchlich";
            }
            return "tP = Parallelklang der Tonika der gleichnamigen Molltonart (Molltonika-Parallele)";
        case "E-Dur":
            if (intervalPattern === "036") {
                return "&#92<span style='position: absolut; margin-left:-14px;'>(D<sup>7</sup>) Tp = Dominantseptakkord ohne Grundton der Tonikaparallele (verkürzte Zwischendominante zur Tonikaparallele)</span>";
            }
            if (intervalPattern === "057") {
                return "(D<sup>4</sup>) Tp = Dominante der Tonikaparallele mit Quartvorhalt (Zwischendominante mit Quartvorhalt zur Tonikaparallele)";
            }
            return "(D) Tp = Dominante (Zwischendominante) der Tonikaparallele";
        case "e-Moll":
            return "1.) Tg = Gegenklang zur Tonika (Leittonwechselklang der Tonika oder Tonikagegenklang)<br/>2.) Dp = Parallele der Dominante (Dominantparallele)";
        case "F-Dur":
            if (intervalPattern === "067") {
                return "S<sup>4</sup> = Subdominante mit (übermäßigem) Quartvorhalt";
            }
            if (isD7) {
                return "(D<sup>7</sup>) S<span style='position:absolut; margin-left:-6px;'><sub>S</sub></span> = Dominante der Doppelsubdominante (Zwischendominante zur Doppelsubdominante)";
            }
            return "S = Subdominante";
        case "f-Moll":
            return "s = Moll-Subdominante (in Dur)";
        case "Fis-Dur":
            return "(D) Dg = Dominante des Dominantgegenklangs (Zwischendominante zum Dominantgegenklang)";
        case "G-Dur":
            if (intervalPattern === "04711") {
                break;
            }
            if (intervalPattern === "057") {
                return "D<sup>4</sup> = Dominante mit Quartvorhalt";
            }
            if (intervalPattern === "04710") {
                return "D<sup>7</sup> T = Dominantseptakkord";
            }
            if (intervalPattern === "024710") {
                return "D<sub>7</sub><sup style=\"margin-left:-7px;\">9</sup> T = Dominantseptakkordnonakkord";
            }
            if (intervalPattern === "024710") {
                return "(D<sub>7</sub><sup style=\"margin-left:-7px;\">9</sup>) S = Dominantseptakkord (Zwischendominante) der Subdominante";
            }
            return "D = Dominante";
        case "g-Moll":
            return "(s D) S = Subdominantparallele bzw. S<sub>6</sub> (mit Sexte im Bass) der Subdominante (Zwischensubdominantparallele zur Subdominante)";
        case "As-Dur":
            return "1.) tG = Gegenklang der Tonika der gleichnamigen Molltonart (Molltonika-Gegenklang)";
        case "A-Dur":
            return "(D) Sp = Dominante der Parallele der Subdominante (Zwischendominante zur Subdominantparallele) ";
        case "a-Moll":
            return "1.) Tp = Parallele der Tonika (Tonikaparallele)<br/>2.) Sg = Gegenklang der Subdominante (Leittonwechselklang oder Tonikagegenklang)";
        case "B-Dur":
            return "S<span style='position:absolut; margin-left:-6px;'><sub>S</sub></span> = Subdominante der Subdominante (Doppelsubdominante)";
        case "H-Dur":
            return "1.) (D) Tg = Dominante des Tonikagegenklangs (Zwischendominante des Tonikagegenklangs/Leittonwechselklangs der Tonika)<br/>2.) (D) Dp = Dominante der Dominantparallele (Zwischendominante zur Dominantparallele)";
        case "dmc":
            return getDiminishedOutPut(noteSet, "Dur");
        case "sad":
            return "Angaben zum Sixte ajoutée in Dur und kleinen Moll-Septakkord noch einfügen";
        case "sam":
            return "s<sub>5</sub><sup style='position: absolut; margin: -7px;'>6</sup>&nbsp;&nbsp;&nbsp;T = Moll-Subdominante mit Sixte ajoutée (vermollter Sixte ajoutée in Dur)" ;
        default:
            return "nicht gebräuchlich";
    }
}

function minorFunctions(chord, intervalPattern, noteSet) {
    //console.log("functionHelper: minorFunctions(" + chord + ", " + intervalPattern + ", noteSet");

    var isD7 = d7Value(intervalPattern);
    switch (chord) {
        case "c-Moll":
            return "t = Tonika";
        case "C-Dur":
            if (intervalPattern === "057") {
                return "1.) T<sup>4</sup> = gleichnamige Durtonart mit Quartvorhalt<br/>2.) (D<sup>4</sup>) s = Dominante mit Quartvorhalt der Subdominante (Zwischendominante der Subdominante)";
            }
            if (isD7) {
                if (intervalPattern === "036") {
                    return "&#92<span style='position: absolut; margin-left:-14px;'>(D<sup>7</sup>) s = Dominantseptakkord ohne Grundton der Subdominante (Zwischendominante zur Subdominante)</span>";
                }
                return "(D<sup>7</sup>) s = Dominantseptakkord der Subdominante (Zwischendominante zur Subdominante)";
            }
            if (intervalPattern === "047") {
                return "1.) T = gleichnamige Durtonart</br>2.) (D) s = Dominante der Subdominante (Zwischendominante zur Subdominante)";
            }
            return "nicht gebräuchlich";
        case "Des-Dur":
            if (intervalPattern === "038") {
                return "S<sup>N</sup> = neapolitanische Sextakkord (oder auch nur: Neapolitaner)";
            } else if (isD7) {
                return "(D<span style='position:absolut; margin-left:-6px;'><sub>D</sub><span><sup>6<</sup>) s = übermäßiger Quintsextakkord als Signalakkord (Sub- bzw. Doppeldominante) der Subdominante";
            } else {
                return "N = selbständiger Neapolitaner (als Grundakkord)";
            }
        case "D-Dur":
            if (isD7) {
                if (intervalPattern === "036") {
                    return "&#92<span style='position: absolut; margin-left:-10px;'>D<span style='position: absolut; margin-left:-8px;'><sub>D</sub></span><sup>7</sup> = Dominantseptakkord ohne Grundton der Dominante (verkürzte Doppeldominante)</span>";
                }
                return "D<span style='position:absolut; margin-left:-6px;'><sub>D</sub><span><sup>7</sup> = Dominantseptakkord der Dominante (= Doppeldominante)";
            }
            if (intervalPattern === "024710") {
                return "D<sub style=\"margin-left:-6px\">D</sub><sub>7</sub><sup style=\"margin-left:-7px;\">9</sup> D T = Dominante der Dominante (= Doppeldominante)";
            }
            return "D<span style='position:absolut; margin-left:-6px;'><sub>D</sub></span> = Dominantseptakkord der Dominante (= Doppeldominante)";
        case "d-Moll":
            return "<b>Achtung:</b> In Moll ist d-Moll (bzw. die II. Stufe) kein Subdominantvertreter!";
        case "Es-Dur":
            if (isD7) {
                if (intervalPattern === "036") {
                    return "&#92<span style='position: absolut; margin-left:-14px;'>(D<sup>7</sup>) tG = Dominantseptakkord ohne Grundton des Gegenklangs der Tonika (verkürzte Zwischendominante zum Tonikagegenklang)</span>";
                }
                return "(D<sup>7</sup>) tG = Dominantseptakkord des Tonikagegenklangs (Dominante zum Tonikagegenklang)";
            }
            return "1.) tP = Parallelklang der Tonika (Tonikaparallele)<br/>2.) dG = Gegenklang der Dominante als leitereigenen Stufe (Dominantgegenklang)";
        case "Es-übermäßiger":
            return "(D<sup>5<</sup>) tG = Dominante mit hochalterierter Quinte des Tonikagegenklangs (Zwischendominante mit hochalterierter Quinte zum Tonikagegenklang)";
        case "e-Moll":
            return "Dp = Parallelkang der Dominante (bzw. der dominantischen Funktion in der Kadenz)";
        case "f-Moll":
            return "s = Subdominante";
        case "F-Dur":
            if (isD7) {
                return "(D<sup>7</sup>) Dp = Dominante der Parallele der Dominante als leitereigenen Stufe (Zwischendominante zur Dominantparallele)";
            }
            return "S = Dur-Subdominante (in Moll)";
        case "G-Dur":
            if (intervalPattern === "057") {
                return "D<sup>4</sup> = Dominante mit Quartvorhalt";
            } else {
                return "D = Dominante (dominantische Funktion in der Kadenz)";
            }
        case "g-Moll":
            return "d = Dominante (als leitereigene Stufe)";
        case "As-Moll":
            return "tg = vermollter Gegenklang der Tonika (vermollter Tonikagegenklang)";
        case "As-Dur":
            return "1.) sP = Parallelklang der Subdominante (Subdominantparallele)<br/>2.) tG = Gegenklang der Tonika (Tonikagegenklang)";
        case "B-Dur":
            return "S<span style='position:absolut; margin-left:-6px;'><sub>S</sub></span> = Dur-Subdominante der Dur-Subdominante (doppelte Dur-Subdominante in Moll)";
        case "dmc":
            return getDiminishedOutPut(noteSet, "Moll");
        case "sam":
                return "Angaben zum Sixte ajoutée in Moll (und halbverminderten Septakkord?) noch einfügen";
        default:
            return "nicht gebräuchlich";
    }
}

function getDiminishedOutPut(noteSet, genus) {

    var pattern = getOriginalValuesMod12(noteSet);
    switch (pattern) {
        case "0:3:6:":
        case "3:6:0:":
        case "6:0:3:":
            if (genus === "Dur") {
                return "1.)&nbsp;&nbsp;&nbsp;&#92<span style='position: absolut; margin-left:-14px;'>(D<sup>7</sup>) S<sup>N</sup> = in der Notation C-Es-Ges Dominantseptakkord (ohne Grundton As) zum Grundakkord des Neapolitaners (verkürzte Zwischendominante zum Neapolitaner)</span><br/>" +
                    "2.)&nbsp;&nbsp;&#92<span style='position: absolut; margin-left:-10px;'>D<span style='position: absolut; margin-left:-8px;'><sub>D</sub></span><sub>7</sub><sup style='position:absolut; margin:-7px;'>9></sup></sup>&nbsp; D = in der Notation C-Es-Fis Dominantseptakkord mit kleiner None (ohne Grundton D und Quinte A) zur Dominante (verkürzte Doppeldominantseptnonakkord)";
            }
            return "1.)&nbsp;&nbsp;&nbsp;&#92<span style='position: absolut; margin-left:-14px;'>(D<sup>7</sup>) S<sup>N</sup> = in der Notation C-Es-Ges Dominantseptakkord (ohne Grundton As) zum Grundakkord des Neapolitaners (verkürzte Zwischendominante zum Neapolitaner)</span><br/>" +
                "2.)&nbsp;&nbsp;&#92<span style='position: absolut; margin-left:-10px;'>D<span style='position: absolut; margin-left:-8px;'><sub>D</sub></span><sub>7</sub><sup style='position:absolut; margin:-7px;'>9></sup></sup>&nbsp; D = in der Notation C-Es-Fis Dominantseptakkordnonakkord (ohne Grundton D und Quinte A) zur Dominante (verkürzte Doppeldominantseptnonakkord)";
        case "1:4:7:":
        case "4:7:1:":
        case "7:1:4:":
            if (genus === "Dur") {
                return "1.)&nbsp;&nbsp;&nbsp;&#92<span style='position: absolut; margin-left:-14px;'>(D<sup>7</sup>) Sp = in der Notation Cis-E-G Dominantseptakkord (ohne Grundton A) der Parallele der Subdominante (verkürzter Dominantseptakkord zur Subdominantparallele)</span>" +
                "<br/>2.)&nbsp;&nbsp;&nbsp;&#92<span style='position: absolut; margin-left:-14px;'>(D<sub>7</sub><sup  style='position: absolut; margin: -7px;'>9</sup>&nbsp;&nbsp;) S = in der Notation Des-E-G Dominantseptnonakkord (ohne Grundton C und Septime B) der Subdominante (verkürzter Dominanteptnonakkord zur Subdominante)</span>";
            }
            return "&nbsp;&nbsp;&#92<span style='position: absolut; margin-left:-14px;'>(D<sub>7</sub><sup style='position: absolut; margin: -7px;'>9</sup>&nbsp;&nbsp;) s = in der Notation Des-E-G Dominantseptnonakkord (ohne Grundton C und Septime B) der Subdominante (verkürzter Dominanteptnonakkord zur Subdominante)</span>";
        case "2:8:11:":
        case "8:11:2:":
        case "11:2:8:":
            if (genus === "Dur") {
                return "1.)&nbsp;&nbsp;&nbsp;&#92<span style='position: absolut; margin-left:-14px;'>(D<sup>7</sup>) Tp = in der Notation Gis-H-D Dominantseptakkord (ohne Grundton E) der Parallele der Tonika oder des Gegenklangs der Subdominante (verkürzter Dominantseptakkord zur Tonikaparallele bzw. zum Subdominantgegenklang)</span>" +
                "<br/>2.)&nbsp;&nbsp;&nbsp;&#92<span style='position: absolut; margin-left:-14px;'>(D<sub>7</sub><sup style='position: absolut; margin: -7px;'>9</sup>&nbsp;&nbsp;) T = in der Notation As-H-D Dominantseptakkord mit tiefalterierter None (ohne Grundton G und Septime F) der Tonika (verkürzter Dominanteptnonakkord zur Tonika)</span>";
            }
            return "&nbsp;&nbsp;&nbsp;&#92<span style='position: absolut; margin-left:-14px;'>(D<sub>7</sub><sup style='position: absolut; margin: -7px;'>9></sup>&nbsp;&nbsp;) t = in der Notation As-H-D Dominantseptakkord mit tiefalterierter None (ohne Grundton G und Septime F) der Tonika (verkürzter Dominanteptnonakkord zur Tonika)</span><br/>" +
                "&nbsp;&nbsp;&nbsp;&#92<span style='position: absolut; margin-left:-14px;'>(D<sub>7</sub><sup style='position: absolut; margin: -7px;'>9></sup>&nbsp;&nbsp;) tP = in der Notation As-Ces-D Dominantseptakkord mit tiefalterierter None (ohne Grundton B und Septime F) des Gegenklnags der Tonika (verkürzter Dominanteptnonakkord zum Tonikagegenklang)</span>";
        case "2:5:8:":
        case "5:8:2:":
        case "8:2:5:":
            if (genus === "Dur") {
                return "1.)&nbsp;&nbsp;&nbsp;&#92<span style='position: absolut; margin-left:-14px;'>(D<sub>7</sub><sup style='position: absolut; margin: -7px;'>9</sup>&nbsp;&nbsp;) Tp = in der Notation D-F-Gis Dominantseptakkord mit kleiner None (ohne Grundton E und Quinte H) der Parallele der Tonika oder des Gegenklangs der Subdominante (verkürzte Zwischendominante zur Tonikaparallele oder zum Subdominantgegenklang)</span><br/>" +
                "2.)&nbsp;&nbsp;&#92<span style='position: absolut; margin-left:-9px;'>D<sub>7</sub><sup style='position: absolut; margin: -7px;'>9</sup>&nbsp;&nbsp; T = in der Notation D-F-As Dominantseptakkord mit kleiner None (ohne Grundton G und Terz H) der Tonika (verkürzter Dominanteptnonakkord ohne Terz)</span>";
            }
            return "1.)&nbsp;&nbsp;&#92<span style='position: absolut; margin-left:-9px;'>D<sub>7</sub><sup style='position: absolut; margin: -7px;'>9</sup>&nbsp;&nbsp; t = in der Notation D-F-As Dominantseptakkord mit None (ohne Grundton G und Terz H) der Tonika (verkürzter Dominanteptnonakkord ohne Terz)</span><br/>" +
                "2.)&nbsp;&nbsp;&nbsp;&#92<span style='position: absolut; margin-left:-14px;'>(D<sub>7</sub><sup style='position: absolut; margin: -7px;'>9></sup>&nbsp;&nbsp;) tP = in der Notation As-Ces-D Dominantseptakkord mit tiefalterierter None (ohne Grundton B und Septime F) des Gegenklangs der Tonika (verkürzter Dominanteptnonakkord zum Tonikagegenklang)</span>";
        case "3:6:9:":
        case "6:9:3:":
        case "9:3:6:":
            if (genus === "Dur") {
                return "Noch einfügen...";
            }
            return "Noch einfügen...";
        case "6:9:0:":
        case "9:0:6:":
        case "0:6:9:":
            return "&nbsp;&#92<span style='position: absolut; margin-left:-10px;'>D<span style='position: absolut; margin-left:-8px;'><sub>D</sub></span><sup>7</sup> D = in der Notation Fis-A-C Dominantseptakkord mit Septime (ohne Grundton D) zur Dominante (verkürzte Doppeldominantseptakkord)";
        case "4:7:10:":
        case "7:10:4:":
        case "10:4:7:":
            if (genus === "Dur") {
                return "1.)&nbsp;&nbsp;&nbsp;&#92<span style='position: absolut; margin-left:-14px;'>(D<sup>7</sup>) S = in der Notation E-G-B Dominantseptakkord ohne Grundton (Zwischendominante) der Subdominante</span>" +
                "<br/>2.)&nbsp;&nbsp;&#92<span style='position: absolut; margin-left:-10px;'>D<span style='position: absolut; margin-left:-8px;'><sub>D</sub></span><sup>7</sup> D Tg = " +
                "als E-G-Ais Dominantseptakkord ohne Grundton der Dominante des Gegenklangs der Tonika (verkürzte Doppeldominante des Tonikagegenklangs bzw. der Dominantparallele)</span>";
            }
            return "&nbsp;&nbsp;&#92<span style='position: absolut; margin-left:-14px;'>(D<sup>7</sup>) s = in der Notation E-G-B Dominantseptakkord ohne Grundton (Zwischendominante) der Subdominante</span>";
        case "11:2:5:":
        case "2:5:11:":
        case "5:2:11:":
            if (genus === "Dur") {
                return "&nbsp;&#92<span style='position: absolut; margin-left:-9px;'>D<sup>7</sup> T = in der Notation H-D-F Dominantseptakkord (ohne Grundton G) der Tonika (verkürzter Dominantseptakkord)</span>";
            }
            return "&nbsp;&nbsp;&#92<span style='position: absolut; margin-left:-14px;'>(D<sup>7</sup>) tP = in der Notation Ces-D-F Dominantseptnonakkord (ohne Grundton B und Quinte As) der Parallele der Tonika (verkürzter Dominanteptnonakkord zur Tonikaparallele)</span>";
        case "0:3:6:9:":
            return "Hallo verminderter Septakkord über C!";
        case "1:4:7:10:":
            return "Hallo verminderter Septakkord über Cis!";
        case "2:5:8:11:":
            return "Hallo verminderter Septakkord über D!";
        default:
            return "";
    }
}

function d7Value(intervalPattern) {

    if (intervalPattern === "04710" || intervalPattern === "0410" || intervalPattern === "0710" || intervalPattern === "010") {
        return true;
    } else {
        return false;
    }
}

function getOriginalValuesMod12(noteSet) {
    var pattern = "";
    for (var i = 0; i < noteSet.originalValues.length; i++) {
        pattern += calculationHelper.mod(noteSet.originalValues[i], 12);
        pattern += ":";
    }
    return pattern;
}

export default {
    getMajorFunctions: majorFunctions,
    getMinorFunctions: minorFunctions
};
