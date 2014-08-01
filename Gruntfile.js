module.exports = function(grunt) {

  // Load NPM Tasks
  // https://github.com/shootaroo/jit-grunt
  require('jit-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON( 'package.json' ),

    // == Grunt Dev Update
    // https://npmjs.org/package/grunt-dev-update
    // http://pgilad.github.io/grunt-dev-update
    devUpdate: {
      main: {
        options: {
          reportUpdated: false, // Report updated dependencies: 'false' | 'true'
          updateType   : "force" // 'force'|'report'|'prompt'
        }
      }
    },

    shell: {
      patternlab: {
        command: "php core/builder.php -gp"
      }
    },

    watch: {
      scss: {
        files: ['source/**/*.scss'],
        tasks: 'scss'
      },
      html: {
        files: ['source/_patterns/**/*.mustache', 'source/_patterns/**/*.json', 'source/_data/*.json'],
        tasks: ['shell:patternlab'],
        options: {
          spawn: false
        }
      },
      js: {
        files: ['source/**/*.js'],
        tasks: 'js'
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [
          'public/**/*.html',
          'public/css/{,*/}*.css',
          'public/js/{,*/}*.js'
        ]
      }
    },

    sass: {
      build: {
        files : [
          {
            src : ['**/*.scss', '!**/_*.scss'],
            cwd : 'source',
            dest : 'source',
            ext : '.css',
            expand : true
          }
        ],
        options : {
          style : 'expanded'
        }
      }
    },

    // https://github.com/nDmitry/grunt-autoprefixer
    autoprefixer: {
      build: {
        options: {
          browsers: ['last 2 versions', '> 1%']
        },
        files: [
          {
            src : ['source/**/*.css'],
            cwd : 'css',
            dest : 'source/css',
            expand : true
          }
        ]
      }
    },

    connect: {
      server: {
        options: {
          port: 9001,
          protocol: 'http',
          hostname: 'localhost',
          base: './public/',  // '.' operates from the root of your Gruntfile, otherwise -> 'Users/user-name/www-directory/website-directory'
          keepalive: false, // set to false to work side by side w/watch task.
          livereload: true,
          open: true
        }
      }
    },

    // assemble: {
    //   options: {
    //     flatten: true,
    //     layout: 'layout.hbs',
    //     layoutdir: 'src/templates/layouts',
    //     assets: 'dist/assets',
    //     partials: ['src/templates/pages/*.hbs', 'src/templates/parts/*.hbs']
    //   },
    //   demo: {
    //     options: {
    //       data: ['src/data/*.{json,yml}']
    //     },
    //     files: {
    //       'dist/': ['src/templates/pages/*.hbs']
    //     }
    //   }
    // },

    copy: {
    //   demo: {
    //     files: [
    //       { expand: true, cwd: './css', src: ['./**/*.*'], dest: 'dist/assets/css' },
    //       { expand: true, cwd: './js', src: ['./**/*.*'], dest: 'dist/assets/js' }
    //     ]
    //   },
      css: {
        files: [
          { expand: true, cwd: 'source/css', src: ['./**/*.css'], dest: 'public/css' }
        ]
      },
      js: {
        files: [
          { expand: true, cwd: 'source/js', src: ['./**/*.*'], dest: 'public/js' }
        ]
      },
      images: {
        files: [
          { expand: true, cwd: 'source/images', src: ['./**/*.*'], dest: 'public/images' }
        ]
      }
    //},

    // 'gh-pages': {
    //   options: {
    //     base: 'dist'
    //   },
    //   src: '**/*'
    }

  });

  grunt.registerTask('default', ['scss', 'js', 'img', 'shell:patternlab', 'dev']);

  grunt.registerTask('update', ['devUpdate']);
  // grunt.registerTask('default', ['sass', 'autoprefixer', 'assemble', 'copy']);
  grunt.registerTask('scss', ['sass', 'autoprefixer', 'copy:css']);
  // grunt.registerTask('html', ['assemble']);
  grunt.registerTask('js', ['copy:js']);
  grunt.registerTask('img', ['copy:images']);
  grunt.registerTask('dev', ['connect', 'watch']);
  // grunt.registerTask('demo', ['copy:demo', 'assemble:demo']);
  // grunt.registerTask('deploy', ['gh-pages']);
  // 
  
  //  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');
};