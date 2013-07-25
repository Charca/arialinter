module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    nodeunit: {
      files: ['test/**/*_test.js']
    },
    arialinter: {
      files: ['test/testFiles/**.html', 'test/**/**.hbs'],
      options: {
        templates: true
      }
    },
    copy: {
      main: {
        files: [
          {src: ['lib/**'], dest: 'build/'}
        ]
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Load local tasks.
  grunt.loadTasks('tasks');

  // Register nodeunit task.
  grunt.registerTask('test', ['nodeunit']);

  // Register build task.
  grunt.registerTask('build', ['copy']);

  // Default task.
  grunt.registerTask('default', ['arialinter']);

};
