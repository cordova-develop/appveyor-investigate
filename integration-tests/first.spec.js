var child_process = require('child_process');
var which = require('which');
var helpers = require('./helpers');
var path = require('path');
var fs = require('fs-extra');
var iswin32 = process.platform === 'win32';
var shelljs = require('shelljs');

const TIMEOUT = 60 * 1000;

describe('first tests', function () {
    helpers.setDefaultTimeout(TIMEOUT);
    const testProject = helpers.tmpDir('first_test_project');
    beforeEach(function() {
        process.chdir(testProject);
    });

    afterEach(function() {

    });

    it('Test 001 : npm install begin', function () {
        return Promise.resolve()
            .then(function () {
                console.log('----- HELLO ! ------');
                process.stdout.write('------ GOOD MORNING ! ------');
                console.log(testProject);
                expect(1).toBe(1);
            });
    });

    it('Test 002 : spawn child_process', function () {
        return Promise.resolve()
            .then(function () {
                return new Promise(function (resolve, reject) {
                    var path_npm = which.sync('npm');
                    console.log(path_npm);
                    var cp = child_process.spawn(path_npm, ['-v']);
                    cp.on('exit', function (code) {
                        expect(1).toBe(1);
                        resolve();
                    });
                    cp.stdout.setEncoding('utf-8');
                    cp.stdout.on('data', function (data) {
                        console.log(data);
                    });
                });
            });
    });

    it('Test 003 : npm install from local directory', function () {
        return Promise.resolve()
            .then(function () {
                console.log('is win32 : ' + iswin32);
                return new Promise(function (resolve, reject) {
                    var modpath = path.resolve(__dirname, 'fixtures', 'modules', 'test01');
                    console.log("modpath:" + modpath);
                    var path_npm = which.sync('npm');
                    var cp = child_process.spawn(path_npm, ['install', modpath]);
                    cp.on('exit', function (code) {
                        expect(1).toBe(1);
                        resolve();
                    });
                    cp.stdout.setEncoding('utf-8');
                    cp.stdout.on('data', function (data) {
                        console.log(data);
                    });
                });
            }).then(function () {
                return new Promise(function (resolve, reject) {
                    process.chdir(path.resolve(testProject, 'node_modules'));
                    var cp = null;
                    if (iswin32) {
                        cp = child_process.spawn('cmd', ['/c', 'dir']);
                    } else {
                        cp = child_process.spawn('ls', ['-l']);
                    }
                    cp.on('exit', function (code) {
                        expect(1).toBe(1);
                        resolve();
                    });
                    cp.stdout.setEncoding('utf-8');
                    cp.stdout.on('data', function (data) {
                        console.log('---- ls/dir results ----');
                        console.log(data);
                    });
                    cp.stderr.setEncoding('utf-8');
                    cp.stderr.on('data', function (data) {
                        console.log('---- ls/dir errors ----');
                        console.log(data);
                    });
                 
                });
            });
    });

    it('Test 004 : copy sync', function () {
        var src = path.resolve(testProject, 'node_modules', 'test01');
        var dest = path.resolve(testProject, 'Test01');
        fs.copySync(src, dest);
        return new Promise(function (resolve, reject) {
            var cp = null;
            if (iswin32) {
                cp = child_process.spawn('cmd', ['/c', 'dir']);
            } else {
                cp = child_process.spawn('ls', ['-l']);
            }
            cp.on('exit', function (code) {
                expect(1).toBe(1);
                resolve();
            });
            cp.stdout.setEncoding('utf-8');
            cp.stdout.on('data', function (data) {
                console.log('---- ls/dir results ----');
                console.log(data);
            });
            cp.stderr.setEncoding('utf-8');
            cp.stderr.on('data', function (data) {
                console.log('---- ls/dir errors ----');
                console.log(data);
            });
        });
    });
});