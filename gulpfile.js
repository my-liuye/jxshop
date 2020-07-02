const gulp = require("gulp");
const cssmin = require('gulp-cssmin');
const jsmin = require("gulp-uglify");
const es5 = require("gulp-babel");
const autoprefixer = require("gulp-autoprefixer")
const webserver = require("gulp-webserver")
const sass = require("gulp-sass")
const rev = require("gulp-rev")
const revCollector = require("gulp-rev-collector") 

module.exports.test = testFn;
// module.exports.watch = watchFn;

function testFn() {
    console.log("我的第一个gulp");
}
 gulp.task("copyhtml",function(){
     gulp.src("./src/html/*.html")
        .pipe(gulp.dest("./dist/html"))
})
// function watchFn(){
//     return gulp.watch("index.html",copyFn)
// }
gulp.task("mincss",function(done){
     gulp.src("./src/style/*.css")
     .pipe(rev())
     //  .pipe(autoprefixer("last 2 version","safari 5","ie8","ie9","opera 12.1","ios 6"
     //  ,"android 4"))
     .pipe(cssmin())
     .pipe(gulp.dest("./dist/css/"))
     .pipe(rev.manifest())
     .pipe(gulp.dest("rev/css"))
     done()
})
gulp.task("js",function(done){
     gulp.src("./src/js/*.js")
    .pipe(rev())
    .pipe(es5({presets:["@babel/env"]}))
    .pipe(jsmin())
    .pipe(gulp.dest("./dist/js"))
    .pipe(rev.manifest())
    .pipe(gulp.dest("rev/js"))
    done()
})
gulp.task("copyimg",function(done){
    gulp.src("./src/images/**/*")
    .pipe(gulp.dest("./dist/images/"))
    done()
})
gulp.task("rev",function(done){
     gulp.src(["rev/**/*.json","src/html/*.html"])

    .pipe(revCollector({
        replaceReved: true,//允许替换, 已经被替换过的文件
        dirReplacements: {
            '../style/': '../css/',
            '../js/': '../js/'
        }
    }))
    .pipe(gulp.dest("./dist/html"))
    done()
})




gulp.task("webserve",function(){
    gulp.src("./dist")
    .pipe(webserver({
        host:"localhost",
        port:"8888",
        livereload:true,
        open:"./html/index.html",
        proxies:[{
            source:"/dist",
            target:"https://wanandroid.com/wxarticle/chapters/json"
        }]
    }))
})
// gulp.task("all",gulp.series(gulp.parallel("js","mincss")))
gulp.task("build",gulp.series(gulp.parallel("js","mincss","copyimg","rev")))

gulp.task("watch",function(){
    gulp.watch("./src/style/*.css",gulp.series("mincss"));
    gulp.watch("./src/js/*.js",gulp.series("js"));
})

gulp.task("default",gulp.series("webserve","watch"))

gulp.task("sass",function(){
    gulp.src("./scss/myscss.scss")
    .pipe(sass())
    .pipe(cssmin())
    .pipe(gulp.dest("./scss/css"))
})
gulp.task("see",function(){
    gulp.watch("./scss/myscss.scss",gulp.series("sass"))
})
