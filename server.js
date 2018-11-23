import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import schema from './api/schema';
import gql from './modules/gql';

var app = express();
app.use(express.static("."));
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

const GRAPHQL_PORT = 8080;
var gqlService = new gql.Service();

app.listen(GRAPHQL_PORT, () =>
  console.log(
    `Server started on port http://localhost:${GRAPHQL_PORT}/ \n \
    GraphiQL is running on http://localhost:${GRAPHQL_PORT}/graphiql`
  )
);

//Returns a single organ and all the hospitals that transplants the organ in a GraphJSON format
app.get("/getOrgan", function (req, res) {
  gqlService.once('resp', function (msg) {
    res.send(msg);
  });
  gqlService.getOrgan(req.query.organ);
});

//Returns all the hospitals and its organs and transplants in a GraphJSON format
app.get("/allHospitals", function (req, res) {
  gqlService.once('resp', function (msg) {
    res.send(msg);
  });
  gqlService.allHospitals();
});

//Gets a single hospital and the organs that the hospital transplants in a GraphJSON format
app.get("/getHospital", function (req, res) {
  gqlService.once('resp', function (msg) {
    res.send(msg);
  });
  gqlService.getHospital(req.query.name);
});

//Loads the search results based on the hospitals in the Neo4j Database
app.get("/loadSearch", function (req, res) {
  gqlService.once('resp', function (msg) {
    res.send(msg);
  });
  gqlService.loadSearch();
});

