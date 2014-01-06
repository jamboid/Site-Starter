module.exports = function(grunt) {

  //grunt.loadTasks('tasks');
  // Load packages
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-imageoptim');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // Metadata.
    meta: {
      basePath: '',
      srcPath: 'assets/scss/',
      deployPath: 'assets/css/',
      jsLibsPath: 'assets/js/libs',
      jsModulesPath: 'assets/js/modules'
    },

    sass: {
      dist: {
        options: {
          loadPath: require('node-bourbon').includePaths,
          style: 'compressed',
        },
        expand: true,
        cwd: './assets/scss/',
        src: ['*.scss'],
        dest: './assets/css/',
        ext: '.css'
      },
      dev: {
        options: {
          loadPath: require('node-bourbon').includePaths,
          style: 'expanded',
          debugInfo: false,
          lineNumbers: false,
        },
        expand: true,
        cwd: './assets/scss/',
        src: ['*.scss'],
        dest: './assets/css/',
        ext: '.css'
      }
    },

    jshint: {
      all: ['Gruntfile.js', 'assets/**/*.js']
    },

    uglify: {
      options: {
        preserveComments: 'none'
      },
      build: {
        // files: [
        //   {
        //     expand: true,
        //     flatten: true,
        //     cwd: '',
        //     src: ['assets/js/**/*.js', '!assets/js/**/*.min.js'],
        //     dest: 'assets/js/build/',
        //     ext: '.min.js'
        //   }
        // ]

        files: {
          'assets/js/build/Site.min.js': ['assets/js/libs/**/*.js','assets/js/modules/**/*.js', '!assets/js/**/*.min.js']
        }
      }
    },

    imageoptim: {
      prod: {
        src: ['assets/img/, assets/css/img'],
        options: {
          quitAfter: true
        }
      }
    },

    watch: {
      css: {
        files: [
          '<%= meta.srcPath %>/**/*.scss'
        ],
        tasks: ['sass:dev'],
        options: {
          interrupt: true
        },
      },

      js: {
          files: [
            '<%= meta.jsLibsPath %>/**/*.js',
            '<%= meta.jsModulesPath %>/**/*.js'
          ],
          tasks: ['uglify:build'],
          options: {
            interrupt: true
          }
      },
    }
  });


// Default task - Build order
    grunt.registerTask('default',
    [
      //'jshint',

      // start new build
      //'htmlizr:prod',

      // minimize JavaScript to ./build/assets/js/
      'uglify:build',

      // optimise SVG in ./build/assets/img/
      //'svgmin:prod',

      // rasterize SVG in ./build/assets/img/
      //'svg2png:prod',

      // optimise images in ./build/assets/img/
      'imageoptim:prod',

      'watch'
    ]);
};