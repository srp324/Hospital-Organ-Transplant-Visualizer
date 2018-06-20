//Import and initialization
import express from 'express';
import request from 'request';
import cheerio from 'cheerio';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from './api/schema';

const GRAPHQL_PORT = 8080;

var app = express();

app.use(express.static("."));
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(GRAPHQL_PORT, () =>
  console.log(
    `Server started on port http://localhost:${GRAPHQL_PORT}/ \n \
    GraphiQL is running on http://localhost:${GRAPHQL_PORT}/graphiql`
  )
);

//TODO: 1. Setup Neo4j Sandbox Database - 90%
    //TODO: 1a. Get rid of child/adult rates with 0 in data.json/csv as that just means the hospital only treats either child or adult
//TODO: 2. Connect GraphQL to Neo4j Sandbox