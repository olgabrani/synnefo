module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    emberTemplates: {
      compile: {
        options: {
          templateBasePath: /app\/templates\//
        },
        files: {
          'dist/templates.js': 'app/templates/**/*.hbs'
        }
      }
    },
    watch: {
      css: {
        files: [
          'sass/*.scss',
        ],
        tasks: ['compass'],
      },
      js: {
        files: [
          'vendor/*.js',
          'app/**/*.js',
        ],
        tasks: ['concat']
      },
      emberTemplates: {
        files: 'app/templates/**/*.hbs',
        tasks: ['emberTemplates']
      },
      jshint: {
        files: ['app/**/*.js'],
        tasks: ['jshint'],
      }
    },
    compass: {
      dist: {
        options: {
          sassDir: 'sass',
          cssDir: 'stylesheets',
          outputStyle: 'expanded',
        }
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['vendor/custom.modernizr.js', 'vendor/jquery.js','vendor/handlebars.js','vendor/ember.js','vendor/ember-data.js','vendor/underscore-min.js','vendor/jquery.farbtastic.js'],
        dest: 'dist/vendor.js',
      },
      ember: {
        src: ['app/**/*.js'],
        dest: 'dist/ember-app.js',
      }
    },
    jshint: {
      beforeconcat: ['app/**/*.js'],
    },
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-ember-templates');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('build', ['jshint', 'concat', 'emberTemplates']);
  grunt.registerTask('default', ['build','watch']);

};
