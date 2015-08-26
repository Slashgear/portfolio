module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower_concat: {
      all: {
        dest: 'lib/js/portfolio_bower.js',
        cssDest: 'lib/css/portfolio_bower.css',
        bowerOptions: {
          relative: false
        }
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      my_target: {
        files: {
          'lib/js/portfolio_bower.min.js': ['lib/js/portfolio_bower.js']
        }
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'lib/css',
          src: ['*.css', '!*.min.css'],
          dest: 'lib/css',
          ext: '.min.css'
        }]
      }
    },
    minjson: {
      compile: {
        files: {
          'public/locales/fr/translation.min.json': 'public/locales/fr/translation.json',
          'public/locales/en/translation.min.json': 'public/locales/en/translation.json'
        }
      }
    }
});
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-minjson');
  grunt.registerTask('default', ['bower_concat','uglify','cssmin','minjson']);
  grunt.registerTask('jsonmin',['minjson']);
};
