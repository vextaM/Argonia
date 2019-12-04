const {remote} = require('electron');
const loggerNav = LoggerUtil('%c[Nav]', 'color: #209b07; font-weight: bold;');

var home = document.getElementById('home');
var news = document.getElementById('news');
var options = document.getElementById('options');
var acc = document.getElementById('account');
var play = document.getElementById('playpage');
var loginPage = document.getElementById('LoginModal');
var homebtn = document.getElementById('homebtn');
var newsbtn = document.getElementById('newsbtn');
var optionsbtn = document.getElementById('optionsbtn');
var accbtn = document.getElementById('MyAccount');
var loginbtn = document.getElementById('Login');

document.addEventListener('keydown', function (e) {
    if((e.key === 'I' || e.key === 'i') && e.ctrlKey && e.shiftKey) {
        let window = remote.getCurrentWindow();
        window.toggleDevTools({mode:'undocked'});
    }
});

function clearPage() {
  if(!home.classList.contains("hide")) {
     home.classList.add("hide");
  }
  if(!news.classList.contains("hide")) {
    news.classList.add("hide");
  }
  if(!options.classList.contains("hide")) {
    options.classList.add("hide");
  }
  if(!acc.classList.contains("hide")) {
    acc.classList.add("hide");
  }
  if(!play.classList.contains("hide")) {
    play.classList.add("hide");
  }
  loginPage.style.display = "none";
  var activenav = document.querySelector(".active");
  activenav.classList.remove("active");
}

function goToHome() {
    clearPage();
    home.classList.remove('hide');
    homebtn.classList.add("active");
    loggerNav.log('went to home');
}

function goToNews() {
    clearPage();
    news.classList.remove('hide');
    newsbtn.classList.add("active");
    loggerNav.log('went to news');
}

function goToOptions() {
    clearPage();
    options.classList.remove('hide');
    optionsbtn.classList.add("active");
    loggerNav.log('went to options');
    shell.mkdir('-p', dir + "/vOptions");
    try {
        var data = fs.readFileSync(dir + "/vOptions/ram.txt", 'utf8');
        rs.value = data;
    } catch(e) {
        console.log('Error:', e.stack);
    }
    var ramvalueecrite = document.getElementById('ramvalue');
    ramvalueecrite.innerHTML = rs.value + ' Giga de ram sont alloués. Votre ram total est estimée à ' + Math.trunc(process.getSystemMemoryInfo().total / 1024 / 1024) + ' Giga.';
}

function goToAcc() {
    clearPage();
    acc.classList.remove('hide');
    accbtn.classList.add("active");
    loggerNav.log('went to account');
}

function goToPlay() {
    clearPage();
    play.classList.remove('hide');
    playbtn.classList.add("active");
    loggerNav.log('went to play');
}

function goToLog() {
    clearPage();
    loginPage.style.display = "block";
    loginbtn.classList.add("active");
    loggerNav.log('went to co')
}
