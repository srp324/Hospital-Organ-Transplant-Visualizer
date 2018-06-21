var config = require('../config.json');
import {v1 as neo4j} from 'neo4j-driver';

//Create Neo4j Driver Instance
let driver = neo4j.driver(config.neoHost + ":" + config.neoPort, neo4j.auth.basic(config.neoUser, config.neoPass));

const resolvers = {
    Query: {
        // here we define the resolver for the movies query, which searches for movies by title
        // params object contains the values for the substring and limit parameters 
        allHospitals(_, params) {
          // query Neo4j for matching movies
          let session = driver.session();
          let query = "MATCH (h:Hospital) RETURN h"
          return session.run(query, params)
          .then(result => { 
              return result.records.map(record => { 
                    return record.get("h").properties 
                })
            })
        },
      }
};

export default resolvers;