var karma  = window.__karma__,
    tests  = Object.keys(karma.files).filter(function (file) { return /Specs\.js$/.test(file); });

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: "/base/dev/scripts/",

  shim: {
    "vex": {
      exports: "Vex"
    }
  },
  paths: {
    "jquery": "../bower_components/jquery/dist/jquery.min",
    "jquery.klavier": "jquery.klavier.min",
    "vex": "vexflow-min"
  }
});

require(tests, function () {
  karma.start();
});