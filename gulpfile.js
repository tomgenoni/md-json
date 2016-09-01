var gulp           = require('gulp');
    markdownToJSON = require('gulp-markdown-to-json'),
    marked         = require('marked'),
    gutil          = require('gulp-util'),
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
    tables: true
});

gulp.task('default', () => {
  gulp.src('./src/**/*.md')
    .pipe(gutil.buffer())
    .pipe(markdownToJSON(marked, 'app.json'))
    .pipe(insert.prepend('var data = '))
    .pipe(gulp.dest('./app/data'))
});
