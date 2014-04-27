define(["jquery", "hash", "notation", "noteSet", "providerFactory", "jquery.klavier"], function ($, hash, notation, noteSet, providerFactory) {

    $(function () {

        var theoryProviders = providerFactory.getProviders(),
            currentProvider = theoryProviders[0].key,
            currentLanguage = "de";

        $("#piano").klavier({
            startKey: 48,
            endKey: 72,
            selectionMode: "multiple",
            onSelectedValuesChanged: changeContent
        });

        $("#languagePicker input:radio").on("click", function () {
            currentLanguage = $("#languagePicker input:checked").val();
            refresh();
        });

        $("#theoryHeaders").on("click", ".header", function (ev) {
            currentProvider = $(ev.target).attr("data-provider");
            changeContent();
        });

        hash.addListener(refresh);
        hash.startListening();

        function changeContent() {
            var keys = $("#piano").klavier("getSelectedValues");
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
                currentResults;
            currentProvider = decoded.provider;
            $("#piano").klavier("setSelectedValues", decoded.keys);
            notation.createNoteRenderer($("#score canvas")[0]).renderKeys(decoded.keys);
            currentResults = calculateResults(theoryProviders, currentProvider, decoded.keys, currentLanguage);
            showHeaders("#theoryHeaders", "#header-template", currentResults, currentLanguage);
            $("#results article").removeClass().addClass("theory-" + currentProvider).addClass(currentResults[currentProvider].content ? "enabled" : "disabled");
            showContent(currentResults);
        }

        function calculateResults(providers, selectedProvider, keys, language) {
            var set = noteSet(keys);
            return providers.map(function (provider) {
                var isSelected = provider.key.toUpperCase() == selectedProvider.toUpperCase();
                return {
                    key: provider.key,
                    name: provider.getName(language),
                    header: provider.getHeader(language),
                    content: isSelected ? provider.getContent(set, language) : null,
                    selected: isSelected
                };
            });
        }

        function showHeaders(parentElementId, headerTemplateId, results) {
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
                    $("#results > article").html(results[i].content || "<div></div>");
                }
            }
        }

    });

});
