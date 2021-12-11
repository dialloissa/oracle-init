const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    },
    values: {
        oracleEndpoint: {
            createdBy: process.env.SQL_VALUES_ORACLE_ENDPOINT_CREATED_BY,
            value: process.env.SQL_VALUES_ORACLE_ENDPOINT_VALUE,
        },
        partyIdType: {
            name: process.env.SQL_VALUES_PARTY_ID_TYPE_NAME,
            description: process.env.SQL_VALUES_PARTY_ID_TYPE_DESCRIPTION,
        },
    },
};
