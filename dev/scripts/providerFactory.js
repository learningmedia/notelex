define(["providers/functionProvider", "providers/amlProvider"], function (functionProvider, amlProvider) {
    
    return {
        getProviders: function () {
            return [
                {
                    getName: function (language) { return "Allgemeine Musiklehre"; },
                    getHeader: function (language) { return "AM"; },
                    getContent: amlProvider
                }, {
                    getName: function (language) { return "Funktionstheorie"; },
                    getHeader: function (language) { return "FT"; },
                    getContent: functionProvider
                }, {
                    getName: function (language) { return "Pitch Class Set"; },
                    getHeader: function (language) { return "PC"; },
                    getContent: function () { return null; }
                }, {
                    getName: function (language) { return "Tonfelder"; },
                    getHeader: function (language) { return "TF"; },
                    getContent: function () { return null; }
                }
            ];
        }
    };

});
