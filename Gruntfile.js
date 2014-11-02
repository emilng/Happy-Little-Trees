module.exports = function (grunt) {
  'use strict';
  // Project configuration
  grunt.initConfig({
    // Metadata
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= pkg.license %> */\n',
    // Task configuration
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/hlt.js'],
        dest: 'dist/hlt.js'
      }
    },
    browserify: {
      options: {
        transform: [ 'reactify' ]
      },
      client: {
        src: ['lib/**/*.js', 'src/**/*.jsx', 'src/**/*.js'],
        dest: 'dist/hlt.js'
      },
      test: {
        src: ['tests/src/**/*.js', 'src/**/*.js', '!src/hlt.jsx'],
        dest: 'tests/tests.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/hlt.min.js'
      }
    },
    jshint: {
      options: {
        node: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: false ,
        eqnull: true,
        browser: true,
        globals: { jQuery: true },
        boss: true
      },
      gruntfile: {
        src: 'gruntfile.js'
      },
      src: {
        src: ['src/**/*.jsx','src/**/*.js']
      },
      tests: {
        src: ['tests/src/**/*.js']
      }
    },
    qunit: {
      files: ['tests/**/*.html']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      }
    },
    cssUrlEmbed: {
      encodeDirectly: {
        options: {
          baseDir: '.'
        },
        files: {
          'dist/main.css': ['styles/main.css']
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: '.',
          keepalive: true
        }
      }
    }
  });

  // These plugins provide necessary tasks
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-css-url-embed');
  grunt.loadNpmTasks('grunt-jsxhint');

  // Default task
  grunt.registerTask('default', ['jshint', 'browserify', 'qunit']);
  grunt.registerTask('production', ['jshint', 'browserify', 'qunit', 'uglify']);
  grunt.registerTask('css', ['cssUrlEmbed']);
};

