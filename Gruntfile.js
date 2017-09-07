module.exports = function(grunt) {
    
      // Project configuration.
      grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
          uglify: {
            my_target: {
              options: {
                mangle: false
              },
              files: [{
                expand: true,
                cwd: 'dist/',
                src: 'aoidos.comp.js',
                dest: 'dist/',
                ext: '.comp.min.js'
            }]
            }
          },
          concat: {
            options: {
              separator: ';',
            },
            dist: {
              src: 'js/*.js',
              dest: 'dist/aoidos.comp.js',
            },
          },
          exec: {
              compile: 'tsc'
          }
      });
    
      // Load the plugin that provides the "uglify" task.
      grunt.loadNpmTasks('grunt-contrib-uglify');
      grunt.loadNpmTasks('grunt-contrib-concat');
      grunt.loadNpmTasks('grunt-exec');
      

      // Default task(s).
      grunt.registerTask('default', ['exec', 'concat', 'uglify']);
    
    };