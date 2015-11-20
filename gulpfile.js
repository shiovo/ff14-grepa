// @file gulpfile.js
var gulp = require('gulp');
var runSequence = require('run-sequence');
//var sass = require('gulp-sass');
var sass = require('gulp-ruby-sass');
var connect = require('gulp-connect');
var connectSSI = require('connect-ssi');
var open = require('gulp-open');
//--------------------------
// setting
var HOST = (function () {
          var os=require('os');
          var ifaces=os.networkInterfaces();
          var dev, i, l, details;
          for (dev in ifaces) {
            for (i=0,l=ifaces[dev].length;i<l;i++) {
              details = ifaces[dev][i];
              if (details.family === 'IPv4') {
                if (details.address.match(/^192\.168\.1\./)) {
                  return details.address;
                }
              }
            }
          }
          return 'localhost';
        })();

var PORT = 8000;
//--------------------------

gulp.task("sass", function() {
    return sass("sass/", {
          // require:'./src/sass/_foundation/color.rb',
          style: 'expanded'
        })
        .pipe(gulp.dest('styles/'));
});

//ローカルサーバー
gulp.task('connectDev',function(){
  connect.server({
    root: ['./'],   //ルートディレクトリ
    host: HOST,
    port: PORT,     //ポート番号
    livereload: true,
    middleware: function () {
      return [connectSSI({
        baseDir: __dirname + '/src',
        ext: '.html'
      })];
    }
  });
});

gulp.task('open', function () {
  gulp.src('index.html').pipe(open("", {
    url: 'http://' + HOST + ':' + PORT
  }));
});
 
//htmlタスク
gulp.task('reload',function(){
  return gulp.src('**/*.html') //実行するファイル
    .pipe(connect.reload());  //ブラウザの更新
});

//ファイルの監視
gulp.task('watch',function(){
  gulp.watch(['**/*.html'],['reload']);    //htmlファイルを監視
  gulp.watch(['sass/**/*.scss'],['sass']); //scssファイルを監視
  gulp.watch(['styles/**/*.css'],['reload']);  //cssファイルを監視
  gulp.watch(['js/**/*.js'],['reload']); //jsファイルを監視
});
 
gulp.task('default', function (cb) {
  runSequence('sass',['watch','connectDev'], 'open', cb);
});
// gulp.task('build', function (cb) {
//   runSequence('clean-tmp', 'clean-dist', 'sass', ['copy-all', 'imagemin'], cb);
// });