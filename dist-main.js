require.config({
  baseUrl: "dev/scripts/",

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
