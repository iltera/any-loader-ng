module.exports = function (grunt) {
  'use strict';

  // Display the execution time when tasks are run:
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Base directory paths for reference:
  var DIST  = './dist',
      DEMO  = './demo',
      SRC   = './src',
      TEST  = './test',
      TEMP  = './.tmp',
      BOWER = grunt.file.readJSON('.bowerrc').directory,
      BANNER = '/*!\n  <%= pkg.description %>\n  @version: <%= pkg.version %>\n  @author: <%= pkg.author %>\n  @link: <%= pkg.repository.url %>\n*/\n';

  // Project configuration
  grunt.initConfig({
    // --------------------------------------------------
    // Helper variables and paths
    // --------------------------------------------------
    pkg: grunt.file.readJSON('package.json'),
    files: {
      html: [
        SRC + '/app/*/*.html',
      ],
      js: {
        src: [
          SRC + '/app/app.js',
          SRC + '/app/app.run.js',
          SRC + '/app/*/*.constant.js',
          SRC + '/app/*/*.service.js',
          SRC + '/app/*/*.directive.js',
          SRC + '/app/*/*.filter.js',
          SRC + '/app/*/*.ctrl.js',
        ],
        module: [
          SRC + '/app/app.js',
          SRC + '/app/loader/*.js',
        ],
        vendor: [
          BOWER + '/angular/angular.js',
        ]
      },
      test: {
        unit: [
          TEST + '/unit/**/*.spec.js'
        ],
        helpers: [
          TEST + '/lib/**/*.js',
        ],
      }
    },

    // --------------------------------------------------
    // html2js tasks
    // --------------------------------------------------
    html2js: {
      options: {
        module: 'templates',
        rename: function (moduleName) {
          return moduleName.replace('app', 'views');
        },
      },
      main: {
        src: ['<%= files.html %>'],
        dest: TEMP + '/js/templates.js',
      },
    },

    // --------------------------------------------------
    // Clean tasks
    // --------------------------------------------------
    clean: {
      options: {
        force: true,
      },
      demo: [
        DEMO + '/**/*',
      ],
      dist: [
        TEMP + '**/*',
        DIST + '*',
      ],
      coverage: TEST + '/coverage/*',
    },

    // --------------------------------------------------
    // JSHint Tasks
    // --------------------------------------------------
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      app: ['<%= files.js.src %>'],
      unit: ['<%= files.test.unit %>', '<%= files.test.helpers %>'],
      grunt: ['Gruntfile.js']
    },

    // --------------------------------------------------
    // ngAnnotate Tasks
    // --------------------------------------------------
    ngAnnotate: {
      options: {
        singleQuotes: true
      },
      demo: {
        files: {
          './demo/js/app.js': ['<%= files.js.src %>'],
        },
      },
      dist: {
        files: {
          './.tmp/js/app.annotated.js': ['<%= files.js.module %>'],
        },
      },
    },

    // --------------------------------------------------
    // Concat Tasks
    // --------------------------------------------------
    concat: {
      options: {
        stripBanners: true,
        banner: BANNER,
      },
      demo: {
        src: ['./.tmp/js/templates.js', '<%= files.js.src %>'],
        dest: DEMO + '/js/<%= pkg.name %>.js',
      },
      dist: {
        src: ['./.tmp/js/templates.js', '<%= files.js.module %>'],
        dest: DIST + '/<%= pkg.name %>.js',
      },
    },

    // --------------------------------------------------
    // Uglify Tasks
    // --------------------------------------------------
    uglify: {
      options: {
        mangle: true, // can't mangle app code since we are running ngAnnotate on it afterwards
        sourceMap: false,
        compress: true,
      },
      dist: {
        options: {
          banner: BANNER,
        },
        files: {
          './dist/<%= pkg.name %>.min.js': [
            TEMP + '/js/templates.js',
            TEMP + '/js/app.annotated.js'
          ],
        },
      },
      vendor: {
        files: {
          './demo/js/vendor.js': ['<%= files.js.vendor %>'],
        },
      },
    },

    // --------------------------------------------------
    // Karma Tasks
    // --------------------------------------------------
    karma: {
      options: {
        configFile: 'karma.config.js'
      },

      watch: {
        background: true,
        singleRun: false
      },

      unit: {
        singleRun: true,
        browsers: ['PhantomJS']
      }
    },

    // --------------------------------------------------
    // Coverage Tasks
    // --------------------------------------------------
    coverage: {
      options: {
        thresholds: {
          'statements': 15,
          'branches': 0,
          'functions': 10,
          'lines': 15
        },
        dir: '/coverage/json',
        root: TEST
      }
    },

    // --------------------------------------------------
    // Copy Tasks
    // --------------------------------------------------
    copy: {
      demo: {
        files: [
          {
            expand: true,
            cwd: BOWER + '/fontawesome/fonts/',
            src: ['*'],
            dest: DEMO + '/fonts',
          },
          {
            expand: true,
            cwd: BOWER + '/fontawesome/css/',
            src: ['*'],
            dest: DEMO + '/css',
          },
        ],
      },
    },

    // --------------------------------------------------
    // Connect Tasks
    // --------------------------------------------------
    connect: {
      server: {
        options: {
          port: 9000,
          livereload: 35729,
          // use 0.0.0.0 instead of localhost to help with VM-based testing
          hostname: '0.0.0.0',
          base: '.',
          path: DIST,
          index: DIST + '/demo/index.html',
        },
      },
    },

    // --------------------------------------------------
    // HTML Hint Tasks
    // --------------------------------------------------
    htmlhint: {
      build: {
        options: {
          'tag-pair': true,
          'tagname-lowercase': true,
          'attr-lowercase': true,
          'attr-value-double-quotes': true,
          'doctype-first': false,
          'spec-char-escape': false,
          'id-unique': true,
          'head-script-disabled': false,
          'style-disabled': false
        },
        src: [SRC + '/app/**/*.html']
      }
    },

    // --------------------------------------------------
    // HTML Minify Tasks
    // --------------------------------------------------
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          conservativeCollapse: true
        },
        files: [
          // all views:
          //{
          //  cwd: SRC + '/app',
          //  expand: true,
          //  src: ['*/*.html'],
          //  dest: DEMO + '/views'
          //},
          // index:
          {
            cwd: SRC + '/app',
            expand: true,
            src: ['index.html'],
            dest: DEMO
          },
        ],
      },
    },

    // --------------------------------------------------
    // Watcher Tasks
    // --------------------------------------------------
    watch: {
      config: {
        files: ['Gruntfile.js'],
        tasks: ['jshint:grunt'],
      },

      html: {
        files: [SRC + '/app/**/*.html'],
        tasks: ['htmlhint', 'htmlmin', 'html2js', 'concat:demo'],
      },

      js: {
        files: ['<%= files.js.src %>'],
        tasks: ['jshint:app', 'concat:demo'],
      },

      vendorScripts: {
        files: ['<%= files.js.vendor %>'],
        tasks: ['uglify:vendor'],
      },

      livereload: {
        files: [
          DEMO + '/**/*.html',
          DEMO + '/**/*.css',
          DEMO + '/**/*.js',
        ],
        options: {
          livereload: true,
        }
      },

      karma: {
        files: ['<%= files.test.unit %>', '<%= files.test.helpers %>'],
        tasks: ['jshint:unit', 'karma'],
      },
    },
  });

  grunt.registerTask('default', ['connect', 'watch']);

  grunt.registerTask('serve', 'Runs the application code through JSHint, then compiles and minifies the application code.', function () {
    grunt.task.run([
      'clean:demo',
      'copy',
      'jshint',
      'html2js',
      'concat:demo',
      'uglify:vendor',
      'htmlhint',
      'htmlmin',
      'test',
      'connect',
      'watch',
    ]);
  });

  grunt.registerTask('dist', 'Runs the application code through JSHint, then compiles and minifies the application code.', function () {
    grunt.task.run([
      'clean:dist',
      'ngAnnotate:dist',
      'html2js',
      'uglify:dist',
      'concat:dist',
      'jshint',
      'test',
    ]);
  });

  grunt.registerTask('test:before', ['clean:coverage', 'jshint:unit']);

  grunt.registerTask('test:after', ['coverage']);

  grunt.registerTask('test', ['test:before', 'karma:unit', 'test:after']);
};
