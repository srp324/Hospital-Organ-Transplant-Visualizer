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
        allOrgans(_, params) {
            let session = driver.session(),
                query = `MATCH (o:Organ) RETURN o.name`
            return session.run(query, params)
                .then(result => {
                    return result.records.map(record => {
                        return record.get("o.name")
                    })
                })
        },
        getHospital(_, params) {
            let session = driver.session(),
                query = `MATCH (h:Hospital) WHERE h.name = $name RETURN h`
            return session.run(query, params)
                .then(result => {
                    return result.records.map(record => {
                        return record.get("h").properties
                    })
                })
        },
        getOrgan(_, params) {
            let session = driver.session(),
                query = `MATCH (o:Organ {name: $name})<-[t:TRANSPLANTS]-(h:Hospital) 
                         RETURN {name: o.name, hospital: h.name, type: t.type, rate: t.rate, volume: t.volume} as organInfo`
            return session.run(query, params)
                .then(result => {
                    return result.records.map(record => {
                        return record.get("organInfo")
                    })
                })
        }
    },

    Hospital: {
        transplants(h) {
            let session = driver.session(),
                params = {name: h.name},
                query = `MATCH (h:Hospital {name: $name})-[t:TRANSPLANTS]->(o:Organ)
                        RETURN {name: o.name, hospital: h.name, type: t.type, rate: t.rate, volume: t.volume} as transplant`
            return session.run(query, params)
                .then(result => {
                    return result.records.map(record => {
                        return record.get("transplant");
                    })
                })
        }
    }
};

export default resolvers;