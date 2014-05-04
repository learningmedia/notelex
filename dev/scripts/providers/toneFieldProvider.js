define([], function () {

    return function (noteSet, language) {
        return language === "de" ? "<div>Noch nicht verfügbar</div>" : "<div>Not yet available</div>";
    };

});
