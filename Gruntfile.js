module.exports = function (grunt) {
  "use strict";

  // load all grunt tasks:
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    clean: ["dist"],
    replace: {
      dist: {
        src: ["dist/index.html"],
        dest: "dist/index.html",
        replacements: [{ 
          from: /<!--\s*BUILD\s*\:\s*Scripts\s*-->[\S\s]*?<!--\s*\/\s*BUILD\s*\:\s*Scripts\s*-->/g,
          to: "<script src=\"main.min.js\"></script>"
        }, { 
          from: /<!--\s*BUILD\s*\:\s*Styles\s*-->[\S\s]*?<!--\s*\/\s*BUILD\s*\:\s*Styles\s*-->/g,
          to: "<link rel=\"stylesheet\" href=\"styles/styles.min.css\">"
        }]
      }
    },
    prettify: {
      dist: {
        src: "dist/index.html",
        dest: "dist/index.html"
      }
    },
    uglify: {
      dist: {
        files: {
          "dist/main.min.js": ["dist/main.js"]
        }
      }
    },
    jshint: {
      files: ["Gruntfile.js", "test-main.js", "dist-main.js", "dev/scripts/**/*.js", "test/**/*.js", "!dev/scripts/jquery.klavier.min.js", "!dev/scripts/vexflow-min.js"],
      options: {
        jshintrc: true
      }
    },
    requirejs: {
      dist: {
        // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
        options: {
          include                 : ["app"],
          insertRequire           : ["app"],
          mainConfigFile          : "dist-main.js",
          out                     : "dist/main.js",
          optimize                : "none",
          preserveLicenseComments : false,
          useStrict               : true,
          wrap                    : false
        }
      }
    },
    karma: {
      options: {
        configFile: "karma.conf.js"
      },
      default: {}
    },
    copy: {
      dist: {
        files: [{
          cwd    : "dev/styles/",
          src    : "**",
          dest   : "dist/styles/",
          filter : "isFile",
          expand : true,
          nonull : true
        }, {
          src: "dev/index.html",
          dest: "dist/index.html"
        }]
      }
    },
    concat: {
      dist: {
        src: ["dev/bower_components/requirejs/require.js", "dist/main.js"],
        dest: "dist/main.js"
      }
    },
    cssmin: {
      combine: {
        files: {
          "dist/styles/styles.min.css": ["dist/styles/styles.css"]
        }
      }
    }
  });

  grunt.registerTask("default", ["test", "build"]);
  grunt.registerTask("test", ["jshint", "karma:default"]);
  grunt.registerTask("build", ["clean", "copy", "replace", "prettify", "requirejs", "concat", "uglify", "cssmin"]);

};