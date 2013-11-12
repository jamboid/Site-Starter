module.exports = function(grunt) {

  //grunt.loadTasks('tasks');
  // Load packages
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('node-bourbon');

  // Default task(s).
  grunt.registerTask('default', ['watch']);

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

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