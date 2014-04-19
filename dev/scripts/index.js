define(["jquery", "hash", "notation", "noteSet", "providerFactory", "jquery.klavier"], function ($, hash, notation, NoteSet, providerFactory) {

    $(function() {

        var theoryProviders = providerFactory.getProviders(),
            currentProvider = 0,
            currentLanguage = "de",
            currentResults = calculateResults(theoryProviders, currentProvider, new NoteSet(), currentLanguage);

        $("#piano").klavier({
            startKey: 48,
            endKey: 72,
            selectionMode: "multiple",
            onSelectedValuesChanged: onSelectionChanged
        });

        $("#languagePicker input:radio").on("click", function() {
            currentLanguage = $("#languagePicker input:checked").val();
            refresh();
        });

        $("#theoryHeaders").on("click", ".header", function(ev) {
            var $element = $(ev.target);
            var newIndex = +$element.attr("data-index");
            currentProvider = newIndex;
            refresh();
        });

        hash.addListener(onHashChanged);
        hash.startListening();

        function onSelectionChanged() {
            var keys = $("#piano").klavier("getSelectedValues");
            hash.replaceHash(createHashFromKeys(keys));
        }

        function onHashChanged() {
            refresh();
        }

        function createHashFromKeys(keys) {
            var key = "",
                i;
            for (i = 0; i < keys.length; i++) {
                key = key + (keys[i] < 10 ? "0" + keys[i] : "" + keys[i]);
            }
            return key;
        }

        function createKeysFromHash(hash) {
            var keys = [],
                i;
            if (!hash) {
                hash = "";
            }
            for (i = 0; i < hash.length; i += 2) {
                var keyStr = hash.substring(i, i + 2);
                keys.push(+keyStr);
            }
            return keys;
        }

        function refresh() {
            var keys = createKeysFromHash(hash.getCurrentHash());
            $("#piano").klavier("setSelectedValues", keys);
            notation.createNoteRenderer($("#score canvas")[0]).renderKeys(keys);

            currentResults = calculateResults(theoryProviders, currentProvider, new NoteSet(keys), currentLanguage);
            showHeaders("#theoryHeaders", "#header-template", currentResults, currentLanguage);
            $("#results article").removeClass().addClass("theory-" + currentProvider).addClass(currentResults[currentProvider].content ? "enabled" : "disabled");
            showContent(currentResults);
        }

        function calculateResults(providers, selectedProviderIndex, noteSet, language) {
            var results = [],
                provider,
                i;

            for (i = 0; i < providers.length; i++) {
                provider = providers[i];
                results.push({
                    index: i,
                    name: provider.getName(language),
                    header: provider.getHeader(language),
                    content: provider.getContent(noteSet, language),
                    selected: i === selectedProviderIndex
                });
            }
            return results;
        }

        function showHeaders(parentElementId, headerTemplateId, results) {
            var headerContainer = $(parentElementId);
            headerContainer.empty();
            results.forEach(function(result) {
                var link = $("<a></a>").addClass("header").attr("title", result.name).attr("data-index", result.index).text(result.header);
                var item = $("<li></li>").addClass("theory-" + result.index).addClass(result.content ? "enabled" : "disabled").addClass(result.selected ? "selected" : "unselected");
                link.appendTo(item);
                item.appendTo(headerContainer);
            });
        }

        function showContent(results) {
            for (var i = 0; i < results.length; i++) {
                if (results[i].selected) {
                    $("#results > article").html(results[i].content || "<div></div>");
                }
            }
        }

    });

});
