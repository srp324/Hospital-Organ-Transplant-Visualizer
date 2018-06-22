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