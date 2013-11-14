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

    // Default task - Build order
    grunt.registerTask('default',
    [
      'jshint',

      // start new build
      //'htmlizr:prod',

      'watch',


      // minimize JavaScript to ./build/assets/js/
      'uglify:prod',

      // optimise SVG in ./build/assets/img/
      //'svgmin:prod',

      // rasterize SVG in ./build/assets/img/
      //'svg2png:prod',

      // optimise images in ./build/assets/img/
      'imageoptim:prod'
    ]);

    // Metadata.
    meta: {
      basePath: '',
      srcPath: 'assets/scss/',
      deployPath: 'assets/css/'
    },


    // Task configuration.
    sass: {
      dist: {
        options: {
          loadPath: require('node-bourbon').includePaths,
          style: 'compressed'
        },
        files: {
          '<%= meta.deployPath %>screen.css': '<%= meta.srcPath %>screen.scss'
        }
      }
    },

    jshint: {
      all: ['Gruntfile.js', 'tasks/**/*.js']
    },

    uglify: {
      options: {
        preserveComments: 'none'
      },
      prod: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['assets/js/**/*.js', "!assets/js/**/*.min.js"],
            dest: 'build/assets/',
            ext: '.min.js'
          }
        ]
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
        tasks: ['sass'],
        options: {
          interrupt: true
        },
      }
    }
  });
};