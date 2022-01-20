const fs = require('fs');
const path = require('path');

const core = require('@actions/core');
const github = require('@actions/github');
const lcov = require('lcov-total');

const { GITHUB_WORKSPACE } = process.env

const failAt = core.getInput('fail-at');
try {
    const lcovPath = path.resolve(GITHUB_WORKSPACE, '../', `${core.getInput('lcov-file-path')}`)
    console.log({ lconvPath }, { GITHUB_WORKSPACE });
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

