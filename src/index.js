const fs = require('fs');
const path = require('path');

const core = require('@actions/core');
const github = require('@actions/github');
const lcov = require('lcov-total');

const { GITHUB_WORKSPACE } = process.env
//Get inputs
const lcovPath = core.getInput('lcov-file-path');
const failAt = core.getInput('fail-at');
try {
    console.log(path.resolve(__dirname), { GITHUB_WORKSPACE });
    const total = lcov(lcovPath);
    if(failAt < total) {
        core.setFailed(`Code coverage constraint was not met: ${total}/${failAt}`);
    }
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`Event Payload: ${payload}`);
    core.setOutput('coverage-percent', total);
} catch(e) {
    core.setFailed(`GHA-SC Error: ${e.message}. Please make sure an lcov file was generated for your source code`)
}

