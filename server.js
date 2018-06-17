//Import and initialization
import express from 'express';
import request from 'request';
import cheerio from 'cheerio';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from './data/schema';

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

app.get('/getData', function (req, res) {
    request({
        //TODO: Make URL Dynamic
        uri: "https://www.srtr.org/transplant-centers/?&organ=kidney&recipientType=adult&sort=rating&page=1/",
    }, function (error, response, body) {
        var $ = cheerio.load(body);

        var hospitals = [];
        $('li[class=searchResults-item]').each(function(i, elem) {
            hospitals[i] = { 
                name: $('.searchResults-name h5').eq(i).text(),
                volume: $('.searchResults-transplantVolume-hd').eq(i).text(),
                rate: $('.searchResults-transplantRate-hd').eq(i).text(),
                type: "adult"
            }
        });

        res.send(JSON.stringify(hospitals));
    });
})
