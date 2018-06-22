//Import and initialization
import express from 'express';
import request from 'request';
import cheerio from 'cheerio';
import bodyParser from 'body-parser';

const LOCAL_PORT = 8080;

var app = express();

app.use(express.static("."));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.listen(LOCAL_PORT, () =>
    console.log(`Server started on port http://localhost:${LOCAL_PORT}/`)
);

app.get('/scrapeData', function (req, res) {
    request({
        uri: "https://www.srtr.org/transplant-centers/?&organ=" + req.query.organ + "&recipientType=" + req.query.type + "&page=" + req.query.page,
    }, function (error, response, body) {
        var $ = cheerio.load(body);

        var hospitals = [];
        $('li[class=searchResults-item]').each(function (i, elem) {
            hospitals[i] = {
                name: $('.searchResults-name h5').eq(i).text(),
                volume: $('.searchResults-transplantVolume-hd').eq(i).text(),
                rate: $('.searchResults-transplantRate-hd').eq(i).text(),
                organ: req.query.organ,
                type: req.query.type
            }
        });
        
        res.send(JSON.stringify(hospitals));
    });
})
