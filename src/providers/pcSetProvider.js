import pcSet from "./pcSet";
import pcSetTable from "./pcSetTable";

var template = ""
    + "<div class='pcSetProviderResult'>"
    + "    <table>"
    + "        <tbody>"
    + "            <tr>"
    + "                <th class='label'>Prime Form (Rahn):</th>"
    + "                <td>{{rahnPrimeForm}}</td>"
    + "            </tr>"
    + "            <tr>"
    + "                <th class='label'>Prime Form (Forte):</th>"
    + "                <td>{{fortePrimeForm}}</td>"
    + "            </tr>"
    + "            <tr>"
    + "                <th class='label'>Intervallvektor:</th>"
    + "                <td>{{intervalVector}}</td>"
    + "            </tr>"
    + "            <tr>"
    + "                <th class='label'>Name (Forte):</th>"
    + "                <td>{{forteName}}</td>"
    + "            </tr>"
    + "            <tr>"
    + "                <th class='label'>Z-Mate:</th>"
    + "                <td>{{zMate}}</td>"
    + "            </tr>"
    + "            <tr>"
    + "                <th class='label'>Obermengen:</th>"
    + "                <td>{{superSets}}</td>"
    + "            </tr>"
    + "            <tr>"
    + "                <th class='label'>Untermengen:</th>"
    + "                <td>{{subSets}}</td>"
    + "            </tr>"
    + "        </tbody>"
    + "    </table>"
    + "</div>";

function formatPrimeForm(primeForm, includeForteName) {
    if (primeForm.length === 0) {
        return "(<i>empty</i>)";
    } else {
        var pcSet = pcSetTable[primeForm];
        var forteName = (includeForteName && pcSet.forteName) ? ("<b>" + pcSet.forteName + "</b>:&nbsp;") : "";
        return forteName + "(" + Array.prototype.join.call(primeForm, ",&nbsp;") + ")";
    }
}

function formatIntervalVector(intervalVector) {
    return "[" + Array.prototype.join.call(intervalVector, "") + "]";
}

function formatForteName(forteName) {
    return forteName ? forteName : "&ndash;";
}

function formatZMate(zMate) {
    return zMate ? formatPrimeForm(zMate) : "&ndash;";
}

function formatSuperOrSubSets(sets) {
    if (sets.length === 0) {
        return "&ndash;";
    } else {
        return sets.map(function (set) {
            return formatPrimeForm(set, true);
        }).join("<br>");
    }
}

export default function (noteSet) {
    var set            = pcSet(noteSet),
        rahnPrimeForm  = formatPrimeForm(set.rahnPrimeForm, false),
        fortePrimeForm = formatPrimeForm(set.fortePrimeForm, false),
        intervalVector = formatIntervalVector(set.intervalVector),
        forteName      = formatForteName(set.forteName),
        zMate          = formatZMate(set.zMate),
        superSets      = formatSuperOrSubSets(set.superSets),
        subSets        = formatSuperOrSubSets(set.subSets);

    return template
        .replace(/{{rahnPrimeForm}}/, rahnPrimeForm)
        .replace(/{{fortePrimeForm}}/, fortePrimeForm)
        .replace(/{{intervalVector}}/, intervalVector)
        .replace(/{{forteName}}/, forteName)
        .replace(/{{zMate}}/, zMate)
        .replace(/{{superSets}}/, superSets)
        .replace(/{{subSets}}/, subSets);
}
