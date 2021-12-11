const check = require('check-types');
const knex = require('knex');
const { attachOnDuplicateUpdate } = require('knex-on-duplicate-update');

function validateConfiguration(config) {
    return check.assert.nonEmptyObject(config, 'Invalid db configuration.')
        && check.assert.nonEmptyString(config.host, 'Invalid db.host')
        && check.assert.positive(Number(config.port, 'Invalid db.port'))
        && check.assert.nonEmptyString(config.database, 'Invalid db.database')
        && check.assert.nonEmptyString(config.user, 'Invalid db.user')
        && check.assert.string(config.password, 'Invalid db.password');
}

function validateOracleValues(values) {
    return check.assert.nonEmptyObject(values, 'Invalid oracle values configuration.')
        && check.assert.nonEmptyObject(values.oracleEndpoint, 'Invalid oracle values.oracleEndpoint')
        && check.assert.nonEmptyString(values.oracleEndpoint.createdBy, 'Invalid oracle values.oracleEndpoint.createdBy')
        && check.assert.nonEmptyString(values.oracleEndpoint.value, 'Invalid oracle values.oracleEndpoint.value')
        && check.assert.nonEmptyObject(values.partyIdType, 'Invalid oracle values.partyIdType')
        && check.assert.nonEmptyString(values.partyIdType.name, 'Invalid oracle values.partyIdType.name')
        && check.assert.nonEmptyString(values.partyIdType.description, 'Invalid oracle values.partyIdType.description');
}

/**
 * Appends `http` to the passed oracle endpoint, only in case it doesn't start with
 * neither `http://` nor `https://`.
 *
 * @method appendHttp
 * @param oracleEndpoint
 * @returns {String}
 */
const appendHttp = (oracleEndpoint) => {
    if (!oracleEndpoint.startsWith('http://') && !oracleEndpoint.startsWith('https://')) {
        return `http://${oracleEndpoint}`;
    }

    return oracleEndpoint;
};

/**
 * @class DB
 */
class DB {
    /**
     * @constructor
     * @param {Object} config The configuration object. If not provided or malformed,
     * an error will be thrown.
     * @throws An exception if the provided parameters are invalid.
     */
    constructor(config) {
        validateConfiguration(config);

        this.config = config;

        this.client = knex({
            client: 'mysql2',
            connection: {
                host: config.host,
                port: config.port,
                user: config.user,
                password: config.password,
                database: config.database,
            },
        });
        attachOnDuplicateUpdate();
    }

    /**
     * Initialise the MySQL database tables related with the target Oracle by running the
     * required SQL statements.
     *
     * @method initOracle
     * @param {Object} values The values to insert in the DB, with expected structure:
     *
     *      oracleEndpoint: {
     *          createdBy: <string>,
     *          value: <string>,
     *      },
     *      partyIdType: {
     *          name: <string>,
     *          description: <string>,
     *      }
     *
     * @returns {Object} With structure:
     *  * `{ok: true}` if it succeeds;
     *  * `{ok: false, error: <error object>}` if it fails.
     */
    async initOracle(values) {
        validateOracleValues(values);

        try {
            await this.client
                .insert({
                    name: values.partyIdType.name,
                    description: values.partyIdType.description,
                })
                .into('partyIdType')
                // will not trigger any action even if it is assigned to itself
                .onDuplicateUpdate('name');
        } catch (error) {
            return {
                ok: false,
                error,
            };
        }

        const transaction = await this.client.transaction();

        try {
            await transaction('oracleEndpoint')
                .update({
                    isActive: 0,
                    isDefault: 0,
                    createdBy: values.oracleEndpoint.createdBy,
                });

            const { partyIdTypeId } = (await transaction('partyIdType')
                .select('partyIdTypeId')
                .where({
                    name: values.partyIdType.name,
                }))[0];

            const { endpointTypeId } = (await transaction('endpointType')
                .select('endpointTypeId')
                .where({
                    type: 'URL',
                }))[0];

            await transaction('oracleEndpoint')
                .insert({
                    partyIdTypeId,
                    endpointTypeId,
                    value: appendHttp(values.oracleEndpoint.value),
                    createdBy: values.oracleEndpoint.createdBy,
                    isDefault: 1,
                })
                .onDuplicateUpdate('value');

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();

            return {
                ok: false,
                error,
            };
        }

        return {
            ok: true,
        };
    }

    async destroy() {
        if (this.client && check.function(this.client.destroy)) {
            await this.client.destroy();

            this.client = null;
        }

        return {
            ok: true,
        };
    }
}

module.exports = DB;
