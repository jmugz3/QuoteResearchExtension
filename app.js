var http = require('http');
var oauth = require('oauth').OAuth;
var configuration = require('./tradekingConfig')();
var xml2json = require('xml2json');

var url = configuration.url;

var requestToken = 'https://developers.tradeking.com/oauth/request_token';
var userAuthorization = 'https://developers.tradeking.com/oauth/authorize';
var accessToken = 'https://developers.tradeking.com/oauth/access_token';


// TODO : Must update API calls to match new Ally Invest instead of TradeKing

var tradeking_consumer = new oauth(
  requestToken,
  accessToken,
  configuration.consumer_key,
  configuration.consumer_secret,
  "1.0",
  null,
  "HMAC-SHA1");


function marketClock(error, callback){

  tradeking_consumer.get(
    configuration.api_url + '/market/clock.json', configuration.access_token,
    configuration.access_secret,
    function(error, data, response) {
      if (error) console.error(error);
      //var d = xml2json.toJson(data);
      var d = JSON.parse(data);
      console.log(d.response);
      callback(d.response);
    }
  );

  //console.log(d.response);
}

console.log(marketClock());
