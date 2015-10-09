
module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		uncss: {
			dist: {
				files: {
					'css/styles.css' : ['source.html']
				},
				options: {
					report: 'min' //optional: include to report savings
				/*	ignore: ['#outlook a', '.ExternalClass', '#backgroundTable', '.ExternalClass p',
					'.ExternalClass span', '.ExternalClass font', '.ExternalClass td', '.ExternalClass div'] */
				}
			}

		},
		cssmin: {
			target: {
				files: {
					'css/styles.min.css' : ['css/styles.css']
				}
			}

		},
		processhtml: {
			dist: {
				files: {
					'index.html' : ['source.html']
				}
			}
		},

		stripCssComments: {
			dist: {
				files: {
					'css/styles.css': 'css/styles.css'
				}
			}
		},
		replace: {
			css: {
				src: ['css/styles.css'],             // source files array (supports minimatch)
				overwrite:true,            // destination directory or file
				replacements: [{
					from: /^\s*$/gm,      // regex remove extra lines
					to: ''
				}]
			}
		},
		compress: {
			main: {
				options: {
					archive: 'web.zip'
				},
				files: [
					{src: ['images/*'], dest: '/', filter: 'isFile'}, // includes files in path
					{src: ['css/styles.min.css'], dest: '/', filter: 'isFile'},
					{src: ['js/scripts.min.js'], dest: '/', filter: 'isFile'},
					{src: ['js/picturefill.min.js'], dest: '/', filter: 'isFile'},
					{src: ['fonts/*'], dest: '/', filter: 'isFile'},
					{src: ['index.html'], dest: '/'}
				]
			}
		},

		mergeData : grunt.file.exists('mergeData.json')? grunt.file.readJSON('mergeData.json') : null,

		hideTemplate: {
			main: {
				src: ['source.html'],
				dest: 'working/source-tmp.html'
			}
		},
		showTemplate: {
			main: {
				src: ['email.html'],
				dest: 'working/email-tmp.html'
			}
		},
		merget: {
			main: {
				src: ['working/email-tmp.html'],
				dest: '.'
			}
		},
		helpers : {
			filename: function(f) {
				filename = f.toLowerCase();
				filename = filename.replace(/\s/g, '');
				filename = filename.replace('&', 'and');
				return filename;
			},
			fixupMergeData: function(data) {

				data.tel = data.phone.replace(/-/g,'');
				data.tel = data.tel.match(/\d{10,10}/)[0];
				return data;
			}

		},
		postcss: {
			options: {
				//map: true, // inline sourcemaps

				// or
				map: {
					inline: false, // save all sourcemaps as separate files...
					annotation: './css/maps/' // ...to the specified directory
				},

				processors: [
					require('postcss-simple-vars')({silent:true}),
					require('autoprefixer')({
						browsers:['last 2 versions']
					})
				]
			},
			vars: {
				src: 'css/*.scss',
				dest: 'css/my_styles.css'

			}
		},
		jshint: {
			main: ['js/my_scripts.js']

		},
		concat: {
			dist: {
				src: ['js/*.js','!js/scripts.js','!js/scripts.min.js','!js/picturefill.min.js'],
				dest: 'js/scripts.js'
			}
		},
		uglify: {
			options: {
				preserveComments: 'some'
			},
			build: {
				files: {
					'js/scripts.min.js': 'js/scripts.js'
				}
			}
		},
		responsive_images: {
			myTask: {
				options: {
					sizes: [{
						name: '320',
						width: 320
					},{
						name: '640',
						width: 640
					},{
						name: "1024",
						width: 1024,
						/*suffix: "_x2", */
						quality: 60
					}]
				},
				files: [{
					expand: true,
					src: ['**.{jpg,png}'],
					cwd: 'working/images',
					dest: 'working/r-images'
				}]
			}
		},
		validation: {
			index: {
				options: {
					reset: grunt.option('reset') || false,
					stoponerror: false,
					relaxerror: ['Bad value X-UA-Compatible for attribute http-equiv on element meta.',
						"element \"center\" undefined",
						"there is no attribute \"style\"",
						"there is no attribute \"align\""] //ignores these errors
				},
				files: {
					src: ['index.html']
				}
			},
			source: {
				options: {
					reset: true, // grunt.option('reset') || false,
					stoponerror: false,
					relaxerror: ['Bad value X-UA-Compatible for attribute http-equiv on element meta.',
						"element \"center\" undefined",
						"there is no attribute \"style\"",
						"there is no attribute \"align\""] //ignores these errors
				},
				files: {
					src: ['source.html']
				}
			}
		},
		// deploy via rsync
		rsync: {
			options: {
				args: ['--verbose', '-e ssh --rsync-path=bin/rsync'],
				exclude:['.git*','my_styles.scss', 'my_scripts.js', 'node_modules', '.sass-cache', 'Gruntfile.js', 'package.json', '.DS_Store', 'README.md', 'config.rb', 'working','Vagrantfile','.jshintrc'],
				recursive: true
			},
			staging: {
				options: {
					src: "./",
					dest: "~/path/to/theme/on/hostprovider",
					host: "username@host.com",
					recursive: true,
					syncDest: true,
				}
			},
			production: {

			}
		},
		watch: {
			css: {
				files: ['css/my_styles.scss'],
				tasks: ['postcss'],
				options: {
					spawn: false
				}
			}
		},
			js: {
				files: ['js/my_scripts.js'],
				tasks: ['jshint'],
				options: {
					spawn: false
				}
			}

	});

	grunt.loadNpmTasks('grunt-uncss');
	grunt.loadNpmTasks('grunt-processhtml');
	grunt.loadNpmTasks('grunt-strip-css-comments');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-concat-css');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-responsive-images');
	grunt.loadNpmTasks('grunt-html-validation');
	grunt.loadNpmTasks('grunt-rsync');


	grunt.registerMultiTask('hideTemplate','Converts template tags to prevent inliner from messing with them', function () {
		var data = this.data;
		src = grunt.file.read(data.src);
		var content = src.replace(/<%/gm,'&lt;%');
		content = content.replace(/%>/gm, '%&gt;');
		grunt.file.write(data.dest, content);
		grunt.log.writeln('File "' + data.dest + '" created.');

	});
	grunt.registerMultiTask('showTemplate','Puts template tags back the way they were', function () {
		var data = this.data;
		src = grunt.file.read(data.src);
		var content = src.replace(/&lt;%/gm,'<%');
		content = content.replace(/%&gt;/gm, '%>');
		grunt.file.write(data.dest, content);
		grunt.log.writeln('File "' + data.dest + '" created.');

	});
	grunt.registerMultiTask('tableAttrib', 'Checks table tags to add default border, cellpadding, etc', function() {
		var data=this.data;
		src = grunt.file.read(data.src);
		var count = 0, border= 0, cellspacing= 0, cellpadding=0;
		var content = src.replace(/<table(.*)>/gm, function(match,p1){
			if (p1.match(/border=/i) == null) {
				p1 += ' border="0"';
				border += 1;
			}
			if (p1.match(/cellspacing=/i)== null) {
				p1 += ' cellspacing="0"';
				cellspacing += 1;
			}
			if (p1.match(/cellpadding=/i) == null) {
				p1 += ' cellpadding="0"';
				cellpadding += 1;
			}
			count += 1;
			return '<table' + p1 + '>';
		});
		grunt.file.write(data.dest, content);
		grunt.log.writeln(count + ' tables found. '+ border +' border added. '+ cellpadding + ' cellpadding added. ' + cellspacing + ' cellspacing added. File "' + data.dest + '" created.');
	});
	grunt.registerMultiTask('merget', 'Merges data with source using grunt templates', function() {
		var data = this.data,
			mergeData = grunt.config('mergeData'),
			helpers = grunt.config('helpers'),
			src = grunt.file.read(data.src);
		    if (mergeData !== null) {
				mergeData.forEach(function (c) {
					if (typeof c.filename === 'undefined') {
						c.filename = helpers.filename(c.company);
					}
					var p = data.dest + '/i-' + c.filename + '.html';
					c = helpers.fixupMergeData(c);
					grunt.file.write(p, grunt.template.process(src, {data: c}));
					grunt.log.writeln('File "' + p + '" created.');
				});
			} else {
				grunt.log.writeln('No data found to merge.')
			}
	});



	grunt.registerTask('emptyFile', 'Removes Inlined file', function() {
		grunt.file.write('email.html', '');
	});

	grunt.registerTask('build', ['postcss', 'uncss','replace:css','cssmin','jshint','concat','uglify','processhtml','validation:index','compress']);
    grunt.registerTask('merge',['showTemplate', 'merget']);
	grunt.registerTask('zip', ['compress']);
	grunt.registerTask('default',['watch']);
	grunt.registerTask('responsive',['responsive_images']);
	grunt.registerTask('validate', ['validation:source']);
};
