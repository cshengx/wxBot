const wechaty = require('wechaty').Wechaty;

console.log(wechaty)
const bot = wechaty.instance();
bot.on('scan', function(url, code) { console.log(" Scan QR Code to login: " + code + "\n" + url)})
.on('login',function(user) { console.log("user " + user + " login success")})
.on('message',  function(message) { console.log("Message: " + message)})
bot.init();