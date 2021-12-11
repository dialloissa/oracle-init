# Oracle Initialize
A standalone script that communicates with a MySQL database and imports data related with the different kinds of oracles, such as [als-oracle-merchant](https://github.com/casablanca-project/als-oracle-merchant) and [als-oracle-pathfinder](https://github.com/casablanca-project/als-oracle-pathfinder), which are totally configurable by the passed environmental variables. 

### Installation
```
cd src
yarn install
```

### Configuration
Edit `config/index.js` with the appropriate values. 

The configuration parameters are described below:

* The MySQL listening host (string) - `db.host`;
* The MySQL listening port (number) - `db.port`;
* The MySQL target database to connect with (string) - `db.database`;
* The MySQL user (string) - `db.user`;
* The MySQL password (string) - `db.password`;
* The MySQL values to insert for each table and more specifically:
    * The values to insert in the table `oracleEndpoint`:
        * (string) - `values.oracleEndpoint.createdBy`
        * (string) - `values.oracleEndpoint.value`
    * The values to insert in the table `partyIdType`:
        * (string) - `values.partyIdType.name`
        * (string) - `values.partyIdType.description`
       
```
    {
        db: {
            host: <string>,
            port: <number>,
            database: <string>,
            user: <string>,
            password: <string>
        },
        values: {
            oracleEndpoint: <object>,
            partyIdType: <object>
        }
    }
```

### Running
```
cd src
yarn run start
``` 

### Testing
#### Unit tests
```
cd src
yarn run test
```