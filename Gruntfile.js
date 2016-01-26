module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            main: {
                src: [
                    'bower_components/jquery.easing/js/jquery.easing.js',
                    'src/js/<%= pkg.name %>.js'
                ],
                dest: 'build/js/<%= pkg.name %>.js',
            }
        },
        uglify: {
            main: {
                src: 'build/js/<%= pkg.name %>.js',
                dest: 'build/js/<%= pkg.name %>.min.js'
            }
        },
        copy: {
            main: {
                expand: true,
                cwd: 'src/',
                src: ['*.html', '*.js', '*.css' , 'js/**', 'mail/**', 'img/**', 'css/**'],
                dest: 'build/',
            },
            jquery: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/jquery/dist/',
                    src: [
                        'jquery.js',
                        'jquery.min.js'
                    ],
                    dest: 'build/js/'
                }, ]
            },
            bootstrap: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/bootstrap/dist/',
                    src: [
                        'css/bootstrap.css',
                        'css/bootstrap.min.css',
                        'js/bootstrap.js',
                        'js/bootstrap.min.js'
                    ],
                    dest: 'build/'
                }, ]
            },
            glyphicons: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/bootstrap/dist/',
                    src: [
                        'fonts/glyphicons-halflings-regular.eot',
                        'fonts/glyphicons-halflings-regular.svg',
                        'fonts/glyphicons-halflings-regular.ttf',
                        'fonts/glyphicons-halflings-regular.woff',
                    ],
                    dest: 'build/'
                }, ]
            },
        },
        less: {
            expanded: {
                options: {
                    paths: ["css"]
                },
                files: {
                    "src/css/<%= pkg.name %>.css": "src/less/<%= pkg.name %>.less"
                }
            },
            minified: {
                options: {
                    paths: ["css"],
                    cleancss: true
                },
                files: {
                    "src/css/<%= pkg.name %>.min.css": "src/less/<%= pkg.name %>.less"
                }
            }
        },
        banner: '/*!\n' +
            ' * <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
            ' */\n',
        usebanner: {
            dist: {
                options: {
                    position: 'top',
                    banner: '<%= banner %>'
                },
                files: {
                    src: ['build/css/<%= pkg.name %>.css', 'build/css/<%= pkg.name %>.min.css', 'build/js/<%= pkg.name %>.js', 'build/js/<%= pkg.name %>.min.js']
                }
            }
        },
        watch: {
            scripts: {
                files: ['src/js/<%= pkg.name %>.js, js/plugins/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                },
            },
            copy: {
                files: ['src/*.html', 'src/mail/**', 'src/img/**', 'src/less/**'],
                tasks: ['copy'],
                options: {
                    spawn: false,
                }
            },
            less: {
                files: ['src/less/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false,
                }
            },
        }
    });

    // Load the plugins.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-banner');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['concat', 'uglify', 'copy', 'less', 'usebanner']);

};
