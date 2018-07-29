//Import and initialization
import express from 'express';
import request from 'request';
import cheerio from 'cheerio';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from './api/schema';

const GRAPHQL_PORT = 8080;

var app = express();
var gql = require('./modules/gql');
var gqlService = new gql.Service();

app.use(express.static("."));
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(GRAPHQL_PORT, () =>
  console.log(
    `Server started on port http://localhost:${GRAPHQL_PORT}/ \n \
    GraphiQL is running on http://localhost:${GRAPHQL_PORT}/graphiql`
  )
);

app.get("/getOrgan", function (req, res) {
  gqlService.once('resp', function (msg) {
    res.send(msg);
  });
  gqlService.getOrgan(req.query.organ);
});

app.get("/allHospitals", function (req, res) {
  gqlService.once('resp', function (msg) {
    res.send(msg);
  });
  gqlService.allHospitals();
});

app.get("/getHospital", function (req, res) {
  gqlService.once('resp', function (msg) {
    res.send(msg);
  });
  gqlService.getHospital(req.query.name);
});

app.get("/loadSearch", function (req, res) {
  gqlService.once('resp', function (msg) {
    res.send(msg);
  });
  gqlService.loadSearch();
});

