var config = require('../config.json');
import { v1 as neo4j } from 'neo4j-driver';

//Create Neo4j Driver Instance
let driver = neo4j.driver(config.neoHost + ":" + config.neoPort, neo4j.auth.basic(config.neoUser, config.neoPass));

const resolvers = {
    Query: {
        allHospitals(_, params) {
            let session = driver.session(),
                query = `MATCH (h:Hospital) RETURN h`
            return session.run(query, params)
                .then(result => {
                    return result.records.map(record => {
                        return record.get("h").properties
                    })
                })
        },
    },

    Hospital: {
        organs(h) {
            let session = driver.session(),
                params = {name: h.name},
                query = `MATCH (h:Hospital {name: $name})-[t:TRANSPLANTS]->(o:Organ)
                        RETURN DISTINCT o.name as organs`
            return session.run(query, params)
                .then(result => {
                    return result.records.map(record => {
                        return record.get("organs");
                    })
                })
        }
    }
    
    //TODO: Transplant Rates and Volumes
};

export default resolvers;