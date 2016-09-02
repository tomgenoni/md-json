var gulp           = require('gulp');
    markdownToJSON = require('gulp-markdown-to-json'),
    marked         = require('marked'),
    gutil          = require('gulp-util'),
    browserSync    = require('browser-sync').create()
    replace        = require('gulp-replace'),
    insert         = require('gulp-insert');


// Remove IDs from headings
var renderer = new marked.Renderer();
renderer.heading = function (text, level) {
    return `<h${level}>${text}</h${level}>`;
};

marked.setOptions({
    renderer: renderer,
    flattenIndex: true,
    smartypants: true,
    tables: true,
    highlight: function (code) {
      return require('highlight.js').highlightAuto(code).value;
    }
});

gulp.task('build', () => {
  gulp.src('./src/**/*.md')
    .pipe(gutil.buffer())
    // collects all files and outputs to a json blob
    .pipe(markdownToJSON(marked, 'app.json'))
    // Prepends string to assign data to a variable
    .pipe(insert.prepend('var data = '))
    // Adds clipboard after all <pre> blocks
    .pipe(replace('</pre>', '<button class=clipboard></button></pre>'))
    .pipe(gulp.dest('./app/data'))
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });
});

gulp.task('watch', function () {
    gulp.watch("src/**/*.md", ['build']);
    gulp.watch("app/**/*.{json,js,css}").on('change', browserSync.reload);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['build', 'serve', 'watch']);
