define(["providers/functionProvider"], function (functionProvider) {
    
    return {
        getProviders: function () {
            return [
                {
                    key: "am",
                    getName: function (language) { return "Allgemeine Musiklehre"; },
                    getHeader: function (language) { return "AM"; },
                    getContent: function () { return null; }
                }, {
                    key: "ft",
                    getName: function (language) { return "Funktionstheorie"; },
                    getHeader: function (language) { return "FT"; },
                    getContent: functionProvider
                }, {
                    key: "pc",
                    getName: function (language) { return "Pitch Class Set"; },
                    getHeader: function (language) { return "PC"; },
                    getContent: function () { return null; }
                }, {
                    key: "tf",
                    getName: function (language) { return "Tonfelder"; },
                    getHeader: function (language) { return "TF"; },
                    getContent: function () { return null; }
                }
            ];
        }
    };

});
