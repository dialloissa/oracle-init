const util = require('util');
const CONFIG = require('./config');
const DB = require('./lib/DB');

// ensure that a non-zero exit code is returned when a promise is silently rejected.
process.on('unhandledRejection', (error) => {
    throw error;
});

const db = new DB(CONFIG.db);

console.log(`Attempting to init the required DB tables for ${CONFIG.values.oracleEndpoint.value}.`);

async function init(values) {
    const result = await db.initOracle(values);

    if (!result || result.ok === false) {
        throw new Error(`Operation failed with error: ${util.inspect(result.error)}`);
    } else {
        console.log('Operation succeeded.');
    }

    db.destroy();
}

init(CONFIG.values);
