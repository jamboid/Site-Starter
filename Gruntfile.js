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

  // Default task - Build order
  grunt.registerTask('default',
  [
    'clean', 'assemble', 'jshint',

    // minimize JavaScript to ./build/assets/js/
    'uglify:dev',

    // Compile Sass files
    'sass:dist',

    // Copy files to build directory
    'copy:dev',

    // optimise images in ./build/assets/img/
    'imageoptim:dev',

    'notify:watch',

    // Start watch task to process ongoing changes
    'watch'
  ]);

  // Default task - Build order
  grunt.registerTask('production',
  [
    'clean', 'assemble', 'jshint',

    // minimize JavaScript to ./build/assets/js/
    'uglify:dist',

    // Compile Sass files
    'sass:dist',

    // Copy files to build directory
    'copy:dev',

    // optimise images in ./build/assets/img/
    'imageoptim:dev',

    'notify:watch',

    // Start watch task to process ongoing changes
    'watch'
  ]);

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // Metadata.
    meta: {
      basePath: '',
      srcPath: 'src/assets/scss/',
      deployPath: 'build/assets/css/',
      jsLibsPath: '/src/assets/js/libs',
      jsModulesPath: '/src/assets/js/modules'
    },

    // Assemble Tasks
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

    // Sass Tasks
    sass: {
      options: {
        loadPath: require('node-bourbon').includePaths
      },
      dev: {
        options: {
          style: 'expanded',
          debugInfo: false,
          lineNumbers: false,
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
              'src/assets/js/modules/Site.analytics.js'
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
        src: ['build/assets/img/, build/assets/css/img'],
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
          { expand: true, cwd: 'src/assets/img/inline/', src: ['**/*'], dest: 'build/assets/img' },
          // CSS Images
          { expand: true, cwd: 'src/assets/img/css/', src: ['**/*'], dest: 'build/assets/css/img' },
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
        tasks: ['sass:dev', 'notify:sass'],
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