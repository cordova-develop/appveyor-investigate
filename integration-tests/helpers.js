/**
    Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License.  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.
*/

var path = require('path');
var fs = require('fs-extra');
var os = require('os');


module.exports.tmpDir = function (suffix = 'test') {
    const dir = path.join(os.tmpdir(), `appveyor-investigates-${suffix}-`);
    return fs.mkdtempSync(dir);
};

/**
 * Sets the default timeout for the current suite.
 *
 * Restores the previous timeout after the suite has finished. The timeout
 * applies to all `before*`, `after*` and `it` blocks within the suite.
 *
 * Must be called before defining any of the aforementioned blocks.
 *
 * @param {Number} timeout The desired default timeout in ms
 */
module.exports.setDefaultTimeout = timeout => {
    const originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;

    // Ensure new default timeout applies to beforeAll blocks
    beforeAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = timeout;
    });

    // Refresh setting before every test, just to be safe
    beforeEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = timeout;
    });

    // Revert to original setting after the last afterAll
    afterAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
};
