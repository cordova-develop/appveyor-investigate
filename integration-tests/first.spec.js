var child_process = require('child_process');
var which = require('which');
var helpers = require('./helpers');

const TIMEOUT = 60 * 1000;

describe('first tests', function () {
    helpers.setDefaultTimeout(TIMEOUT);
    const testProject = helpers.tmpDir('first_test_project');
    beforeAll(function() {
        process.chdir(testProject);
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

    it('Test 002 : npm install from local directory', function () {
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
});