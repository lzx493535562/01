module.exports = function(grunt){
	require('load-grunt-tasks')(grunt);
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-typescript');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.initConfig({
		typescript:{
			mgr:{
				src:['script/**/*.ts','controller/**/*.ts','directive/script/**/*.ts','klass/**/*.ts','study/**/*.ts'],
				dest:'script/main.js',
				options:{
					// module: 'amd', //or commonjs
					target: 'es5', //or es3
					rootDir: 'path/to/typescript/files'
				}
			}
		},
		connect:{
				options:{
					port: 9001,
					livereload: 35731,
					// change this to '0.0.0.0' to access the server from outside
					hostname: 'localhost'
					// , keepalive:true
				},
				livereload:{
					options:{
						open: 'http://<%= connect.options.hostname %>:<%= connect.options.port %>/index.html',
					}
				},
				mgr:{
					options:{
						open: 'http://<%= connect.options.hostname %>:<%= connect.options.port %>/main.html',
					}
				}
		},
		watch:{
			options: {
				livereload: '<%= connect.options.livereload %>',
				debounceDelay: 250,
			},
			mgr:{
				files:['css/bundle.css','script/main.js','**/*.html','declare/**/*.d.ts']
			},
			ts:{
				files:'<%= typescript.mgr.src %>',
				tasks:[
					'typescript:mgr'
				]
			},
			less:{
				files:['less/**/*.less','directive/less/**/*.less'],
				tasks:['less']
			}
		},
		less:{
			dev:{
				files:{
					// "css/bundle.css":["less/**/*.less","directive/less/**/*.less"]
					"css/bundle.css":'<%= watch.less.files %>'
				}
			}
		}
	});

	grunt.registerTask('default',
		[
			'typescript:mgr',
			'connect:mgr',
			'less',
			'watch'
		]
	);

};