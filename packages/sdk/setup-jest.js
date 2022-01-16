const jasmineReporters = require('jasmine-reporters');
const reporter = new jasmineReporters.JUnitXmlReporter('test_output/');
// eslint-disable-next-line no-undef
jasmine.getEnv().addReporter(reporter);
