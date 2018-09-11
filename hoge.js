var fs = require('fs-extra');
var pathModule = require('path');

var testProject = 'C:\\Users\\knaito\\AppData\\Local\\Temp\\appveyor-investigates-first_test_project-p9kldD';
var dest = pathModule.resolve(testProject, 'Test01');
console.log('dest:'+dest);


console.log('---- step 0 ----');
var src = pathModule.resolve(testProject, 'node_modules', 'test01');
var srcStat = fs.lstatSync(src);
var isSymLink = srcStat.isSymbolicLink();
console.log('isSymLink:'+isSymLink);
var dest2 = pathModule.resolve(testProject, 'Test02');
var resolvedSrc = fs.readlinkSync(src);
console.log(resolvedSrc);
// fs.symlinkSync(resolvedSrc, dest2) ==> THis is same effect of fs.copySync


console.log('---- step 1 ----');
var stat = fs.lstatSync(dest);
console.log(stat);
console.log((stat.mode & parseInt(777, 8)).toString(8));


console.log('---- step 2 ----');
var binding = process.binding('fs');

const ctx = { path: dest };
const stats = binding.stat(pathModule.toNamespacedPath(dest), undefined, undefined, ctx);

console.log(ctx.errno);
console.log(ctx.error);
console.log(ctx);
