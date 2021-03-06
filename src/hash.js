var listeners = [],
    getCurrentHash = function () {
        var currentHash = window.location.hash;
        return currentHash ? currentHash.slice(1) : "";
    },
    notifyListeners = function () {
        var currentHash = getCurrentHash();
        listeners.forEach(function (listener) {
            listener(currentHash);
        });
    },
    observeHashChange = function () {
        if (window.addEventListener) {
            window.addEventListener("hashchange", notifyListeners, false);
        } else if (window.attachEvent) {
            window.attachEvent("onhashchange", notifyListeners);
        } else {
            throw new Error("Adding an event listener is not supported by the current browser.");
        }
    },
    isListening = false;

export default {
    addListener: function (listener) {
        if (typeof listener !== "function") {
            throw new Error("The provided listener must be a function.");
        }
        listeners.push(listener);
        if (isListening) {
            listener(getCurrentHash());
        }
    },
    startListening: function () {
        if (!isListening) {
            observeHashChange();
            notifyListeners();
            isListening = true;
        }
    },
    getCurrentHash: getCurrentHash,
    pushHash: function (newHash) {
        var url = window.location,
            nh = "#" + (newHash ? newHash : "");
        window.location.href = url.protocol + "//" + url.host + url.pathname + url.search + nh;
    },
    replaceHash: function (newHash) {
        var url = window.location,
            nh = "#" + (newHash ? newHash : "");
        window.location.replace(url.protocol + "//" + url.host + url.pathname + url.search + nh);
    }
};
