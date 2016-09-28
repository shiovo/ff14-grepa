// @file gulpfile.js
var gulp        = require('gulp');
var runSequence = require('run-sequence');
var sass        = require('gulp-sass');
var sassGlob    = require('gulp-sass-glob');
var connect     = require('gulp-connect');
var connectSSI  = require('connect-ssi');
var open        = require('gulp-open');
var plumber     = require('gulp-plumber');
var watch       = require('gulp-watch');
var webpack     = require('gulp-webpack');
var named       = require('vinyl-named');

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
    return gulp.src(["./sass/**/*.scss", "!./sass/**/_*.scss"], {
          base: './sass'
        })
        .pipe(plumber())
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(gulp.dest('styles/'));
});

gulp.task('scripts', function () {
  gulp.src('js-src/*.js')
    .pipe(plumber())
    .pipe(named())
    .pipe(webpack({
      cache: true,
      output: {
        pathinfo: true
      },
      resolve: {
        alias: {

        },
        extensions: ['', '.js']
      },
      module: {
      }
    }))
    .pipe(gulp.dest('./js'));
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

  function run(name) {
    return function () {
      gulp.start(name);
    }
  }

  watch(['**/*.html'],run('reload'));    //htmlファイルを監視
  watch(['./sass/**/*.scss'],run('sass')); //scssファイルを監視
  watch(['styles/**/*.css'],run('reload'));  //cssファイルを監視
  watch(['js/**/*.js'],run('reload')); //jsファイルを監視
  watch(['js-src/**/*'],run('scripts')); //jsファイルを監視

  // gulp.watch(['**/*.html'],['reload']);    //htmlファイルを監視
  // gulp.watch(['sass/**/*.scss'],['sass']); //scssファイルを監視
  // gulp.watch(['styles/**/*.css'],['reload']);  //cssファイルを監視
  // gulp.watch(['js/**/*.js'],['reload']); //jsファイルを監視
});
 
gulp.task('default', function (cb) {
  runSequence(['scripts', 'sass'],['watch','connectDev'], 'open', cb);
});
// gulp.task('build', function (cb) {
//   runSequence('clean-tmp', 'clean-dist', 'sass', ['copy-all', 'imagemin'], cb);
// });