module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {                              
		dist: {                            
			options: {                       
				style: 'expanded'
			},
			files: {                         
				'css/tgame.css': 'scss/tgame.scss'       
			}
		}
    },
	autoprefixer: {
	      options: {
	        browsers: ['last 2 version', 'ie 8', 'ie 9']
	      },
	      all: {
	        src: ['css/tgame.css']
	      }
	},
    watch: {
		files: ['scss/tgame.scss'],
		tasks: ['sass', 'autoprefixer'],
		livereload: {
			files: ['scss/tgame.scss','index.html','js/tgame.js','js/login.js'],
			options: {
				livereload: true
			}
		}
    },
    connect: {
    	tgame: {
    		options: {
    			port: 9000,
    			base: '<%= public %>',
    			open: true,
    			livereload: true,
    			hostname: 'localhost'
    		}
    	}
    },

  });

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask('default', ['connect:tgame','watch']);

};


