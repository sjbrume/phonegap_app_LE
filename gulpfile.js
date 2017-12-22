const gulp = require('gulp');
const phonegapBuild = require('gulp-phonegap-build');
const config = required('./phonegap-account.json');

// {dot: true} here to inlude .pgbomit file in zip
gulp.task('phonegap-build', function () {
    gulp.src('dist/**/*', {dot: true})
        .pipe(phonegapBuild({
            "isRepository": "true",
            "appId": "9876",
            "user": {
                "token": "ABCD123409876XYZ"
            }
        }));
});

gulp.task('phonegap-build-debug', function () {
    gulp.src('dist/**/*', {dot: true})
        .pipe(phonegapeBuild({
            "appId": "1234",
            "user": {
                "email": "your.email@example.org",
                "password": "yourPassw0rd"
            }
        }));
});

gulp.task('default', ['phonegap-build']);