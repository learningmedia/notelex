import $ from "jquery";
import hash from "./hash";
import notation from "./notation";
import noteSet from "./noteSet";
import providerFactory from "./providerFactory";

import "jquery.klavier";

export function init(options) {

    var pianoSelector         = options.pianoSelector,
        theoryHeadersSelector = options.theoryHeadersSelector,
        theoryContentSelector = options.theoryContentSelector,
        scoreCanvasSelector   = options.scoreCanvasSelector,
        theoryProviders       = providerFactory.getProviders(),
        currentProvider       = theoryProviders[0].key;

    function changeContent() {
        var keys = $(pianoSelector).klavier("getSelectedValues");
        hash.replaceHash(createHash(keys, currentProvider));
    }

    function createHash(keys, provider) {
        var keyStr = keys.reduce(function (accu, current) {
            return accu + (current < 10 ? "0" + current : current);
        }, "");
        return "k=" + keyStr + "&p=" + provider;
    }

    function parseHash(hash) {
        var query = getQuery(hash),
            keys = [],
            keyStr,
            i;
        query.p = query.p || theoryProviders[0].key;
        query.k = query.k || "";
        for (i = 0; i < query.k.length; i += 2) {
            keyStr = query.k.substring(i, i + 2);
            keys.push(parseInt(keyStr, 10));
        }
        return {
            keys: keys,
            provider: query.p
        };
    }

    function getQuery(hash) {
        return (hash + "").split("&").reduce(function (accu, pair) {
            var tokens = pair.split("=");
            if (tokens.length === 2) {
                accu[tokens[0]] = tokens[1];
            }
            return accu;
        }, Object.create(null));
    }

    function refresh() {
        var decoded = parseHash(hash.getCurrentHash()),
            currentResults,
            selectedResult;
        currentProvider = decoded.provider;
        $(pianoSelector).klavier("setSelectedValues", decoded.keys);
        notation.createNoteRenderer($(scoreCanvasSelector)[0]).renderKeys(decoded.keys);
        currentResults = calculateResults(theoryProviders, currentProvider, decoded.keys);
        selectedResult = currentResults.filter(function (result) { return result.selected; })[0];
        showHeaders(theoryHeadersSelector, currentResults);
        $(theoryContentSelector).removeClass().addClass("theory-" + currentProvider).addClass(selectedResult.content ? "enabled" : "disabled");
        showContent(currentResults);
    }

    function calculateResults(providers, selectedProvider, keys) {
        var set = noteSet(keys);
        return providers.map(function (provider) {
            var isSelected = provider.key.toUpperCase() === selectedProvider.toUpperCase();
            return {
                key: provider.key,
                name: provider.getName(),
                header: provider.getHeader(),
                content: provider.getContent(set),
                selected: isSelected
            };
        });
    }

    function showHeaders(parentElementId, results) {
        var headerContainer = $(parentElementId);
        headerContainer.empty();
        results.forEach(function (result) {
            var link = $("<a></a>").addClass("header").attr("title", result.name).attr("data-provider", result.key).text(result.header);
            var item = $("<li></li>").addClass("theory-" + result.key).addClass(result.content ? "enabled" : "disabled").addClass(result.selected ? "selected" : "unselected");
            link.appendTo(item);
            item.appendTo(headerContainer);
        });
    }

    function showContent(results) {
        var i;
        for (i = 0; i < results.length; i += 1) {
            if (results[i].selected) {
                $(theoryContentSelector).html(results[i].content || "<div></div>");
            }
        }
    }

    $(pianoSelector).klavier({
        startKey: 48,
        endKey: 72,
        selectionMode: "multiple",
        onSelectedValuesChanged: changeContent
    });

    $(theoryHeadersSelector).on("click", ".header", function (ev) {
        currentProvider = $(ev.target).attr("data-provider");
        changeContent();
    });

    hash.addListener(refresh);
    hash.startListening();
}
