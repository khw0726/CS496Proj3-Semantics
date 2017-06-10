//I hate CORS

var express = require('express');
var app = express();
var OAuth = require('oauth');

var user_token;
var user_secret;
var diary;
var response;
var len=0;
var writings="";
var writing0="";
var writing1="";
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
app.get('/', function(req, res){
res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
//res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//res.setHeader('Access-Control-Allow-Credentials', true);

user_token=req.query.user_token;
user_secret=req.query.user_secret;
diary=req.query.diary;
response=req.query.response;

writings=diary+response;

len=diary.length+response.length;

var oauth = new OAuth.OAuth(
      'https://api.twitter.com/oauth/request_token',
      'https://api.twitter.com/oauth/access_token',
      '',      //App consumer key for twitter
      '',     //App secret key for twitter
      '1.0A',
      null,
      'HMAC-SHA1'
    );


var oauth_post=function(){
        writing0=writings.substring(0,137);
        writing1=writings.substring(137,writings.length);
        writings=writing1;
        if(writing0 !== ''){

        oauth.post(
      'https://api.twitter.com/1.1/statuses/update.json',
      user_token,       //User token
      user_secret,      //User secret
        {"status": writing0 },
        function (e, data, res){
        if (e) console.error(e);
        else {
        console.log(require('util').inspect(data));
        oauth_post();
        }
      })}
}


//while(writings!=''){

//writing0=writings.substring(0,137);
//writing1=writings.substring(137,writings.length);
//writings=writing1;

oauth_post();

}
);
app.listen(3000);
