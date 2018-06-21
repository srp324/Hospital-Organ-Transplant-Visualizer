var config = require('../config.json');
import { v1 as neo4j } from 'neo4j-driver';

//Create Neo4j Driver Instance
let driver = neo4j.driver(config.neoHost + ":" + config.neoPort, neo4j.auth.basic(config.neoUser, config.neoPass));

const resolvers = {
    Query: {
        allHospitals(_, params) {
            let session = driver.session();
            let query = `MATCH (h:Hospital) RETURN h`
            return session.run(query, params)
                .then(result => {
                    return result.records.map(record => {
                        return record.get("h").properties
                    })
                })
        },
    },

    /* BUG within Neo4j: Running this query deletes the Sandbox
    Hospital: {
        organs(_, params) {
            console.log(_, params);
            let session = driver.session();
            let query = `MATCH (h:Hospital {name: "PIEDMONT HOSPITAL"})-[t:TRANSPLANTS]-(o:Organ)
            RETURN DISTINCT o`
            return session.run(query, params)
                .then(result => {
                    return result.records.map(record => {
                        console.log(record.get("o").properties);
                        return record.get("o").properties
                    })
                })
        }
    }
    */
};

export default resolvers;