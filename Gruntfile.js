/*

TODO
=======

1. Development and Live Deployment Master tasks

*/

module.exports = function(grunt) {

  // Load packages
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-autoprefixer');

  // Default task - Build order
  grunt.registerTask('default',
  [
    'clean', 'assemble', 'jshint',

    // Minimise JavaScript to ./build/assets/js/
    'uglify:dev',

    // Compile Sass files
    'sass:dev',

    // Copy files to build directory
    'copy:dev',

    // optimise images in ./build/assets/img/
    'imageoptim:dev',

    // Add vendor prefixes to CSS
    'autoprefixer',

    // Display status messages
    'notify:watch',

    // Start watch task to process ongoing changes
    'watch'
  ]);

  // Default task - Build order
  grunt.registerTask('production',
  [
    'clean', 'assemble', 'jshint',

    // Minimise JavaScript to ./build/assets/js/
    'uglify:dist',

    // Compile Sass files
    'sass:dist',

    // Copy files to build directory
    'copy:dev',

    // optimise images in ./build/assets/img/
    'imageoptim:dev',

    // Add vendor prefixes to CSS
    'autoprefixer',

    // Notify
    'notify:watch',

    // Start watch task to process ongoing changes
    'watch'
  ]);

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // Metadata - paths and whatnot
    meta: {
      basePath: '',
      srcPath: 'src/assets/scss/',
      deployPath: 'build/assets/css/',
      jsLibsPath: '/src/assets/js/libs',
      jsModulesPath: '/src/assets/js/modules'
    },

    /** Assemble Tasks
     * - optional task for development. Remove this when using in a project
     */
    assemble: {
      options: {
        flatten: true,
        layout: 'src/templates/layouts/default.hbs',
        partials: 'src/templates/partials/*.hbs'
      },
      pages: {
        files: {
          'build/': ['src/templates/pages/*.hbs', '!src/templates/pages/index.hbs']
        }
      },
      index: {
        files: {
          'build/': ['src/templates/pages/index.hbs']
        }
      }
    },

    // Clean tasks
    clean: {
      pages: {
        src: ["build/**/*.html"]
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 version','> 1%', 'ie 8', 'ie 9']
      },

      build: {
        src: './build/assets/css/*.css'
      },
    },

    // Sass Tasks
    sass: {
      dev: {
        options: {
          style: 'expanded',
          debugInfo: false,
          lineNumbers: false
        },
        expand: true,
        cwd: './src/assets/scss/',
        src: ['*.scss'],
        dest: './build/assets/css/',
        ext: '.css'
      },
      dist: {
        options: {
          style: 'compressed',
        },
        expand: true,
        cwd: "<%= sass.dev.cwd %>",
        src: "<%= sass.dev.src %>",
        dest: "<%= sass.dev.dest %>",
        ext: "<%= sass.dev.ext %>"
      }
    },

    jshint: {
      options: {
        'force': true,
        'reporter': require('jshint-stylish')
      },
      all: ['Gruntfile.js', 'src/assets/js/modules/**/*.js']
    },

    // Uglify tasks
    uglify: {
      options: {
        report: 'min'
      },
      dev: {
        options: {
          mangle:false,
          compress: false,
          beautify: true,
          preserveComments: 'all'
        },
        files: {
          // Set destination file
          'build/assets/js/Site.min.js':
            [ // Set libraries and modules to for project
              // Add js files in root of libs/ dir
              'src/assets/js/libs/*.js',
              // Set Site modules to be used
              'src/assets/js/modules/Site.js',
              'src/assets/js/modules/Site.utils.js',
              'src/assets/js/modules/Site.events.js',
              'src/assets/js/modules/Site.showhide.js',
              'src/assets/js/modules/Site.carousel.js',
              'src/assets/js/modules/Site.images.js',
              'src/assets/js/modules/Site.media.js',
              'src/assets/js/modules/Site.scroller.js',
              'src/assets/js/modules/Site.layout.js',
              'src/assets/js/modules/Site.filter.js',
              'src/assets/js/modules/Site.analytics.js',
              'src/assets/js/modules/Site.loading.js'
            ]
        }
      },
      dist: {
        options: {
          mangle:true,
          compress: true,
          beautify: false,
          preserveComments: 'none'
        },
        files: "<%= uglify.dev.files %>"
      }
    },

    imageoptim: {
      dev: {
        src: ['build/img/, build/css/img'],
        options: {
          quitAfter: true
        }
      }
    },

    // Copy files and other assets from src to build
    copy: {
      dev: {
        files: [
          // Single JS Files that aren't to be concatenated
          { expand: true, cwd: 'src/assets/js/libs/single/', src: ['**/*'], dest: 'build/assets/js/' },
          // Inline Images
          { expand: true, cwd: 'src/assets/img/inline/', src: ['**/*'], dest: 'build/assets/img/' },
          // CSS Images
          { expand: true, cwd: 'src/assets/img/css/', src: ['**/*'], dest: 'build/assets/css/img/' },
          // Fonts
          { expand: true, cwd: 'src/assets/', src: ['fonts/**/*'], dest: 'build/assets/' }
        ]
      },
    },

    // Watch tasks
    watch: {
      css: {
        files: [
          '<%= meta.srcPath %>/**/*.scss'
        ],
        tasks: ['sass:dev', 'autoprefixer', 'notify:sass'],
        options: {
          interrupt: true
        },
      },

      js: {
        files: [
          'src/assets/js/libs/**/*.js',
          'src/assets/js/modules/**/*.js'
        ],
        tasks: ['jshint', 'uglify:dev', 'notify:js'],
        options: {
          interrupt: true
        }
      },

      pages: {
        files: [
          'src/templates/**/*.hbs'
        ],
        tasks: ['assemble'],
        options: {
          interrupt: true
        }
      }
    },

    // Notify Tasks
    notify: {
      watch: {
        options: {
          title: 'Default Task complete',  // optional
          message: 'Watch is running...', //required
        }
      },

      sass: {
        options: {
          title: 'Build Complete',  // optional
          message: 'Sass files were compiled successfully', //required
        }
      },

      js: {
        options: {
          title: 'Build Complete',  // optional
          message: 'JS files were compiled successfully', //required
        }
      }
    }
  });
};