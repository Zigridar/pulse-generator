# Pulse generator

Pulse generator is a project consisting of three different projects: GUI, Atmega16 project, Proteus project.

There is an electrophysical high voltage equipment for scientific experiments that includes a microcontroller Atmega16 (MC_2) with data exchange protocol.

Task list:
-
- Create electrical design with microcontroller Atmega16 (MC_1) that generating pulses and read data from vacuum gauge with ADC (analog-to-digital-converter)

- Create Atmega16 project with Atmel Studio that makes hex file for MC_1

- Create Proteus project to test this electrical design with hex file

- Create Graphical user interface (GUI) to control MC_1 and MC_2 from PC

![exchange](https://github.com/Zigridar/pulse-generator/blob/master/GUI/img/exchange.png)

Data exchange protocol
-
The following way is used to prevent the influence of interference from the electrophysical equipment on microcontrollers:

If you need to send several integers like 123 and 456 from PC to the microcontroller (or backwards) you have to send them using ASCII characters, moreover divider between them is a comma, i.e. you have to send array of characters
['1', '2', '3', ',', '4', '5', '6']

For more safety, you should use a checksum that is a sum of sent integers. Checksum is sent last.
['1', '2', '3', ',', '4', '5', '6', ',', '5', '7', '9']

Atmega16 project
----
This project includes four files: main.c, UART.c, ADC.c, generator.c in each of them corresponding functions are defined.

main.c includes all files with directive `#include`

Proteus project
----

This project is an electrical circuit of pulse generator. Design consists of Atmega16 (MC_1), CH340G (USB-UART converter), USB-connector, two LEDs and other components is necessary for correct work.

![proteus](https://github.com/Zigridar/pulse-generator/blob/master/GUI/img/proteus.png)
Electrical circuit

For debugging Proteus allows to launch a virtual simulation of work electrical circuit with hex file.

![oscilloscope](https://github.com/Zigridar/pulse-generator/blob/master/GUI/img/oscilloscope.png)
Virtual oscillosope

GUI
----
GUI was created with framework [electron](https://electronjs.org/) using using additional tools like [electron-packager](https://github.com/electron/electron-packager) and [windows-installer](https://github.com/electron/windows-installer).

Display interface was built with [materialize](https://materializecss.com/)

![GUI](https://github.com/Zigridar/pulse-generator/blob/master/GUI/img/display.png)

**Status bar**
+ 1 Open side menu
+ 2 Connection status of high voltage equipment (MC_2)
+ 3 Connection status of pulse generator (MC_1)
+ 4 Work status of high voltage equipment (MC_2). May be one of these:
   + ОШИБОК НЕТ
   + КЗ в нагрузке
   + Нет воды
   + Защита по току
   + КЗ в баке
   + Блокировка
   + NO CONNECTION
+ Connect button
+ Disconnect button

![status_bar](https://github.com/Zigridar/pulse-generator/blob/master/GUI/img/navbar.png)

**ВИП-40**

This field is for setting high voltage (0 - 40 kV), turning on/off equipment and display data from MC_2 (Real voltage, current).
Voltage value will be changed after button "set" was clicked.

![vip-40](https://github.com/Zigridar/pulse-generator/blob/master/GUI/img/vip-40.png)

**Pulse generator**

This field is for setting pulse frequency (1 - 200Hz), turning on/off generator and setting automatically turning on/off timers.

![pulse-generator](https://github.com/Zigridar/pulse-generator/blob/master/GUI/img/pulse-generator.png)

**Vacuum gauge**

This field is to display chart of vacuum gauge that is sent from pulse generator (MC_1).

![vacuum-gauge](https://github.com/Zigridar/pulse-generator/blob/master/GUI/img/chart.png)

**Chart options**
This field allows you to turn on/off chart drawing and to set Average, point count and axis step

![chart-options](https://github.com/Zigridar/pulse-generator/blob/master/GUI/img/chart-options.png)

**Side menu**

This menu consists of the following items:
+ install driver (CH340G)
+ open docs
+ close app

![side-menu](https://github.com/Zigridar/pulse-generator/blob/master/GUI/img/side.png)

**Notifications**

There are several types of notifications:
+ Success
+ Warning
+ Error
+ Close app

**Success** is emitted when device was connected/disconnected using CONNECT/DISCONNECT button

![success](https://github.com/Zigridar/pulse-generator/blob/master/GUI/img/success.png)

**Warning** is emitted when generator was turn on/off using timer

![warning](https://github.com/Zigridar/pulse-generator/blob/master/GUI/img/warning.png)

**Error** is emitted when:
+ There aren't any available devices
+ Device was disconnected without DISCONNECT button
+ Button START was clicked when one of chosen timers is set to zero

![error](https://github.com/Zigridar/pulse-generator/blob/master/GUI/img/error.png)

**Close app** is emitted when close app or close icon was clicked

![close-app](https://github.com/Zigridar/pulse-generator/blob/master/GUI/img/close.png)

Building GU
--
Creating app installer requires [windows-build-tools](https://github.com/felixrieseberg/windows-build-tools).
If you have it you should do follow steps:
```sh
git clone https://github.com/Zigridar/pulse-generator.git
npm install
npm run build
```
After building you will get windows installer ./dist/installer/Pulse-win32-${arch}-setup.exe

Installers
--
Pretty soon
