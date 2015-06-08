module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jscs: {
      src: "./app",
      options: {
          config: ".jscsrc",
          verbose: true // If you need output with rule names http://jscs.info/overview.html#verbose
      }
    },
    eslint: {
      target: ['./app/**/*.js'],
      options: {
        configFile: '.eslintrc'
      }
    },
    mocha_istanbul: {
        coverage: {
            src: 'test/**/test*.js',
            options: {
              coverageFolder: 'test/coverage',
            }
        }
    },
    istanbul_check_coverage: {
      default: {
        options: {
          coverageFolder: 'test/coverage', // will check both coverage folders and merge the coverage results
          check: {
            lines: 80,
            statements: 80
          }
        }
      }
    },
    browserify: {
      app: {
        src: ['app/index.js'],
        dest: 'dist/app.min.js',
        options: {
          transform: ['uglifyify']
        }
      }
    }
  });

  grunt.event.on('coverage', function(lcovFileContents, done){
      // Check below on the section "The coverage event"
      done();
  });

  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-istanbul');
  grunt.loadNpmTasks('grunt-browserify');

  // Default task(s).
  grunt.registerTask('style', ['jscs']);
  grunt.registerTask('lint', ['eslint']);
  grunt.registerTask('test', ['mocha_istanbul:coverage']);
  grunt.registerTask('bundle', ['browserify']);
  grunt.registerTask('default', ['lint', 'style', 'test', 'bundle']);
};