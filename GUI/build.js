//installer build script
const electronInstaller = require('electron-winstaller');
const path = require('path');

(async () => {
  try {
    await electronInstaller.createWindowsInstaller({
      appDirectory: path.join(__dirname, 'dist/app-win32-x64'),
      outputDirectory: path.join(__dirname, 'dist/installer'),
      authors: 'ZIGRIDAR',
      exe: 'app.exe',
      setupExe: 'pulse_generator_setup.exe',
      noMsi: true,
      owners: 'ZIGRIDAR',
      description: 'pulse generator GUI',
      iconUrl: path.join(__dirname, 'img/flash.ico'),
      setupIcon: path.join(__dirname, 'img/flash.ico')
      // loadingGif: path.join(__dirname, 'img/installation.gif')
    });
    console.log('Installer has been success created');
  } catch (e) {
    console.log(`Failed to create installer: ${e.message}`);
  }
})()
