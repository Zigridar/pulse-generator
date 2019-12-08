//installer build script
const electronInstaller = require('electron-winstaller');
const path = require('path');
const os = require('os');
const arch = os.arch();

(async () => {
  try {
    console.log(`Creating an installer for platform win32 ${arch}`);
    await electronInstaller.createWindowsInstaller({
      appDirectory: path.join(__dirname, `dist/Pulse-win32-${arch}`),
      outputDirectory: path.join(__dirname, 'dist/installer'),
      authors: 'ZIGRIDAR',
      exe: 'Pulse.exe',
      setupExe: `pulse-setup-win32-${arch}.exe`,
      noMsi: true,
      owners: 'ZIGRIDAR',
      description: 'pulse generator GUI',
      iconUrl: path.join(__dirname, 'img/flash.ico'),
      setupIcon: path.join(__dirname, 'img/flash.ico')
    });
    console.log('Installer has been success created');
    console.log(`Installer path: ${path.join(__dirname, `dist/installer/pulse-setup-win32-${arch}.exe`)}`);
  }
  catch (e) {
    console.log(`Failed to create installer: ${e.message}`);
  }
})()
