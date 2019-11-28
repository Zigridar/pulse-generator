const electronInstaller = require('electron-winstaller');


(async () => {
  try {
    await electronInstaller.createWindowsInstaller({
      appDirectory: 'D:/Users/ZIGRIDAR/Desktop/Atom/pulse-generator/GUI/dist/app-win32-x64',
      outputDirectory: 'D:/Users/ZIGRIDAR/Desktop/Atom/pulse-generator/GUI/dist/installer',
      authors: 'My App Inc.',
      exe: 'app.exe'
    });
    console.log('It worked!');
  } catch (e) {
    console.log(`No dice: ${e.message}`);
  }

})()
