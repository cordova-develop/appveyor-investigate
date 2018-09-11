var helpers = require('./helpers');

const TIMEOUT = 60 * 1000;

describe('first tests', function () {
    helpers.setDefaultTimeout(TIMEOUT);
    const testProject = helpers.tmpDir('first_test_project');
    beforeAll(function() {
        process.chdir(testProject);
    });

    it('Test 001 : npm install from local directory', function () {
        return Promise.resolve()
            .then(function () {
                console.log('----- HELLO ! ------');
                process.stdout.write('------ GOOD MORNING ! ------');
                expect(1).toBe(1);
            });
    });
});