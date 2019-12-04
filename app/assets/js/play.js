const loggerLaunch = LoggerUtil('%c[Launch]', 'color: #abcdefg; font-weight: bold;');
var shell = require('shelljs');

function launchGame() {
    var ram;
    try {
        var data = fs.readFileSync(dir + "/vOptions/ram.txt", 'utf8');
        ram = data;
    } catch(e) {
        console.log('Error:', e.stack);
    }

    var command = 'java ' + "-Xms64M -Xmx" + ram + "G" + ' -XX:-UseAdaptiveSizePolicy -XX:+UseConcMarkSweepGC -Djava.library.path=' + nativesDir + ' -Dfml.ignoreInvalidMinecraftCertificates=true -Dfml.ignorePatchDiscrepancies=true' + ' -cp "';
    var cp = '';

    fs.readdir(libsDir, function(err, items) {
        if (err) {
            return loggerLaunch.log('Unable to scan directory: ' + err);
        }
        for (var i=0; i<items.length; i++) {
            cp = cp + libsDir + '/' + items[i] + ';';
        }
    });

    setTimeout(function() {
        cp = cp + dir + "/minecraft.jar";
        command = command + cp + '" net.minecraft.client.main.Main --username=' + userInput + ' --accessToken null --version 1.7.10 --gameDir ' + dir + '  --assetIndex 1.7.10 --userProperties {} --uuid null';
        loggerLaunch.log("Commande de lancement: " + command);
        shell.exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        });
    }, 5000);
}
