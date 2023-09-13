import https from 'node:https';

import { program } from 'commander';

program
    .requiredOption('-w, --workspace <string>', "Bitbucket workspace slug.")
    .requiredOption('-t, --token <string>', "Bitbucket Basic Auth Token: https://developer.atlassian.com/server/bitbucket/how-tos/example-basic-authentication/");

program.parse();
const cliOptions = program.opts();


function getBuildsByProject(projectName, pageNumber = 1) {
    return new Promise((resolve, reject) => {

        const options = {
            hostname: 'api.bitbucket.org',
            port: 443,
            path: '/2.0/repositories/' + cliOptions.workspace + '/' + projectName + '/pipelines?pagelen=100&page=' + pageNumber,
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + cliOptions.token
            },
        };

        const req = https.request(options, (res) => {

            let rawData = '';
            res.setEncoding('utf8');
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    return resolve(parsedData);
                } catch (e) {
                    return reject(e.message);
                }
            });
        })
            .on('error', (e) => {
                return reject(`Got error: ${e.message}`);
            });

        req.end();
    });
}


function getAllProjects(pageNumber = 1) {
    return new Promise((resolve, reject) => {

        const options = {
            hostname: 'api.bitbucket.org',
            port: 443,
            path: '/2.0/repositories/' + cliOptions.workspace + '?pagelen=100&page=' + pageNumber,
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + cliOptions.token
            },
        };

        const req = https.request(options, (res) => {

            let rawData = '';
            res.setEncoding('utf8');
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    return resolve(parsedData);
                } catch (e) {
                    return reject(e.message);
                }
            });
        })
            .on('error', (e) => {
                return reject(`Got error: ${e.message}`);
            });

        req.end();
    });
}


function addBuildSecondsUsed(buildValues, priorDate) {
    let totalBuildDurationInSec = 0;
    return new Promise((resolve, reject) => {
        for (const build of buildValues) {

            const buildCreatedDate = new Date(build.created_on);
            if (buildCreatedDate >= priorDate) {
                totalBuildDurationInSec = totalBuildDurationInSec + build.build_seconds_used;
            }
        }
        return resolve(totalBuildDurationInSec);
    });
}


async function calculateBuildDurationByProject(projectName) {

    try {
        const today = new Date();
        const priorDate = new Date(new Date().setDate(today.getDate() - 31));
        let totalBuildDurationInSec = 0;

        const result = await getBuildsByProject(projectName);
        const iterationCounter = Math.ceil(result.size / 100);

        if (result.values) {
            const buildSecondsUsed = await addBuildSecondsUsed(result.values, priorDate);
            totalBuildDurationInSec = totalBuildDurationInSec + buildSecondsUsed;
        }

        if (iterationCounter > 1 && iterationCounter != 1) {
            for (let index = 0, page = 2; index < (iterationCounter - 1); index++, page++) {

                const result = await getBuildsByProject(projectName, page);
                const buildSecondsUsed = await addBuildSecondsUsed(result.values, priorDate);
                totalBuildDurationInSec = totalBuildDurationInSec + buildSecondsUsed;
            }
        }

        if (totalBuildDurationInSec > 0) {
            console.log(projectName + ": " + totalBuildDurationInSec / 60);
        }

    } catch (error) {
        console.log(error)
    }
}


async function init() {

    console.log("Initiating ... ")

    try {

        const result = await getAllProjects();
        const iterationCounter = Math.ceil(result.size / 100);

        if (result.values) {

            console.log("Calculating build durations ... ")
            for (const project of result.values) {
                calculateBuildDurationByProject(project.slug)
            }
        }

        if (iterationCounter > 1 && iterationCounter != 1) {
            for (let index = 0, page = 2; index < (iterationCounter - 1); index++, page++) {

                const result = await getAllProjects(page);
                for (const project of result.values) {
                    calculateBuildDurationByProject(project.slug)
                }
            }
        }

    } catch (error) {
        console.log(error)
    }
}


init()