const mockDb = require('mock-knex');
const DB = require('../../../lib/DB');

describe('DB', () => {
    let validConfig;

    beforeEach(() => {
        validConfig = {
            host: '127.0.0.1',
            port: 3306,
            database: 'local',
            user: 'root',
            password: '',
        };
    });

    describe('Constructor:', () => {
        describe('Failures:', () => {
            let invalidConfig;
            let instance;

            beforeEach(() => {
                invalidConfig = JSON.parse(JSON.stringify(validConfig));
                instance = null;
            });

            afterEach(() => {
                expect(instance).toBe(null);
            });

            describe('Throws an error if:', () => {
                it('no arguments are provided.', () => {
                    expect(() => {
                        instance = new DB();
                    }).toThrow();
                });

                describe('first argument is:', () => {
                    it('null.', () => {
                        expect(() => {
                            instance = new DB(null);
                        }).toThrow();
                    });

                    it('number.', () => {
                        expect(() => {
                            instance = new DB(33);
                        }).toThrow();
                    });

                    it('string.', () => {
                        expect(() => {
                            instance = new DB('foo');
                        }).toThrow();
                    });

                    it('function.', () => {
                        expect(() => {
                            instance = new DB(() => {});
                        }).toThrow();
                    });

                    describe('object but:', () => {
                        it('empty.', () => {
                            expect(() => {
                                instance = new DB({});
                            }).toThrow();
                        });

                        describe('property `host` is:', () => {
                            it('missing.', () => {
                                expect(() => {
                                    delete invalidConfig.host;

                                    instance = new DB(invalidConfig);
                                }).toThrow();
                            });

                            it('null.', () => {
                                expect(() => {
                                    invalidConfig.host = null;

                                    instance = new DB(invalidConfig);
                                }).toThrow();
                            });

                            it('number.', () => {
                                expect(() => {
                                    invalidConfig.host = 33;

                                    instance = new DB(invalidConfig);
                                }).toThrow();
                            });

                            it('empty string.', () => {
                                expect(() => {
                                    invalidConfig.host = '';

                                    instance = new DB(invalidConfig);
                                }).toThrow();
                            });

                            it('object.', () => {
                                expect(() => {
                                    invalidConfig.host = { foo: 'bar' };

                                    instance = new DB(invalidConfig);
                                }).toThrow();
                            });

                            it('function.', () => {
                                expect(() => {
                                    invalidConfig.host = () => {};

                                    instance = new DB(invalidConfig);
                                }).toThrow();
                            });
                        });

                        describe('property `port` is:', () => {
                            it('missing.', () => {
                                expect(() => {
                                    delete invalidConfig.port;

                                    instance = new DB(invalidConfig);
                                }).toThrow();
                            });

                            it('null.', () => {
                                expect(() => {
                                    invalidConfig.port = null;

                                    instance = new DB(invalidConfig);
                                }).toThrow();
                            });

                            it('string.', () => {
                                expect(() => {
                                    invalidConfig.port = 'foo';

                                    instance = new DB(invalidConfig);
                                }).toThrow();
                            });

                            it('negative number.', () => {
                                expect(() => {
                                    invalidConfig.port = -123;

                                    instance = new DB(invalidConfig);
                                }).toThrow();
                            });

                            it('object.', () => {
                                expect(() => {
                                    invalidConfig.port = { foo: 'bar' };

                                    instance = new DB(invalidConfig);
                                }).toThrow();
                            });

                            it('function.', () => {
                                expect(() => {
                                    invalidConfig.port = () => {};

                                    instance = new DB(invalidConfig);
                                }).toThrow();
                            });
                        });

                        describe('property `database` is:', () => {
                            it('missing.', () => {
                                expect(() => {
                                    delete invalidConfig.database;

                                    instance = new DB(invalidConfig);
                                }).toThrow();
                            });

                            it('null.', () => {
                                expect(() => {
                                    invalidConfig.database = null;

                                    instance = new DB(invalidConfig);
                                }).toThrow();
                            });

                            it('number.', () => {
                                expect(() => {
                                    invalidConfig.database = 33;

                                    instance = new DB(invalidConfig);
                                }).toThrow();
                            });

                            it('empty string.', () => {
                                expect(() => {
                                    invalidConfig.database = '';

                                    instance = new DB(invalidConfig);
                                }).toThrow();
                            });

                            it('object.', () => {
                                expect(() => {
                                    invalidConfig.database = { foo: 'bar' };

                                    instance = new DB(invalidConfig);
                                }).toThrow();
                            });

                            it('function.', () => {
                                expect(() => {
                                    invalidConfig.database = () => {};

                                    instance = new DB(invalidConfig);
                                }).toThrow();
                            });
                        });

                        describe('property `user` is:', () => {
                            it('missing.', () => {
                                expect(() => {
                                    delete invalidConfig.user;

                                    instance = new DB(invalidConfig);
                                }).toThrow();
                            });

                            it('null.', () => {
                                expect(() => {
                                    invalidConfig.user = null;

                                    instance = new DB(invalidConfig);
                                }).toThrow();
                            });

                            it('number.', () => {
                                expect(() => {
                                    invalidConfig.user = 33;

                                    instance = new DB(invalidConfig);
                                }).toThrow();
                            });

                            it('empty string.', () => {
                                expect(() => {
                                    invalidConfig.user = '';

                                    instance = new DB(invalidConfig);
                                }).toThrow();
                            });

                            it('object.', () => {
                                expect(() => {
                                    invalidConfig.user = { foo: 'bar' };

                                    instance = new DB(invalidConfig);
                                }).toThrow();
                            });

                            it('function.', () => {
                                expect(() => {
                                    invalidConfig.user = () => {};

                                    instance = new DB(invalidConfig);
                                }).toThrow();
                            });
                        });

                        describe('property `password` is:', () => {
                            it('missing.', () => {
                                expect(() => {
                                    delete invalidConfig.password;

                                    instance = new DB(invalidConfig);
                                }).toThrow();
                            });

                            it('null.', () => {
                                expect(() => {
                                    invalidConfig.password = null;

                                    instance = new DB(invalidConfig);
                                }).toThrow();
                            });

                            it('number.', () => {
                                expect(() => {
                                    invalidConfig.password = 33;

                                    instance = new DB(invalidConfig);
                                }).toThrow();
                            });

                            it('object.', () => {
                                expect(() => {
                                    invalidConfig.password = { foo: 'bar' };

                                    instance = new DB(invalidConfig);
                                }).toThrow();
                            });

                            it('function.', () => {
                                expect(() => {
                                    invalidConfig.password = () => {};

                                    instance = new DB(invalidConfig);
                                }).toThrow();
                            });
                        });
                    });
                });
            });
        });

        describe('Success:', () => {
            let instance;

            beforeEach(() => {
                instance = null;
            });

            afterEach(async (done) => {
                expect(instance).not.toBe(null);
                expect(instance).toBeInstanceOf(DB);

                await instance.destroy();

                done();
            });

            it('does not throw an error if the parameters are valid.', () => {
                expect(() => {
                    instance = new DB(validConfig);
                }).not.toThrow();
            });
        });
    });

    describe('Public methods:', () => {
        let instance;

        beforeEach(() => {
            instance = new DB(validConfig);

            mockDb.mock(instance);
        });

        afterEach(async (done) => {
            await instance.destroy();

            done();
        });

        describe('initOracle:', () => {
            let validOracleValues;

            beforeEach(() => {
                validOracleValues = {
                    oracleEndpoint: {
                        createdBy: 'fake oracle',
                        value: 'http://fake-oracle.mowali.com',
                    },
                    partyIdType: {
                        name: 'fake name',
                        description: 'fake description',
                    },
                };
            });

            describe('Failures:', () => {
                describe('Throws an error if:', () => {
                    it('no arguments are provided.', async () => {
                        await expect(instance.initOracle()).rejects.toThrow();
                    });

                    describe('first argument is:', () => {
                        let invalidOracleValues;

                        beforeEach(() => {
                            invalidOracleValues = JSON.parse(JSON.stringify(validOracleValues));
                        });

                        it('null.', async () => {
                            await expect(instance.initOracle(null)).rejects.toThrow();
                        });

                        it('number.', async () => {
                            await expect(instance.initOracle(33)).rejects.toThrow();
                        });

                        it('string.', async () => {
                            await expect(instance.initOracle('foo')).rejects.toThrow();
                        });

                        it('function.', async () => {
                            await expect(instance.initOracle(() => {})).rejects.toThrow();
                        });

                        describe('object but:', () => {
                            it('empty.', async () => {
                                await expect(instance.initOracle({})).rejects.toThrow();
                            });

                            describe('property `oracleEndpoint` is:', () => {
                                it('missing.', async () => {
                                    delete invalidOracleValues.oracleEndpoint;

                                    await expect(instance.initOracle(invalidOracleValues))
                                        .rejects
                                        .toThrow();
                                });

                                it('null.', async () => {
                                    invalidOracleValues.oracleEndpoint = null;

                                    await expect(instance.initOracle(invalidOracleValues))
                                        .rejects
                                        .toThrow();
                                });

                                it('number.', async () => {
                                    invalidOracleValues.oracleEndpoint = 33;

                                    await expect(instance.initOracle(invalidOracleValues))
                                        .rejects
                                        .toThrow();
                                });

                                it('string.', async () => {
                                    invalidOracleValues.oracleEndpoint = 'foo';

                                    await expect(instance.initOracle(invalidOracleValues))
                                        .rejects
                                        .toThrow();
                                });

                                it('function.', async () => {
                                    invalidOracleValues.oracleEndpoint = () => {};

                                    await expect(instance.initOracle(invalidOracleValues))
                                        .rejects
                                        .toThrow();
                                });

                                describe('object but:', () => {
                                    describe('property `createdBy` is:', () => {
                                        it('missing.', async () => {
                                            delete invalidOracleValues.oracleEndpoint.createdBy;

                                            await expect(instance.initOracle(invalidOracleValues))
                                                .rejects
                                                .toThrow();
                                        });

                                        it('null.', async () => {
                                            invalidOracleValues.oracleEndpoint.createdBy = null;

                                            await expect(instance.initOracle(invalidOracleValues))
                                                .rejects
                                                .toThrow();
                                        });

                                        it('number.', async () => {
                                            invalidOracleValues.oracleEndpoint.createdBy = 33;

                                            await expect(instance.initOracle(invalidOracleValues))
                                                .rejects
                                                .toThrow();
                                        });

                                        it('empty string.', async () => {
                                            invalidOracleValues.oracleEndpoint.createdBy = '';

                                            await expect(instance.initOracle(invalidOracleValues))
                                                .rejects
                                                .toThrow();
                                        });

                                        it('function.', async () => {
                                            invalidOracleValues
                                                .oracleEndpoint
                                                .createdBy = () => {};

                                            await expect(instance.initOracle(invalidOracleValues))
                                                .rejects
                                                .toThrow();
                                        });
                                    });

                                    describe('property `value` is:', () => {
                                        it('missing.', async () => {
                                            delete invalidOracleValues.oracleEndpoint.value;

                                            await expect(instance.initOracle(invalidOracleValues))
                                                .rejects
                                                .toThrow();
                                        });

                                        it('null.', async () => {
                                            invalidOracleValues.oracleEndpoint.value = null;

                                            await expect(instance.initOracle(invalidOracleValues))
                                                .rejects
                                                .toThrow();
                                        });

                                        it('number.', async () => {
                                            invalidOracleValues.oracleEndpoint.value = 33;

                                            await expect(instance.initOracle(invalidOracleValues))
                                                .rejects
                                                .toThrow();
                                        });

                                        it('empty string.', async () => {
                                            invalidOracleValues.oracleEndpoint.value = '';

                                            await expect(instance.initOracle(invalidOracleValues))
                                                .rejects
                                                .toThrow();
                                        });
                                    });

                                    it('function.', async () => {
                                        invalidOracleValues.oracleEndpoint.value = () => {};

                                        await expect(instance.initOracle(invalidOracleValues))
                                            .rejects
                                            .toThrow();
                                    });
                                });
                            });
                        });

                        describe('property `partyIdType` is:', () => {
                            it('missing.', async () => {
                                delete invalidOracleValues.partyIdType;

                                await expect(instance.initOracle(invalidOracleValues))
                                    .rejects
                                    .toThrow();
                            });

                            it('null.', async () => {
                                invalidOracleValues.partyIdType = null;

                                await expect(instance.initOracle(invalidOracleValues))
                                    .rejects
                                    .toThrow();
                            });

                            it('number.', async () => {
                                invalidOracleValues.partyIdType = 33;

                                await expect(instance.initOracle(invalidOracleValues))
                                    .rejects
                                    .toThrow();
                            });

                            it('string.', async () => {
                                invalidOracleValues.partyIdType = 'foo';

                                await expect(instance.initOracle(invalidOracleValues))
                                    .rejects
                                    .toThrow();
                            });

                            it('function.', async () => {
                                invalidOracleValues.partyIdType = () => {};

                                await expect(instance.initOracle(invalidOracleValues))
                                    .rejects
                                    .toThrow();
                            });

                            describe('object but:', () => {
                                describe('property `name` is:', () => {
                                    it('missing.', async () => {
                                        delete invalidOracleValues.partyIdType.name;

                                        await expect(instance.initOracle(invalidOracleValues))
                                            .rejects
                                            .toThrow();
                                    });

                                    it('null.', async () => {
                                        invalidOracleValues.partyIdType.name = null;

                                        await expect(instance.initOracle(invalidOracleValues))
                                            .rejects
                                            .toThrow();
                                    });

                                    it('number.', async () => {
                                        invalidOracleValues.partyIdType.name = 33;

                                        await expect(instance.initOracle(invalidOracleValues))
                                            .rejects
                                            .toThrow();
                                    });

                                    it('empty string.', async () => {
                                        invalidOracleValues.partyIdType.name = '';

                                        await expect(instance.initOracle(invalidOracleValues))
                                            .rejects
                                            .toThrow();
                                    });

                                    it('function.', async () => {
                                        invalidOracleValues
                                            .partyIdType
                                            .name = () => {};

                                        await expect(instance.initOracle(invalidOracleValues))
                                            .rejects
                                            .toThrow();
                                    });
                                });

                                describe('property `description` is:', () => {
                                    it('missing.', async () => {
                                        delete invalidOracleValues.partyIdType.description;

                                        await expect(instance.initOracle(invalidOracleValues))
                                            .rejects
                                            .toThrow();
                                    });

                                    it('null.', async () => {
                                        invalidOracleValues.partyIdType.description = null;

                                        await expect(instance.initOracle(invalidOracleValues))
                                            .rejects
                                            .toThrow();
                                    });

                                    it('number.', async () => {
                                        invalidOracleValues.partyIdType.description = 33;

                                        await expect(instance.initOracle(invalidOracleValues))
                                            .rejects
                                            .toThrow();
                                    });

                                    it('empty string.', async () => {
                                        invalidOracleValues.partyIdType.description = '';

                                        await expect(instance.initOracle(invalidOracleValues))
                                            .rejects
                                            .toThrow();
                                    });

                                    it('function.', async () => {
                                        invalidOracleValues
                                            .partyIdType
                                            .description = () => {};

                                        await expect(instance.initOracle(invalidOracleValues))
                                            .rejects
                                            .toThrow();
                                    });
                                });
                            });
                        });
                    });
                });
            });

            describe('Success:', () => {
                it('does not throw an error if the passed arguments are valid.', async () => {
                    await expect(instance.initOracle(validOracleValues)).resolves.not.toThrow();
                });
            });
        });
    });
});
