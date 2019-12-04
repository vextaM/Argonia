const fs = require('fs');
const http = require('http');
const md5File = require('md5-file')
const unzipper = require('unzipper')

const loggerDownload = LoggerUtil('%c[Downloading System]', 'color: #cdbge27; font-weight: bold;');

const app = remote.app;
var dir = app.getPath('userData') + '/ArgoniaLauncher';
var libsDir = dir + '/libs';
var nativesDir = dir + '/natives';
var dlinfo = document.getElementById('dlinfo');

shell.mkdir('-p', dir);
shell.mkdir('-p', nativesDir);

loggerDownload.log(dir + ' = dir');

function downloadFile(file_url, targetPath, sum){
    var req = request({
        method: 'GET',
        uri: file_url
    });

    var out = fs.createWriteStream(targetPath);
    req.pipe(out);

    req.on('end', function() {
      const hash = md5File.sync(targetPath);
      if(sum == hash) {
        loggerDownload.log('downloaded ' + targetPath);
      } else {
        downloadFile(file_url, targetPath, sum)
        loggerDownload.log('error occured in : ' + targetPath)
      }
    });
}

function dlAll() {
  downloadFile('http://launcher.argonia.fr/minecraft.jar', dir + '/minecraft.jar', 'e6b7a531b95d0c172acb704d1f54d1b3');
  downloadFile('http://launcher.argonia.fr/natives/OpenAL64.dll', nativesDir + '/OpenAL64.dll', '89021c218a3f6feb807a664f852ffbd3');
  downloadFile('http://launcher.argonia.fr/natives/OpenAL32.dll', nativesDir + '/OpenAL32.dll', '9e02334f9bba622885eadb059f0633b3');
  downloadFile('http://launcher.argonia.fr/natives/openal.dylib', nativesDir + '/openal.dylib', 'bc569baa70d2bb599af6a939de356cb2');
  downloadFile('http://launcher.argonia.fr/natives/lwjgl64.dll', nativesDir + '/lwjgl64.dll', '3fcf8b1bd4c9066ff815d887a4192456');
  downloadFile('http://launcher.argonia.fr/natives/lwjgl.dll', nativesDir + '/lwjgl.dll', 'f4a31218fcb01a9a8946f4f315e91aa8');
  downloadFile('http://launcher.argonia.fr/natives/libopenal64.so', nativesDir + '/libopenal64.so', 'c37b4211431a33a4ab014ef47b05b363');
  downloadFile('http://launcher.argonia.fr/natives/libopenal.so', nativesDir + '/libopenal.so', '88132ac290c53e72094a0709185adb21');
  downloadFile('http://launcher.argonia.fr/natives/liblwjgl64.so', nativesDir + '/liblwjgl64.so', '1737d2260df2e592d283dbb9df34a0b6');
  downloadFile('http://launcher.argonia.fr/natives/liblwjgl.so', nativesDir + '/liblwjgl.so', '174fb7ce1efe53300db07adce59482d2');
  downloadFile('http://launcher.argonia.fr/natives/liblwjgl.jnilib', nativesDir + '/liblwjgl.jnilib', '132d2055935567bdf2d480ab06585c60');
  downloadFile('http://launcher.argonia.fr/natives/libjinput-osx.jnilib', nativesDir + '/libjinput-osx.jnilib', 'b0f62f4735ad754a7e6c8e2f744a0523');
  downloadFile('http://launcher.argonia.fr/natives/libjinput-linux64.so', nativesDir + '/libjinput-linux64.so', '23a6b611eaab617a9394f932b69ae034');
  downloadFile('http://launcher.argonia.fr/natives/libjinput-linux.so', nativesDir + '/libjinput-linux.so', 'f2317f7c050cd441510423e90fb16dfd');
  downloadFile('http://launcher.argonia.fr/natives/jinput-raw_64.dll', nativesDir + '/jinput-raw_64.dll', '4d1cfc36d1b5b1dd496d6e3090044cb1');
  downloadFile('http://launcher.argonia.fr/natives/jinput-raw.dll', nativesDir + '/jinput-raw.dll', '88f04991b739b891d8e30f02db3b933e');
  downloadFile('http://launcher.argonia.fr/natives/jinput-dx8_64.dll', nativesDir + '/input-dx8_64.dll', 'f1a51706365a44ea21aa96a9a04bfb37');
  downloadFile('http://launcher.argonia.fr/natives/jinput-dx8.dll', nativesDir + '/input-dx8.dll', 'ae25629d223b95f73f2f27800da6bbb3');
  downloadFile('http://launcher.argonia.fr/else.zip', dir + '/else.zip', '5c921b3c3593b0b9cd37c28e2fdb40b7');
}

dlAll();
document.getElementById('btnjouer').style.visibility = 'hidden';
function checknunzip() {
  var elseSum = md5File.sync(dir + '/else.zip');
  if(elseSum == '5c921b3c3593b0b9cd37c28e2fdb40b7') {
    fs.createReadStream(dir + '/else.zip')
    .pipe(unzipper.Extract({ path: dir }));
    setTimeout(function() {
    dlinfo.innerHTML = 'Cliquez sur jouer pour nous rejoindre.';
    document.getElementById('btnjouer').style.visibility = 'visible';
    loggerDownload.log('DL & Unzip done')
    }, 10000);
  } else {
    setTimeout(checknunzip, 5000);
  }
}

checknunzip();
