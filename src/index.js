const fs = require('fs');
const path = require('path');

const core = require('@actions/core');
const github = require('@actions/github');
const lcov = require('lcov-total');


//Get inputs
const lcovPath = core.getInput('lcov-path');
const failAt = core.getInput('fail-at');
const ifFileNotFound = core.getInput('fail-when-file-not-found')
try {
    const total = lcov(lcovPath);
    if(failAt < total) {
        core.setFailed(`Code coverage constraint was not met: ${total}/${failAt}`);
    }
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`Event Payload: ${payload}`);
    core.setOutput('coverage-percent', total);
} catch(e) {
    if(ifFileNotFound) {
        core.setFailed(`${e.message}`)
    }
}

