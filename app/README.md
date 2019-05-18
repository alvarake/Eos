Aplicación para Raspberry Pi 3 con  webOS OSE. Esta aplicación en un asistente personal.

#Instalación

Para poder ejecutar la aplicación eOS en una Raspberry Pi 3 se necesita el paquete .ipk, este paquete se encuentra en el repositorio. 

El usuario que se descargue el paquete .ipk necesitará el SDK CLI de webOS OSE instalado en su ordenador para poder instalar la aplicación.
Información de como conseguir el SDK CLI de webOS: http://webosose.org/develop/sdk-tools/cli/download-and-install/

Mediante el CLI de webOS deberá registrar su Raspberry Pi 3 en la lista de dispositivos que este reconoce utilizando el siguiente comando que permite asociar la Raspberry Pi 3 a una dirección IP y un puerto:
> ares-setup-device.
Después de registrar el dispositivo, simplemente hay que ejecutar lo siguiente:
> ares-install --device <Raspberry> ./eos_0.0.1_all.ipk

Mas información en: http://webosose.org/develop/web-app-dev/external-web-apps/building-your-first-web-app/

