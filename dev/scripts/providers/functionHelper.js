define(["calculationHelper"], function (calculationHelper) {

    function majorFunctions(chord, intervalPattern, noteSet) {
        console.log(chord + " " + intervalPattern);
        var isD7 = d7Value(intervalPattern);
        switch (chord) {
        case "C-Dur":
            if (intervalPattern === "057") {
                return "1.) T<sup>4</sup> = Tonika mit Quartvorhalt<br/>2.) (D<sup>4</sup>) S = Dominante (Zwischendominante) mit Quartvorhalt der Subdominante";
            } else if (isD7) {
                return "1.) (D<sup>7</sup>) S = Dominantseptakkord (Zwischendominante) der Subdominante" +
                    "<br/>2.)&nbsp;&nbsp;&#92<span style='position: absolut; margin-left:-10px;'>D<span style='position: absolut; margin-left:-8px;'><sub>D</sub></span><sub>5></sub> D Tg = " +
                    "übermäßiger Quintsextakkord (C-E-G-Ais) als Doppeldominante des Tonikagegenklangs (bzw. der Dominantparallele).</span>";
            } else {
                return "1.) T = Tonika<br/>2.) (D) S = Dominante (Zwischendominante) der Subdominante";
            }
        case "c-Moll":
            return "t = Moll-Tonika (in Dur)";
        case "Des-Dur":
            if (intervalPattern === "038") {
                return "S<sup>N</sup> = neapolitanische Sextakkord (oder auch nur: Neapolitaner)";
            } else if (isD7) {
                return "1.) (D<span style='position:absolut; margin-left:-6px;'><sub>D</sub><span><sup>6<</sup>) S = übermäßiger Quintsextakkord als Signalakkord (Sub- bzw. Doppeldominante) der Subdominante" +
                    "<br/>2.)&nbsp;&nbsp;&#92<span style='position: absolut; margin-left:-10px;'>D<span style='position: absolut; margin-left:-8px;'><sub>D</sub></span><sub>5></sub> D S = " +
                    "übermäßiger Quintsextakkord (Des-F-As-H) als Doppeldominante der Subdominante.</span>";
            } else {
                return "N = selbständiger Neapolitaner (als Grundakkord)";
            }
        case "D-Dur":
            if (isD7) {
                if (intervalPattern === "036") {
                    return "&#92<span style='position: absolut; margin-left:-10px;'>D<span style='position: absolut; margin-left:-8px;'><sub>D</sub></span><sup>7</sup> = " +
                        "Dominantseptakkord ohne Grundton der Dominante (verkürzte Doppeldominante)</span>";
                }
                return "D<span style='position:absolut; margin-left:-6px;'><sub>D</sub><span><sup>7</sup> = Dominantseptakkord der Dominante (= Doppeldominantseptakkord)";
            }
            return "D<span style='position:absolut; margin-left:-6px;'><sub>D</sub></span> = Dominante der Dominante (= Doppeldominante)";
        case "d-Moll":
            return "1.) Sp = Parallele der Subdominante (Subdominantparallele)<br/>2.) S<sub>6</sub> = Subdominante mit Sexte im Bass (ohne Quinte)";
        case "Es-Dur":
            if (isD7) {
                return "nicht gebräuchlich";
            }
            return "tP = Parallelklang der Moll-Tonika (Molltonika-Parallele)";
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
            } else if (isD7) {
                return "(D<sup>7</sup>) S<span style='position:absolut; margin-left:-6px;'><sub>S</sub></span> = Dominante der Doppelsubdominante (Zwischendominante zur Doppelsubdominante)";
            } else {
                return "S = Subdominante";
            }
        case "f-Moll":
            return "s = Moll-Subdominante (in Dur)";
        case "Fis-Dur":
            return "(D) Dg = Dominante des Dominantgegenklangs (Zwischendominante zum Dominantgegenklang)";
        case "G-Dur":
            if (intervalPattern === "057") {
                return "D<sup>4</sup> = Dominante mit Quartvorhalt";
            } else {
                return "D = Dominante";
            }
        case "g-Moll":
            return "(s D) S = Subdominantparallele bzw. S<sub>6</sub> (mit Sexte im Bass) der Subdominante (Zwischensubdominantparallele zur Subdominante)";
        case "As-Dur":
            return "1.) tG = Gegenklang der Moll-Tonika (Molltonika-Gegenklang)";
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
        default:
            return "nicht gebräuchlich";
        }
    }

    function minorFunctions(chord, intervalPattern, noteSet) {
        var isD7 = d7Value(intervalPattern);
        switch (chord) {
        case "c-Moll":
            return "t = Tonika";
        case "C-Dur":
            if (intervalPattern === "057") {
                return "1.) T<sup>4</sup> = gleichnamige Durtonart mit Quartvorhalt<br/>2.) (D<sup>4</sup>) s = Dominante mit Quartvorhalt der Subdominante (Zwischendominante der Subdominante)";
            } else if (isD7) {
                if (intervalPattern === "036") {
                    return "&#92<span style='position: absolut; margin-left:-14px;'>(D<sup>7</sup>) s = Dominantseptakkord ohne Grundton der Subdominante (Zwischendominante zur Subdominante)</span>";
                }
                return "(D<sup>7</sup>) s = Dominantseptakkord der Subdominante (Zwischendominante zur Subdominante)";
            } else {
                return "1.) T = gleichnamige Durtonart</br>2.) (D) s = Dominante der Subdominante (Zwischendominante zur Subdominante)";
            }
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
            return "Hier noch Funktionen für den Verminderte einfügen.";
        case "sam":
                return "Angaben zum Sixte ajoutée in Moll (und halbverminderten Septakkord?) noch einfügen";
        default:
            return "nicht gebräuchlich";
        }
    }

    function getDiminishedOutPut(noteSet, genus) {
        var pattern = getOriginalValuesMod12(noteSet);
        switch (pattern) {
            case "1:4:7:":
                if (genus == "Dur") {
                    return "1.)&nbsp;&nbsp;&nbsp;&#92<span style='position: absolut; margin-left:-14px;'>(D<sup>7</sup>) Sp = in der Notation Cis-E-G Dominantseptakkord (ohne Grundton A) der Parallele der Subdominante (verkürzte Zwischendominante zur Subdominantparallele)</span>" +
                    "<br/>2.)&nbsp;&nbsp;&nbsp;&#92<span style='position: absolut; margin-left:-14px;'>(D<sup>7</sup>) S = in der Notation Des-E-G Dominantseptnonakkord (ohne Grundton C und Quinte) der Subdominante (verkürzter Dominanteptnonakkord ohne Quinte zur Subdominante)</span>";
                }
                return "Ausgabe für Moll noch einfügen";
            case "4:7:10:":
                if (genus == "Dur") {
                    return "1.)&nbsp;&nbsp;&nbsp;&#92<span style='position: absolut; margin-left:-14px;'>(D<sup>7</sup>) S = in der Notation E-G-B Dominantseptakkord ohne Grundton (Zwischendominante) der Subdominante</span>" +
                    "<br/>2.)&nbsp;&nbsp;&nbsp;&#92<span style='position: absolut; margin-left:-10px;'>D<span style='position: absolut; margin-left:-8px;'><sub>D</sub></span><sup>7</sup> D Tg = " +
                    "als E-G-Ais Dominantseptakkord ohne Grundton der Dominante des Gegenklangs der Tonika (verkürzte Doppeldominante des Tonikagegenklangs bzw. der Dominantparallele)</span>";
                }
                return "Ausgabe für Moll noch einfügen";
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

    return {
        getMajorFunctions: majorFunctions,
        getMinorFunctions: minorFunctions
    }

});