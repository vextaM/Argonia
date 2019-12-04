const sha256 = require('sha256');
const LoggerUtil = require('./assets/js/loggerutil');
const loggerLogin = LoggerUtil('%c[Login]', 'color: #209b07; font-weight: bold;');
const request = require('request');

var span = document.getElementsByClassName("close")[0];
var user = document.getElementById('user');
var pass = document.getElementById('pass');
var myAccount = document.getElementById('MyAccount');
var login = document.getElementById('Login');
var playButton = document.getElementById('playbtn');


function onLogin() {
  loggerLogin.log('Logged in');
  goToHome();
  myAccount.classList.remove("hide");
  playButton.classList.remove("hide");
  login.classList.add("hide");
  userInput = user.value;
  document.getElementById("usernameAcc").innerHTML = 'Votre pseudonyme est: ' + userInput;

}

function tryLogin() {

  var url = "https://launcher.argonia.fr/Auth.php?" + "pseudo=" + user.value + "&password=" + sha256(pass.value)

  request({
    url: url,
    json: true
  }, function (error, response, body) {


    if (!error && response.statusCode === 200) {
      loggerLogin.log("trying to connect");
      if(body.authentication){
        onLogin();

      } else if(!body.authentication){
        //dialog.showErrorBox("Probléme d'authentification","Vos identifiants sont invalides !")
        loggerLogin.log('Login failed cause : invalid credentials');
      }
      else {
        //dialog.showErrorBox("Erreur:","Veuillez contacter le support. Code:0")
        loggerLogin.log('Login failed cause : none, please contact support && code 0');
      }
    } else {
      //dialog.showErrorBox("Erreur:","Veuillez contacter le support. Code:1")
      loggerLogin.log('Login failed cause : none, please contact support && code 1');
    }

  })

}
