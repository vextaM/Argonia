const loggerOptions = LoggerUtil('%c[Options]', 'color: #ddd; font-weight: bold;');

const rs = document.getElementById('rs');
rs.max = Math.trunc(process.getSystemMemoryInfo().total / 1024 / 1024);

function ramSave() {
  fs.writeFile(dir + "/vOptions/ram.txt", rs.value , function(err) {
      if(err) {
          return loggerOptions.log(err);
      }

      loggerOptions.log("Ram saved in : " + dir + "/vOptions/ram.txt");
  });
  var ramvalueecrite = document.getElementById('ramvalue');
  ramvalueecrite.innerHTML = rs.value + ' Giga de ram sont alloués. Votre ram total est estimée à ' + Math.trunc(process.getSystemMemoryInfo().total / 1024 / 1024) + ' Giga.';
}
