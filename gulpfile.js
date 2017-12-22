const gulp = require('gulp');
const phonegapBuild = require('gulp-phonegap-build');
const config = required('./phonegap-account.json');

// {dot: true} here to inlude .pgbomit file in zip
gulp.task('phonegap-build', function () {
    gulp.src('build/**/*', {dot: true})
        .pipe(phonegapBuild({
            "isRepository": "true",
            "appId": "2940124",
            "user": {
                "email": "mihailovaleksandrivanovich@gmail.com",
                "password": "0970479070Aa"
            }
        }));
});

gulp.task('phonegap-build-debug', function () {
    gulp.src('build/**/*', {dot: true})
        .pipe(phonegapBuild({
            "appId": "2940124",
            "user": {
                "email": "mihailovaleksandrivanovich@gmail.com",
                "password": "0970479070Aa"
            }
        }));
});

gulp.task('default', ['phonegap-build']);