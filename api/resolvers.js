var config = require('../config.json');
import {v1 as neo4j} from 'neo4j-driver';

//Create Neo4j Driver Instance
let driver = neo4j.driver(config.neoHost + ":" + config.neoPort, neo4j.auth.basic(config.neoUser, config.neoPass));

const resolveFunctions = {
};

export default resolveFunctions;