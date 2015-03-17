gulp        = require 'gulp'
gutil       = require 'gulp-util'
connect     = require 'gulp-connect'
removeLines = require 'gulp-remove-lines'

handleError = (err) ->
  gutil.log err
  gutil.beep()

  @emit 'end'

  process.exit(1)

gulp.task 'cloneToSiteWithoutEager', ->
  gulp.src([
    '!./without-eager/**/*.html'
    './**/*.html'
  ])
    .pipe(removeLines({'filters': [
      new RegExp('<script src="\/\/fast.eager.io\/FB99ZJeTfvhs.js"><\/script>')
    ]}))
    .pipe gulp.dest('./without-eager')

gulp.task 'watch', ->
  gulp.watch [
    '!./posts/__kitchen-sink.md'
    './posts/*.md'
  ], [
    'cloneToSiteWithoutEager'
  ]

gulp.task 'connect', ->
  connect.server
    root: ['./build']
    port: 9002
    livereload: true
    connect:
      redirect: false

buildTasks = [
  'cloneToSiteWithoutEager'
]

watchTasks = buildTasks.slice(0)
watchTasks.push 'connect', 'watch'

gulp.task 'build', buildTasks
gulp.task 'default', watchTasks
