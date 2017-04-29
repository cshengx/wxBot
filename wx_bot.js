const wechaty = require('wechaty').Wechaty;
require('es6-promise').polyfill();
require('isomorphic-fetch');

var isStart = false;

var api = 'http://sandbox.api.simsimi.com/request.p';
var options = {
    // key: '',
    key: '',
    lc: 'zh',
    ft: '0.0',
    text: 'hello'
};

const bot = wechaty.instance();
bot.on('scan', function(url, code) { console.log(" Scan QR Code to login: " + code + "\n" + url)})
.on('login',function(user) { console.log("user " + user + " login success")})
.on('message',function(message) { if(!message.self()){

    if(message.toString() === "stop chat" )
        isStart = false;

    if(isStart){

        var optionText = ""
        options.text = encodeURI(message);

        for(var key in options){
            optionText += "&" + key + "=" + options[key];
        }

        optionText = optionText.substring(1,optionText.length);

        console.log(optionText);

        fetch(api + "?" + optionText, {
            method: "GET",
            dataType:"json",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json; charset=utf-8"
            }
        })
            .then(function(response) {
                return response.json()
            })
            .then(function(json) {
                console.log(json)
                if(!!json.response){
                    message.say(json.response)
                }else{
                    message.say("我不是太懂你在说什么");
                }
            });
    }

    if(message.toString() === "start chat" )
        isStart = true;

} })
bot.init();





