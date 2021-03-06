import amlProvider from "./providers/amlProvider";
import functionProvider from "./providers/functionProvider";
import pcSetProvider from "./providers/pcSetProvider";

export default {
    getProviders: function () {
        return [
            {
                key: "am",
                getName: function () { return "Allgemeine Musiklehre"; },
                getHeader: function () { return "AM"; },
                getContent: amlProvider
            }, {
                key: "ft",
                getName: function () { return "Funktionstheorie"; },
                getHeader: function () { return "FT"; },
                getContent: functionProvider
            }, {
                key: "pc",
                getName: function () { return "Pitch Class Set"; },
                getHeader: function () { return "PC"; },
                getContent: pcSetProvider
            }
        ];
    }
};
