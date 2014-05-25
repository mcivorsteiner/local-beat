module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // concat: {
    //   dist: {
    //     src: [
    //     '/assets/javascripts/**',
    //     '/spec/javascripts/**'
    //     ],
    //     dest: '/assets/javascripts/production.js',
    //   }
    // },
      uglify: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        build: {
          src: '/assets/javascripts/<%= pkg.name %>.js',
          dest: '/assets/javascripts/<%= pkg.name %>.min.js'
        }
      }
       jasmine: {
            components: {
              src: [
              'components/*js'
              ],
              options: {
                specs: 'tests/spec/*Spec.js',
                keepRunner : true,
                //helpers: 'test/spec/*.js'
              }
            }
    });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);
    grunt.registerTask('travis', [
        'jshint','jasmine'
    ]);
};