const path = require('path');
const fs = require('fs');

const core = require('@actions/core');
const github = require('@actions/github');
const lcov = require('lcov-total');

const { GITHUB_WORKSPACE } = process.env

const failIfBelow = core.getInput('fail-if-below');
try {
    const lcovPath = path.resolve(GITHUB_WORKSPACE, `${core.getInput('lcov-file-path')}`);
    const lcovContent = fs.readFileSync(lcovPath);
    console.log(lcovContent.toString('utf8'));

    const total = lcov(lcovPath);
    if(total < failIfBelow) {
        return core.setFailed(`Code coverage constraint was not met: ${total}/${failAt}`);
    }
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`Event Payload: ${payload}`);
    core.setOutput('coverage-percent', total);
} catch(e) {
    core.setFailed(`Actions Error: ${e.message}. Please make sure an lcov file was generated for your source code`)
}

