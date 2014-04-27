define(["providers/pcSet"], function (pcSet) {

    var templateGeneric = ""
        + "<div class='pcSetProviderResult'>"
        + "    <table>"
        + "        <tbody>"
        + "            <tr>"
        + "                <th class='label'>{{rahnPrimeFormLabel}}</th>"
        + "                <td>{{rahnPrimeForm}}</td>"
        + "            </tr>"
        + "            <tr>"
        + "                <th class='label'>{{fortePrimeFormLabel}}</th>"
        + "                <td>{{fortePrimeForm}}</td>"
        + "            </tr>"
        + "            <tr>"
        + "                <th class='label'>{{intervalVectorLabel}}</th>"
        + "                <td>{{intervalVector}}</td>"
        + "            </tr>"
        + "            <tr>"
        + "                <th class='label'>{{forteNameLabel}}</th>"
        + "                <td>{{forteName}}</td>"
        + "            </tr>"
        + "            <tr>"
        + "                <th class='label'>{{zMateLabel}}</th>"
        + "                <td>{{zMate}}</td>"
        + "            </tr>"
        + "            <tr>"
        + "                <th class='label'>{{superSetsLabel}}</th>"
        + "                <td>{{superSets}}</td>"
        + "            </tr>"
        + "            <tr>"
        + "                <th class='label'>{{subSetsLabel}}</th>"
        + "                <td>{{subSets}}</td>"
        + "            </tr>"
        + "        </tbody>"
        + "    </table>"
        + "</div>";

    var templateDe = templateGeneric
        .replace(/{{rahnPrimeFormLabel}}/, "Prime Form (Rahn):")
        .replace(/{{fortePrimeFormLabel}}/, "Prime Form (Forte):")
        .replace(/{{intervalVectorLabel}}/, "Intervallvektor:")
        .replace(/{{forteNameLabel}}/, "Name (Forte):")
        .replace(/{{zMateLabel}}/, "Z-Mate:")
        .replace(/{{superSetsLabel}}/, "Obermengen:")
        .replace(/{{subSetsLabel}}/, "Untermengen:");

    var templateEn = templateGeneric
        .replace(/{{rahnPrimeFormLabel}}/, "Prime form (Rahn):")
        .replace(/{{fortePrimeFormLabel}}/, "Prime form (Forte):")
        .replace(/{{intervalVectorLabel}}/, "Interval vector:")
        .replace(/{{forteNameLabel}}/, "Name (Forte):")
        .replace(/{{zMateLabel}}/, "Z-mate:")
        .replace(/{{superSetsLabel}}/, "Supersets:")
        .replace(/{{subSetsLabel}}/, "Subsets:");

    function formatPrimeForm(primeForm, language) {
        if (primeForm.length === 0) {
            return "(<i>" + (language === "de" ? "leer" : "empty") + "</i>)";
        } else {
            return "(" + Array.prototype.join.call(primeForm, ",&nbsp;") + ")";
        }
    }

    function formatIntervalVector(intervalVector) {
        return "[" + Array.prototype.join.call(intervalVector, "") + "]";
    }

    function formatForteName(forteName) {
        return forteName ? forteName : "&ndash;";
    }

    function formatZMate(zMate, language) {
        return zMate ? formatPrimeForm(zMate, language) : "&ndash;";
    }

    function formatSuperOrSubSets(sets, language) {
        if (sets.length === 0) {
            return "&ndash;";
        } else {
            return sets.map(function (set) {
                return formatPrimeForm(set, language);
            }).join("<br>");
        }
    }

    return function (noteSet, language) {
        var set            = pcSet(noteSet),
            rahnPrimeForm  = formatPrimeForm(set.rahnPrimeForm, language),
            fortePrimeForm = formatPrimeForm(set.fortePrimeForm, language),
            intervalVector = formatIntervalVector(set.intervalVector),
            forteName      = formatForteName(set.forteName),
            zMate          = formatZMate(set.zMate, language),
            superSets      = formatSuperOrSubSets(set.superSets, language),
            subSets        = formatSuperOrSubSets(set.subSets, language),
            template       = language === "de" ? templateDe : templateEn;

        return template
            .replace(/{{rahnPrimeForm}}/, rahnPrimeForm)
            .replace(/{{fortePrimeForm}}/, fortePrimeForm)
            .replace(/{{intervalVector}}/, intervalVector)
            .replace(/{{forteName}}/, forteName)
            .replace(/{{zMate}}/, zMate)
            .replace(/{{superSets}}/, superSets)
            .replace(/{{subSets}}/, subSets);
    };

});